export function useMyHead(
  title?: string,
  description?: string,
  type?: string,
  image?: string,
) {
  const DEFAULT_TITLE = "Makena Kong <3";
  const myTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const myDescription =
    description ||
    "I'm Makena. Senior Fullstack Engineer, volunteer coding teacher and how-to guide writer. Started _mak_archives knitting and crochet pattern brand. Paints pet portraits and other art. Based in the San Francisco Bay Area.";
  const myType = type || "website";

  const runtimeConfig = useRuntimeConfig();
  const GTM_ID = runtimeConfig.public.GOOGLE_TAG_MANAGER_ID || "GTM-K3RRGZ6F";
  const url = useRequestURL();

  return useHead({
    title: myTitle,
    meta: [
      { name: "description", content: myDescription },
      { property: "og:title", content: myTitle },
      { property: "og:description", content: myDescription },
      { property: "og:type", content: myType },
      { property: "og:url", content: url.href },
      ...(image ? [{ property: "og:image", content: image }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: myTitle },
      { name: "twitter:description", content: myDescription },
      ...(image ? [{ name: "twitter:image", content: image }] : []),
    ],
    script: [
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`,
      },
    ],
  });
}
