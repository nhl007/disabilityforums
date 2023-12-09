"use server";

import { AbnLookupResult } from "@/types/business";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";

const apiUrl = process.env.ABR_LOOKUP_URL;
const guid = process.env.ABR_GUID;

export async function searchValidABN(abn: string) {
  if (!abn) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}?abn=${abn}&guid=${guid}`);

    const text = await response.text();

    const data: AbnLookupResult = JSON.parse(
      text.replace(/^callback\(|\)$/g, "")
    );

    if (data.AddressPostcode) {
      const latLang = await getLatLngByPostalCode(data.AddressPostcode);
      console.log(latLang);
      if (latLang?.length)
        data.location = {
          coordinates: latLang,
        };
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
