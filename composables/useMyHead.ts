export function useMyHead<T>(title?: string, description?: string) {
  const DEFAULT_TITLE = "makena kong <3";
  const myTitle = !!title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const myDescription = description || "i'm makena and this is my website";

  const runtimeConfig = useRuntimeConfig();
  const GTM_ID = runtimeConfig.public.GOOGLE_TAG_MANAGER_ID;

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
        content: "website",
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
