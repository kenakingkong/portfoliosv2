export function useMyHead<T>(
  title?: string,
  description?: string,
  type?: string,
) {
  const DEFAULT_TITLE = "Makena Kong <3";
  const myTitle = !!title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const myDescription =
    description ||
    "I'm Makena. Senior Fullstack Engineer, volunteer coding teacher and how-to guide writer. Started _mak_archives knitting and crochet pattern brand. Paints pet portraits and other art. Based in the San Francisco Bay Area.";
  const myType = type || "website";

  const runtimeConfig = useRuntimeConfig();
  const GTM_ID = runtimeConfig.public.GOOGLE_TAG_MANAGER_ID || "GTM-K3RRGZ6F";

  return useHead({
    title: myTitle,
    meta: [
      {
        name: "title",
        content: myTitle,
      },
      {
        name: "description",
        content: myDescription,
      },
      {
        name: "type",
        content: myType,
      },
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
