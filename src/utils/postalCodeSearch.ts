const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  //? Radius of the Earth in kilometers
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //? Distance in kilometers
  const distance = R * c;
  return distance;
};

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
