"use server";

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

export const getSuburbsByState = async (state: string) => {
  try {
    const resp = await fetch(`${auPostUrl}?state=${state}`);
    const data = await resp.json();
    if (data && data.length) {
      const suburbs = data.map((data: any) => {
        return {
          label: data.name + " " + data.postcode,
          value: data.name + " " + data.postcode,
        };
      });
      return suburbs;
    }
    return null;
  } catch (err) {
    if (err instanceof Error) console.log(err);
    return null;
  }
};
