import Head from "next/head";
import { useRouter } from "next/router";

const SeoHead = ({ seo_title, seo_hashtag, seo_quote, seo_image, seo_keywords, seo_description }) => {
  const currentUrl = `https://viewchest.com${useRouter().asPath}`,
    title = seo_title || "viewChest",
    hashtag = seo_hashtag || "#viewChest",
    quote = seo_quote || "Sharing your Views",
    image = seo_image || "/images/viewChest.webp",
    keywords =
      seo_keywords || "viewChest, Technology, Lifehack &amp; health, Entertainment, Business &amp; Finance, Miscellaneous, NEWS",
    description =
      seo_description ||
      "viewChest covers a wide range of Fascinating and Captivating contents, with an option to share your views with the world; Latest trends in technology, blog, space, trending news";

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
      <meta property="og:site_name" content="viewChest" />
      <meta property="og:description" content={description} />
      <meta property="og:image:alt" content={`${title} Image`} />
      <meta property="og:image" itemProp="image" content={image} />

      {/* Twitter */}
      <meta name="twitter:site" content="@viewChest" />
      <meta name="twitter:creator" content="@viewChest" />
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
