import React from "react";
import { getAllPostsWithSlug, getPostData } from "lib/api";
import Image from "next/image";
import * as Styles from "styles/Post.module.css";
import { Seo, Section, Heading, Post, Button, Link } from "components";
import parse from "html-react-parser";

export default function PostPage({ post, preview, latestPosts, ...props }) {
  return (
    <>
      <Seo
        uri={post?.uri}
        featuredImage={post?.featuredImage?.node?.sourceUrl}
        data={post?.seo}
        author={post?.author?.node?.name}
        type='article'
      />

      <Section fullWidth className='max-w-full' WrapperTag='article'>
        <div
          className='relative overflow-hidden flex justify-start items-center py-16'
          style={{ minHeight: "600px" }}>
          <div className='relative z-50 container'>
            <div className='max-w-2xl flex flex-col gap-6'>
              <Post.Categories data={post?.categories?.edges} />
              <Heading level='1' className='text-white leading-normal m-0'>
                {post?.title}
              </Heading>
              <Post.Meta
                author={post.author.node}
                date={post.date}
                readingTime={post.seo.readingTime}
              />
            </div>
          </div>

          <div className='z-20 bg-gradient-to-r from-black/100 to-black/70 text-white absolute inset-0 opacity-80' />

          <div className='absolute inset-0 object-cover z-0 bg-gradient-to-br from-gray-700 to-gray-900'>
            {post?.featuredImage && (
              <Image
                className='object-cover'
                alt='post'
                src={post?.featuredImage?.node?.sourceUrl}
                layout='fill'
                priority
              />
            )}
          </div>
        </div>

        <div className='container'>
          <div className='grid grid-cols-1 xl:grid-cols-12 gap-24 py-16'>
            <div className='space-y-8 col-span-full xl:col-span-8'>
              {parse(post?.content || "", {
                replace: (domNode) => {
                  if (domNode?.attribs && domNode?.attribs?.src) {
                    return (
                      <div className='w-full object-scale-down'>
                        <Image
                          className='object-fill'
                          alt={domNode?.attribs?.alt}
                          src={domNode?.attribs?.src}
                          layout='responsive'
                          width={domNode?.attribs?.width}
                          height={domNode?.attribs?.height}
                        />
                      </div>
                    );
                  }
                },
              })}
            </div>

            <aside className='col-span-full xl:col-span-4 flex flex-col gap-16'>
              <div
                className={`bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-center space-y-6 rounded-lg shadow-gray-500 shadow-2xl`}>
                <div className='space-y-8'>
                  <Heading type='kicker' className='text-white'>
                    <span className='text-white'>
                      Get Started with LeadBoxer
                    </span>
                  </Heading>
                  <Heading level='4' className='text-white text-3xl'>
                    LeadBoxer can help you safely generate more leads
                  </Heading>
                  <div className='text-white'>
                    <p>
                      Get more insight into your online visitors and behaviour,
                      and turn this data into customers.
                    </p>
                  </div>

                  <div>
                    <Button type='primary' href='/demo'>
                      Start Now!
                    </Button>
                  </div>
                </div>
              </div>

              {latestPosts && (
                <div>
                  <Heading level='5'>Latest Posts</Heading>

                  <ul className='list-none flex flex-col gap-8'>
                    {(latestPosts?.edges || [])
                      .filter(({ node }) => node.uri !== post.uri)
                      .map(({ node }) => {
                        return (
                          <li key={node.id}>
                            <div className='flex gap-4 items-center group'>
                              <div className='w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden shadow-black/20 shadow-lg'>
                                {node.featuredImage && (
                                  <Image
                                    className='object-cover'
                                    alt={node.title}
                                    src={node?.featuredImage?.node?.sourceUrl}
                                    layout='fill'
                                  />
                                )}
                              </div>

                              <div className='flex-grow'>
                                <Heading
                                  level='6'
                                  className='text-lg m-0 group-hover:underline'>
                                  <Link href={node.uri}>{node.title}</Link>
                                </Heading>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>

        <div className=' border-t border-gray-200 bg-gray-50 py-8'>
          <div className='container'>
            {(post?.previous || post?.next) && (
              <div className='block'>
                <div className='flex justify-between'>
                  <div className='relative'>
                    {post?.previous && (
                      <>
                        <Button
                          type='text'
                          href={post?.previous?.uri}
                          className='text-left'
                          icon={{
                            position: "left",
                            name: "RiArrowLeftLine",
                          }}>
                          {post?.previous?.title}
                        </Button>
                      </>
                    )}
                  </div>

                  <div className='relative'>
                    {post?.next && (
                      <>
                        <Button
                          type='text'
                          href={post?.next?.uri}
                          className='text-right'
                          icon={{
                            position: "right",
                            name: "RiArrowRightLine",
                          }}>
                          {post?.next?.title}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostData(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: false,
  };
}
