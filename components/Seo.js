import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

export default function Seo({ data, uri, featuredImage, type = "website" }) {
  const {
    metaDesc = "Lead & Customer Intelligence",
    meta = [],
    title = "LeadBoxer",
    readingTime,
    author,
    opengraphType,
    opengraphModifiedTime,
    opengraphPublishedTime,
    schema,
  } = data || {};
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={metaDesc} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content={type || opengraphType} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={metaDesc} />
      <meta property='og:url' content={`https://www.leadboxer.com${uri}`} />
      <meta property='og:site_name' content='LeadBoxer' />
      <meta
        property='article:published_time'
        content={opengraphPublishedTime}
      />
      <meta property='article:modified_time' content={opengraphModifiedTime} />
      <meta property='og:image' content={featuredImage} />
      {/* <meta property='og:image:width' content='2048' />
      <meta property='og:image:height' content='1365' />
      <meta property='og:image:type' content='image/jpeg' /> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:label1' content='Written by' />
      <meta name='twitter:data1' content={author} />
      <meta name='twitter:label2' content='Est. reading time' />
      <meta name='twitter:data2' content={readingTime} />
      <script type='application/ld+json'>{schema?.raw}</script>
    </Head>
  );
}

Seo.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};
