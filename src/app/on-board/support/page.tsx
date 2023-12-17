"use client";

import { getBusiness, updateBusinessData } from "@/actions/businessData";
import DynamicInput from "@/components/DynamicInput";
import CustomButton from "@/components/ui/CustomButton";
import {
  agesSupportedOptions,
  genderOfAttendanceOptions,
  selectLanguages,
} from "@/constants/constants";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { BusinessPersonalInfo, serviceAgeNames } from "@/types/business";
import { generateSelectDefault } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const Support = () => {
  const router = useRouter();
  const { displayAlert } = useFeatureContext();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    const infos = {
      languages,
      agesSupported,
      genderOfAttendants,
      providerSpecialSkills,
      disabilitySpecialities,
    };
    const data = await updateBusinessData(infos!);
    if (data.success) {
      displayAlert(data.message, true);
      router.push("/on-board/contacts");
    } else {
      displayAlert(data.message, false);
    }
    setLoading(false);
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
    <div className="space-y-6 md:space-y-12 mb-8">
      <div className="border-b border-gray-900/10 pb-4 md:pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Business Support
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Submit the services the business provides.
        </p>
      </div>
      <div>
        <div className="mt-4 md:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

          <div className="col-span-3 md:col-span-full">
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
          <div className="col-span-3 md:col-span-full">
            <DynamicInput
              name="Disability Specialities"
              data={disabilitySpecialities}
              setData={setDisabilitySpecialities}
            />
          </div>
          <div className="col-span-3 md:col-span-full">
            <DynamicInput
              name="Provider Special Skills"
              data={providerSpecialSkills}
              setData={setProviderSpecialSkills}
            />
          </div>
        </div>
      </div>

      {/* //! Submit buttons */}
      <div className="my-6">
        <CustomButton isLoading={loading} onClick={handleSubmit} type="submit">
          Save
        </CustomButton>
      </div>
    </div>
  );
};

export default Support;
