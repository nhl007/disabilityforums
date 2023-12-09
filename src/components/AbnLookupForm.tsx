"use client";

import { useState } from "react";

import { searchValidABN } from "@/actions/abrApi";
import { AbnLookupResult } from "@/types/business";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";
import { postBusinessData } from "@/actions/businessData";

const AbnLookupForm = () => {
  const [abnDetails, setAbnDetails] = useState<Partial<AbnLookupResult> | null>(
    null
  );
  const [abn, setAbn] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const searchAbn = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const data = await searchValidABN(abn);
    console.log(data);
    setAbnDetails(() => data);
  };

  const confirmAbnDetails = async () => {
    const data = await postBusinessData(abnDetails!);
    console.log(data);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Registered ABN Number <span className=" text-red-600">*</span>
        </label>
        <div className="mt-2">
          <div className="flex gap-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              onChange={(e) => {
                setAbn(e.target.value);
              }}
              value={abn}
              type="text"
              name="abn"
              id="abn"
              pattern="^[0-9\s]*$"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="abn number"
            />
            {abnDetails && (
              <button
                onClick={() => {
                  setAbn("");
                  setAbnDetails(null);
                }}
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </div>
      {abnDetails && abn ? (
        <div className="border-b border-t border-gray-900/10 py-12 mt-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            ABN Lookup
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Information associated to ABN Number : {abn}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Abn Status
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="status"
                  value={abnDetails.Acn}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="addressState"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ACN
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="ACN"
                  value={abnDetails.Acn}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ABN Active From
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="activeFrom"
                  value={abnDetails.AbnStatusEffectiveFrom}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Business Name
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="businessName"
                  value={
                    abnDetails.BusinessName
                      ? abnDetails.BusinessName[0]
                      : "No name found"
                  }
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="addressState"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                GST
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="gst"
                  value={abnDetails.Gst}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Entity Type Code
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="entityTypeCode"
                  value={abnDetails.EntityTypeCode}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Entity Name
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  value={abnDetails.EntityName}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Entity Type Name
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  value={abnDetails.EntityTypeName}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="postCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Post Code
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="postCode"
                  id="postCode"
                  value={abnDetails.AddressPostcode}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="addressState"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                AddressState
              </label>
              <div className="mt-2">
                <input
                  disabled
                  type="text"
                  name="addressState"
                  id="addressState"
                  value={abnDetails.AddressState}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address_date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address_date"
                  id="address_date"
                  value={abnDetails.AddressDate}
                  disabled
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Details Available</div>
      )}

      <div className="my-6 flex items-center justify-end gap-x-6">
        {abn && abnDetails ? (
          <CustomButton
            onClick={confirmAbnDetails}
            type="submit"
            isLoading={loading}
          >
            Confirm
          </CustomButton>
        ) : (
          <CustomButton
            disabled={abn.length <= 7}
            // disabled
            onClick={searchAbn}
            type="button"
            isLoading={loading}
          >
            Search
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default AbnLookupForm;
