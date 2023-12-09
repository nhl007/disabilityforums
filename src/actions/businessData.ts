"use server";

import { authOptions } from "@/libs/auth";
import Business from "@/models/Business";
import { AbnLookupResult } from "@/types/business";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";
import { getServerSession } from "next-auth";

export async function postBusinessData(data: Partial<AbnLookupResult>) {
  const session = await getServerSession(authOptions);

  const id = session?.user.id;

  if (!id) return "Permission denied!";

  try {
    const docId = await Business.findOne({ user: id }).select("_id").exec();

    if (!docId) {
      const resp = await Business.create({
        user: id,
        discourseId: session.user.discourse_id,
        data,
      });
      return resp;
    } else {
      const resp = await Business.findByIdAndUpdate(docId._id, data, {
        new: true,
      });
      return resp;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function searchBusinesses(
  postalCode: string = "",
  searchTerm: string = "",
  category: string = "",
  radius: number = 15
) {
  try {
    const query: Record<string, any> = {};
    if (postalCode && postalCode.length > 2) {
      const postalCoordinates = await getLatLngByPostalCode(postalCode);

      if (postalCoordinates) {
        query.location = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [postalCoordinates[0], postalCoordinates[1]],
            },
            $maxDistance: radius * 1000,
          },
        };
      }
    }

    if (searchTerm) {
      query.BusinessName = {
        $in: [new RegExp(searchTerm, "i")],
      };
    }

    if (category) {
      // If name, category is provided
      query.EntityName = { $regex: new RegExp(category, "i") };
    }

    const businesses = await Business.find(query);

    return businesses;
  } catch (error) {
    console.error("Error searching businesses:", error);
    throw error;
  }
}
