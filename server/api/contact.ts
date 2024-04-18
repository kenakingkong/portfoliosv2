export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const AIRTABLE_ENDPPOINT =
    "https://api.airtable.com/v0/appqoTO8Y2jRdX7kx/ContactForm";

  const body = await readBody(event).catch(() => {});

  let data = {
    records: [
      {
        fields: {
          Name: body.name,
          Email: body.email,
          Message: body.message,
        },
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(AIRTABLE_ENDPPOINT, requestOptions).then((response) =>
    response.json()
  );
});
