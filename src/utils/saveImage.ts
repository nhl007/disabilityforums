"use server";
import fs from "fs";

export async function saveBase64Image(base64String: string, fileName: string) {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  const imageBuffer = Buffer.from(base64Data, "base64");

  const filePath = "./public/banners/" + fileName;

  fs.writeFileSync(filePath, imageBuffer, "binary");
  return `/banner/${fileName}`;
}