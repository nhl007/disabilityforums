"use server";

import { stringifyResponse } from "./../utils/utils";
import { getAuthSession } from "@/libs/auth";
import { connectToDB } from "@/libs/connectToDb";
import Business from "@/models/Business";
import { BusinessDatabaseModel, BusinessReviewData } from "@/types/business";
import { SearchParamsActions } from "@/types/common";
import { getLatLngByPostalCode } from "@/utils/postalCodeSearch";
import { Session } from "next-auth";

export async function postBusinessData(data: Partial<BusinessDatabaseModel>) {
  const session: Session | null = await getAuthSession();
  if (!session || !session.user)
    return { success: false, message: "Permission denied" };

  const id = session?.user.id;

  try {
    await connectToDB();
    const docId = await Business.findOne({ user: id }).select("_id");

    if (!docId) {
      await Business.create({
        user: id,
        discourseId: session.user.discourse_id,
        ...data,
      });
      return { success: true, message: "Created Successfully !" };
    } else {
      await Business.findByIdAndUpdate(docId._id, data, {
        new: true,
      }).select("_id");

      return { success: true, message: "Saved Successfully !" };
    }
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return { success: false, message: "Error Ocurred" };
  }
}

export async function updateBusinessData(data: Partial<BusinessDatabaseModel>) {
  const session: Session | null = await getAuthSession();
  const id = session?.user.id;

  if (!id) return { success: false, message: "Permission denied" };

  try {
    await connectToDB();
    const docId = await Business.findOne({ user: id }).select("_id");

    if (!docId || !docId._id) {
      return { success: false, message: "Permission denied" };
    }
    await Business.findByIdAndUpdate(docId._id, data, {
      new: true,
    }).select("_id");
    return { success: true, message: "Saved Successfully !" };
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return { success: false, message: "Error Ocurred" };
  }
}

export async function searchBusinesses(searchParams: SearchParamsActions) {
  try {
    const query: Record<string, any> = {};

    const radius = searchParams.radius ? searchParams.radius : 15;

    for (const [key, value] of Object.entries(searchParams)) {
      // console.log(key, ":", value);
      if (value) {
        if (key === "postalCode" && value.length > 2) {
          const postalCoordinates = await getLatLngByPostalCode(value);

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

        if (key === "keyword") {
          query.BusinessName = {
            $in: [new RegExp(value, "i")],
          };
        }

        if (key === "category") {
          // If category is provided
          query.services = {
            $in: [new RegExp(value, "i")],
          };
        }
        if (key === "disabilityExp") {
          query.disabilitySpecialities = {
            $in: value.split(","),
          };
        }
        if (key === "delivery") {
          query.deliveryOptions = {
            $in: value.split(","),
          };
        }
        if (key === "payment") {
          query.paymentTypes = {
            $in: value.split(","),
          };
        }
        if (key === "age") {
          query.agesSupported = {
            $in: value.split(","),
          };
        }
        if (key === "languages") {
          query.languages = {
            $in: value.split(","),
          };
        }
        if (key === "other") {
          query.providerSpecialSkills = {
            $in: value.split(","),
          };
        }
        if (key === "complexNeeds") {
          query.complexNeedsSupported = {
            $in: value.split(","),
          };
        }

        //ndis
        // autism: string;
      }
    }

    await connectToDB();
    const doc = await Business.find(query)
      .select("_id services about BusinessName rating")
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

    const doc = await Business.findOne({ user: id }).select(
      "-_id " + fields.join(" ")
    );

    return stringifyResponse({ data: doc, message: "success" });
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
    const doc = await Business.findById(id)
      .populate("reviews.user", "username")
      .lean();
    if (doc) {
      return stringifyResponse(doc);
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//! product review

export async function postBusinessReview(
  data: Omit<BusinessReviewData, "date">
) {
  try {
    const { rating, description, caption, user, _id } = data;

    // console.log("r---" + rating);

    const review = {
      user: user._id,
      caption: caption,
      rating: Number(rating),
      description: description,
    };

    const business = await Business.findById(_id).select(
      "reviews totalReviews rating"
    );

    const hasReviewed = business.reviews.find(
      (r: any) => r.user.toString() === user.toString()
    );

    // console.log("hasReviewed", hasReviewed);

    if (hasReviewed) {
      business.reviews.forEach((review: any) => {
        if (review.user.toString() === user.toString()) {
          review.caption = caption;
          review.description = description;
          review.rating = rating;
        }
      });
    } else {
      business.reviews.push(review);
      business.totalReviews = business.reviews.length;
    }

    business.rating =
      business.reviews.reduce((acc: Number, item: any) => {
        return item.rating + acc;
      }, 0) / business.reviews.length;

    // console.log("before update->", business);

    await Business.findByIdAndUpdate(_id, business, {
      new: true,
    });

    return {
      success: true,
      message: hasReviewed
        ? "Review updated successfully"
        : "Successfully submitted your review",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error Occurred! Please try again",
    };
  }
}
