const auPostUrl = "https://v0.postcodeapi.com.au/suburbs.json";

export const getLatLngByPostalCode = async (postCode: string | number) => {
  try {
    const resp = await fetch(`${auPostUrl}?postcode=${postCode}`);
    const data = await resp.json();
    return [Number(data[0].longitude), Number(data[0].latitude)];
  } catch (err) {
    if (err instanceof Error) console.log(err);
    return null;
  }
};
