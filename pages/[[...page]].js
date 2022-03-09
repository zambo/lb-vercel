import React, { useContext, useEffect } from "react";
import { getAllPagesWithUri, getPageData } from "lib/api";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Icon, Section } from "components";
import LayoutContext from "context/LayoutContext";

export default function Page({ page = {}, ...props }) {
  const { settings, setSettings } = useContext(LayoutContext);
  const router = useRouter();

  useEffect(() => {
    setSettings(page.pageSettings);
    return;
  }, [page.pageSettings, setSettings]);

  if (!router.isFallback && page?.uri !== page?.postUri) {
    return <ErrorPage statusCode={404} />;
  }

  return <Section>{JSON.stringify(page, null, 2)}</Section>;
}

export async function getStaticProps({ params, preview = false, previewData }) {
  // Gets the slug and format it as URI
  const postUri =
    params.page !== undefined ? `/${params?.page?.join("/")}/` : "/";

  const { pageBy } = await getPageData(postUri, preview, previewData);

  return {
    props: {
      preview,
      page: {
        ...pageBy,
        postUri,
      },
    },
  };
}

export async function getStaticPaths() {
  // const allPages = await getAllPagesWithUri();

  // Blog page is required by WordPress to set the posts page, but we want to have a custom blog page, so we exclude it from paths
  // const pagePaths =
  //   allPages.edges
  //     .filter(({ node }) => node.uri !== "/blog/")
  //     .map(({ node }) => (node.uri !== "/" ? node.uri.slice(0, -1) : "/")) ||
  //   [];

  // console.log(pagePaths);

  return {
    paths: [],
    fallback: true,
  };
}
