import "styles/globals.css";
import { Layout } from "components";
import { getFooterData, getPrimaryMenu, getLatestPosts } from "lib/api";

function MyApp({ Component, pageProps, data, ...props }) {
  return (
    <Layout data={data}>
      <Component latestPosts={data.latestPosts} {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async () => {
  const navData = await getPrimaryMenu();
  const footerData = await getFooterData();
  const { latestPosts } = await getLatestPosts();

  return {
    data: {
      navigation: navData,
      footer: footerData,
      latestPosts,
    },
  };
};

export default MyApp;
