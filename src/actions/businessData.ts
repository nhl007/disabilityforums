"use server";

import { stringifyResponse } from "./../utils/utils";
import { getAuthSession } from "@/libs/auth";
import { connectToDB } from "@/libs/connectToDb";
import Business from "@/models/Business";
import { BusinessDatabaseModel } from "@/types/business";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";

export async function postBusinessData(data: Partial<BusinessDatabaseModel>) {
  const session = await getAuthSession();
  const id = session?.user.id;

  if (!id)
    return stringifyResponse({ data: null, message: "permission denied" });

  try {
    await connectToDB();
    const docId = await Business.findOne({ user: id }).select("_id").exec();

    if (!docId) {
      const resp = await Business.create({
        user: id,
        discourseId: session.user.discourse_id,
        data,
      });
      return "saved successfully";
    } else {
      const resp = await Business.findByIdAndUpdate(docId._id, data, {
        new: true,
      }).select("-_id -user -serviceLocations");
      // console.log(resp);
      // return "saved successfully";
      return JSON.stringify(resp);
    }
  } catch (err) {
    console.log("err here", err);
    if (err instanceof Error) return { data: null, message: err.message };
    return { data: null, message: "Error Ocurred" };
  }
}

export async function searchBusinesses(
  postalCode: string = "",
  searchTerm: string = "",
  category: string = "",
  radius: string | number = 15
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
            $maxDistance: Number(radius) * 1000,
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
      // If category is provided
      query.services = {
        $in: [new RegExp(category, "i")],
      };
    }
    await connectToDB();
    const doc = await Business.find(query)
      .select("_id services about BusinessName")
      .limit(10);
    if (doc.length > 0) return stringifyResponse(doc);
    else return null;
  } catch (error) {
    console.error("Error searching businesses:", error);
    return null;
  }
}

type DBKeys = keyof BusinessDatabaseModel;

export async function getBusiness(fields: Partial<DBKeys>[]) {
  const session = await getAuthSession();

  const id = session?.user.id;

  if (!id) return stringifyResponse({ data: null, message: "no permission" });

  try {
    await connectToDB();

    const doc = await Business.findOne({ user: id }).select(fields.join(" "));
    return JSON.stringify(doc);
  } catch (err) {
    console.log(err);
    return stringifyResponse({ data: null, message: "error" });
  }
}

export async function getBusinessByStates(state: string) {
  try {
    await connectToDB();
    const doc = await Business.find({ AddressState: state })
      .select("_id BusinessName about services")
      .limit(10);
    if (doc.length > 0) {
      return stringifyResponse(doc);
    } else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getBusinessById(id: string): Promise<string | null> {
  try {
    if (!id) return null;
    await connectToDB();
    const doc = await Business.findById(id).lean();
    if (doc) {
      return stringifyResponse(doc);
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
