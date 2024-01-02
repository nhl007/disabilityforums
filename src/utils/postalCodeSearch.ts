"use server";

import fs from "fs";
import csv from "csv-parser";

type postCodeResult = {
  postcode: string;
  place_name: string;
  state_name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  accuracy: string;
};

async function getAuPostCodeDetails(
  searchBy: string,
  value: string
): Promise<postCodeResult[] | null> {
  const filePath = "./src/assets/au_postcodes.csv";

  return new Promise((resolve, reject) => {
    const results: postCodeResult[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data[searchBy] === value) {
          results.push(data);
        }
      })
      .on("end", () => {
        console.log("end");
        resolve(results);
      })
      .on("error", (error) => {
        console.log(error);
        reject(null);
      });
  });
}

export const getLatLngByPostalCode = async (postCode: string | number) => {
  const data = await getAuPostCodeDetails("postcode", String(postCode));

  if (data) {
    return [Number(data[0].longitude), Number(data[0].latitude)];
  } else return null;
};

export const getSuburbsByState = async (state: string) => {
  const data = await getAuPostCodeDetails("state_code", state);

  if (data) {
    if (data && data.length) {
      const suburbs = data.map((data) => {
        return {
          label: data.place_name + " " + data.postcode,
          value: data.place_name + " " + data.postcode,
        };
      });
      return suburbs;
    }
  } else return null;
};
