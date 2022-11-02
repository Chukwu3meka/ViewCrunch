import Head from "next/head";
import { useRouter } from "next/router";

const SeoHead = ({ seo_title, seo_hashtag, seo_quote, seo_image, seo_keywords, seo_description }) => {
  const currentUrl = `https://viewcrunch.com${useRouter().asPath}`,
    title = seo_title || `ViewCrunch`,
    hashtag = seo_hashtag || "#ViewCrunch",
    quote = seo_quote || "Sharing your Views",
    image = seo_image || "https://www.viewcrunch.com/images/ViewCrunch.webp",
    keywords = seo_keywords || "viewcrunch, technology, lifehack, health, entertainment, business, finance, miscellaneous, news",
    description = seo_description || "On ViewCrunch, you find Fascinating and Captivating contents, Breaking NEWS, Views and Crunches.";
  return (
    <Head>
      <title>{title}</title>

      <meta property="title" content={title} key="title" />
      <meta property="quote" content={quote} key="quote" />
      <meta property="image" content={image} key="image" />
      <meta property="url" content={currentUrl} key="url" />
      <meta name="keywords" content={keywords} key="keywords" />
      <meta name="description" content={description} key="description" />

      {/* og */}
      <meta property="og:quote" content={quote} key="og:quote" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:url" content={currentUrl} key="og:url" />
      <meta property="og:hashtag" content={hashtag} key="og:hashtag" />
      <meta property="og:image" itemProp="image" content={image} key="og:image" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image:alt" content={`${title} Image`} key="og:image:alt" />
      <meta property="og:image:type" content={`image/${seo_image ? "png" : "webp"}`} />

      {/* Twitter */}
      <meta name="twitter:site" content="@ViewCrunch" key="twitter:site" />
      <meta name="twitter:creator" content="@ViewCrunch" key="twitter:creator" />
      <meta name="twitter:image:alt" content={`${title} Image`} key="twitter:image:alt" />

      <meta property="twitter:title" content={title} key="twitter:title" />
      <meta property="twitter:image" content={image} key="twitter:image" />
      <meta property="twitter:url" content={currentUrl} key="twitter:url" />
      <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta property="twitter:description" content={description} key="twitter:description" />
    </Head>
  );
};
export default SeoHead;
