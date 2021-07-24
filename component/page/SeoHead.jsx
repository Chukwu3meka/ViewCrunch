import Head from "next/head";
import { useRouter } from "next/router";

const SeoHead = ({ seo_title, seo_hashtag, seo_quote, seo_image, seo_keywords, seo_description }) => {
  const currentUrl = `https://ViewCrunch.com${useRouter().asPath}`,
    title = seo_title || `ViewCrunch`,
    hashtag = seo_hashtag || "#ViewCrunch",
    quote = seo_quote || "Sharing your Views",
    image = seo_image || "/images/ViewCrunch.webp",
    keywords = seo_keywords || "viewcrunch, technology, lifehack, health, entertainment, business, finance, miscellaneous, news",
    description =
      seo_description ||
      "On ViewCrunch, you find Fascinating and Captivating contents, Breaking NEWS and an option to share your views with the world.";
  return (
    <Head>
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta property="image" content={image} />
      <meta property="url" content={currentUrl} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />

      <title>{title}</title>

      {/* og */}
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="180" />
      <meta property="og:site_name" content="ViewCrunch" />
      <meta property="og:description" content={description} />
      <meta property="og:image:alt" content={`${title} Image`} />
      <meta property="og:image" itemProp="image" content={image} />

      {/* Twitter */}
      <meta name="twitter:site" content="@ViewCrunch" />
      <meta name="twitter:creator" content="@ViewCrunch" />
      <meta name="twitter:image:alt" content={`${title} Image`} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  );
};
export default SeoHead;
