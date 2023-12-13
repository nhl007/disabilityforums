"use client";

import { getBusiness, postBusinessData } from "@/actions/businessData";
import DynamicInput from "@/components/DynamicInput";
import {
  agesSupportedOptions,
  genderOfAttendanceOptions,
  selectLanguages,
} from "@/constants/constants";
import { BusinessPersonalInfo, serviceAgeNames } from "@/types/business";
import { generateSelectDefault } from "@/utils/utils";
import { useEffect, useState } from "react";
import Select from "react-select";

const Support = () => {
  const [disabilitySpecialities, setDisabilitySpecialities] = useState<
    string[]
  >([]);
  const [providerSpecialSkills, setProviderSpecialSkills] = useState<string[]>(
    []
  );

  const [genderOfAttendants, setGenderOfAttendants] = useState<string[]>([]);

  const [languages, setLanguages] = useState<string[]>([]);
  const [agesSupported, setAgesSupported] = useState<serviceAgeNames[]>([]);

  const handleSubmit = async () => {
    const infos = {
      languages,
      agesSupported,
      genderOfAttendants,
      providerSpecialSkills,
      disabilitySpecialities,
    };
    const data = await postBusinessData(infos);
    console.log(JSON.parse(data as string));
  };

  const setInitialData = async () => {
    const resp = await getBusiness([
      "languages",
      "agesSupported",
      "genderOfAttendants",
      "providerSpecialSkills",
      "disabilitySpecialities",
    ]);

    const data: Pick<
      BusinessPersonalInfo,
      | "languages"
      | "agesSupported"
      | "genderOfAttendants"
      | "providerSpecialSkills"
      | "disabilitySpecialities"
    > = JSON.parse(resp);

    if (data) {
      setAgesSupported(data.agesSupported);
      setLanguages(data.languages);
      setGenderOfAttendants(data.genderOfAttendants);
      setProviderSpecialSkills(data.providerSpecialSkills);
      setDisabilitySpecialities(data.disabilitySpecialities);
    }
  };

  useEffect(() => {
    setInitialData();
  }, []);

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Business Support
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Submit the services the business provides.
        </p>
      </div>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-3">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              GenderOfAttendants
            </label>
            <Select
              id="gender"
              value={generateSelectDefault(genderOfAttendants)}
              isMulti
              instanceId="gender"
              name="gender"
              options={genderOfAttendanceOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setGenderOfAttendants(data);
              }}
              isSearchable={true}
              placeholder="Select Genders of Attendance"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="Languages"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Languages
            </label>
            <Select
              id="Languages"
              value={generateSelectDefault(languages)}
              isMulti
              instanceId="Languages"
              name="Languages"
              options={selectLanguages}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setLanguages(data);
              }}
              isSearchable={true}
              placeholder="Select Languages"
              classNamePrefix="select"
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="ages_supported"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Ages Supported
            </label>
            <Select
              id="ages_supported"
              value={generateSelectDefault(agesSupported)}
              isMulti
              instanceId="ages_supported"
              name="ages_supported"
              options={agesSupportedOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setAgesSupported(data);
              }}
              isSearchable={true}
              placeholder="The the supported ages!"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-full">
            <DynamicInput
              name="Disability Specialities"
              data={disabilitySpecialities}
              setData={setDisabilitySpecialities}
            />
          </div>
          <div className="col-span-full">
            <DynamicInput
              name="Provider Special Skills"
              data={providerSpecialSkills}
              setData={setProviderSpecialSkills}
            />
          </div>
        </div>
      </div>

      {/* //! Submit buttons */}
      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Support;
