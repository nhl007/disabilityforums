"use server";

import User from "@/models/User";

export async function getListingProgression(id: string) {
  try {
    const progress = await User.findById(id).select("progress");
    return {
      success: true,
      progress: progress.progress,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      progress: null,
    };
  }
}
