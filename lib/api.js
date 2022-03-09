const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            modified
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostData(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      uri
      seo {
        title
        metaDesc
        readingTime
        opengraphType
        opengraphModifiedTime
        opengraphPublishedTime
        schema {
          raw
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
            slug
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        previous {
          id
          title
          uri
        }
        next {
          id
          title
          uri
        }
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

// Pages
export async function getAllPagesWithUri() {
  const data = await fetchAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            uri
          }
        }
      }
    }
  `);
  return data?.pages;
}

export async function getPageData(slug, preview, previewData) {
  const data = await fetchAPI(
    `query GET_PAGE($uri: ID!) {
      page(id: $uri, idType: URI) {
        id
        slug
        uri
        title
        isFrontPage
        isPostsPage
        pageSettings {
          buttons
          footer
          header
          navigation
        }
      }
    }
  `,
    {
      variables: {
        uri: slug,
      },
    }
  );

  return data;
}

// Get Navigation
export async function getPrimaryMenu() {
  const data = await fetchAPI(
    `query GET_PRIMARY_MENU {
      menu(id: "header", idType: NAME) {
        menuItems(first: 1000) {
          edges {
            node {
              id
              path
              label
              parentId
              childItems {
                edges {
                  node {
                    id
                    path
                    label
                    childItems {
                      edges {
                        node {
                          id
                          path
                          label
                        }
                      }
                    }
                  }
                }
              }
              connectedNode {
                node {
                  ... on Page {
                    isPostsPage
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
    `
  );
  return data?.menu?.menuItems;
}

export async function getFooterData() {
  const data = await fetchAPI(
    `query GET_FOOTER_DATA {
      main: menu(id: "footer", idType: NAME) {
        menuItems (first: 1000) {
          nodes {
            id
            title: label
            slug: path
          }
        }
      }
      integrations(first: 1000) {
        nodes {
          id
          title
          slug: uri
        }
      }
      support: menu(id: "Support", idType: NAME) {
        menuItems {
          nodes {
            id
            title: label
            slug: url
          }
        }
      }
      latestPosts: posts(first: 3) {
        edges {
          node {
            id
            title
            slug
            uri
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    }
    `
  );
  return data;
}

export async function getLatestPosts() {
  const data = await fetchAPI(
    `query GET_LATEST_POSTS {
      latestPosts: posts(first: 11) {
        edges {
          node {
            id
            title
            slug
            uri
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    }
    `
  );
  return data;
}
