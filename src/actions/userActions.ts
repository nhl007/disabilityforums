"use server";

import querystring from "querystring";

import User from "@/models/User";
// import { generateHmacSha256 } from "@/utils/utils";

import CryptoJS from "crypto-js";

import crypto from "crypto";

export async function generateDiscourseAuthUrl() {
  const nonce = crypto
    .randomBytes(Math.ceil(16 / 2))
    .toString("hex")
    .slice(0, 16);

  // const payload = `nonce=${nonce}&return_sso_url=${encodeURIComponent(
  //   "http://localhost:3000/sign-in"
  // )}`;

  const payload = `nonce=${nonce}&return_sso_url=${encodeURIComponent(
    "https://disabilityforums.vercel.app/sign-in"
  )}`;

  const base64Payload = btoa(payload);

  // Step 4: URL encode the base64-encoded payload
  const urlEncodedPayload = encodeURIComponent(base64Payload);

  // Step 5: Generate HMAC-SHA256 signature
  const secret = "_qYR_u;F84&~9)-"; // Replace with your actual Discourse secret
  const hexSignature = CryptoJS.HmacSHA256(base64Payload, secret).toString(
    CryptoJS.enc.Hex
  );

  const redirectUrl = `https://disabilityforums.com.au/session/sso_provider?sso=${urlEncodedPayload}&sig=${hexSignature}`;

  return redirectUrl;
}

export async function validateAndReturnPayload(sso: string, sig: string) {
  const secretKey = process.env.DISCOURSE_SSO_SECRET as string;

  // Verify the HMAC-SHA256 signature
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(sso);

  const expectedSignature = hmac.digest("hex");

  if (expectedSignature !== sig) {
    // Signature does not match
    return null;
  }

  // Signature is valid, proceed
  const payload = querystring.parse(
    Buffer.from(sso, "base64").toString("utf-8")
  );

  // console.log(payload, "payload");

  return {
    email: payload.email,
    name: payload.name,
    username: payload.username,
    id: payload.external_id,
    avatar: payload.avatar_url,
  };
}

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

export async function checkForExistingUser(email: string) {
  try {
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return true;
    } else return false;
  } catch (err) {
    return true;
  }
}
