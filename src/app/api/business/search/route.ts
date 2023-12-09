import type { NextApiRequest, NextApiResponse } from "next";
import Business from "@/models/Business";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";

async function searchBusinesses(
  postalCodeCoords: {
    lat: number;
    lng: number;
  },
  searchTerm: string,
  radius: number
) {
  try {
    const businesses = await Business.find({
      $and: [
        {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [postalCodeCoords.lng, postalCodeCoords.lat],
              },
              $maxDistance: radius * 1000,
            },
          },
        },
        {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive regex
            // Add more fields as needed
          ],
        },
      ],
    });

    return businesses;
  } catch (error) {
    console.error("Error searching businesses:", error);
    throw error;
  }
}

export const POST = async (request: Request) => {
  const { postCode, src, rad, cat } = await request.json();

  const data = await getLatLngByPostalCode(postCode);

  //   const resp = await searchBusinesses(data!, src as string, Number(rad));
  //   console.log(resp);
  return new Response(
    JSON.stringify({
      data: data,
      success: true,
      message: "Business found!",
    }),
    { status: 200 }
  );
};
