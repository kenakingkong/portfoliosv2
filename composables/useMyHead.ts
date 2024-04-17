export function useMyHead<T>(title?: string, description?: string) {
  const DEFAULT_TITLE = "makena kong <3";
  const myTitle = !!title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const myDescription = description || "i'm makena and this is my website";

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
        src: "https://www.googletagmanager.com/gtag/js?id=G-2Q5G4LCTHZ",
        type: "text/javascript",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'G-2Q5G4LCTHZ');",
      },
    ],
  });
}
