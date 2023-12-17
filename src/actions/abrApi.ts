"use server";

import { AbnLookupResult } from "@/types/business";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";

const apiUrl = process.env.ABR_LOOKUP_URL;
const guid = process.env.ABR_GUID;

export async function searchValidABN(abn: string) {
  if (!abn || abn.length < 5) {
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}?abn=${abn}&guid=${guid}`);

    const text = await response.text();

    const data: AbnLookupResult = JSON.parse(
      text.replace(/^callback\(|\)$/g, "")
    );

    if (
      data.Abn === "" ||
      data.AddressPostcode === "" ||
      data.AddressState === ""
    ) {
      return null;
    }

    const latLang = await getLatLngByPostalCode(data.AddressPostcode);
    if (latLang?.length) {
      data.location = {
        coordinates: latLang,
      };
    } else return null;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
