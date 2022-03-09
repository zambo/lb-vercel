import React from "react";
import Head from "next/head";
import { getAllPostsForHome } from "lib/api";
import { Link, Button } from "components";

export default function Blog({ allPosts, preview }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className='container leading-loose'>
        {allPosts.edges.map(
          ({ node: { slug, title, excerpt, date, featuredImage, author } }) => {
            return (
              <div key={slug} className='m-8 bg-white'>
                <Button type='primary' href={`/blog/${slug}`}>
                  <a
                    className='hover:underline'
                    dangerouslySetInnerHTML={{ __html: title }}></a>
                </Button>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
