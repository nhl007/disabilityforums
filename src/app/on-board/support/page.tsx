"use client";

import { getBusiness, updateBusinessData } from "@/actions/businessActions";
// import DynamicInput from "@/components/DynamicInput";
import CustomButton from "@/components/ui/CustomButton";
import {
  agesSupportedOptions,
  complexNeedsSupportedOptions,
  disabilitiesExperienceOptions,
  genderOfAttendanceOptions,
  otherProviderSkillsOptions,
  selectLanguages,
} from "@/constants/constants";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { serviceAgeNames } from "@/types/business";
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

  const [complexNeedsSupported, setComplexNeedsSupported] = useState<string[]>(
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
      complexNeedsSupported,
    };
    const data = await updateBusinessData(infos!, 3);
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
      "complexNeedsSupported",
    ]);

    // const data: Pick<
    //   BusinessPersonalInfo,
    //   | "languages"
    //   | "agesSupported"
    //   | "genderOfAttendants"
    //   | "providerSpecialSkills"
    //   | "disabilitySpecialities"
    // > = JSON.parse(resp);

    const data = JSON.parse(resp);

    if (data.data) {
      setAgesSupported(data.data.agesSupported);
      setLanguages(data.data.languages);
      setGenderOfAttendants(data.data.genderOfAttendants);
      setProviderSpecialSkills(data.data.providerSpecialSkills);
      setDisabilitySpecialities(data.data.disabilitySpecialities);
      setComplexNeedsSupported(data.data.complexNeedsSupported);
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
            <label
              htmlFor="disability_specialities"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Disability Specialities
            </label>
            <Select
              id="disability_specialities"
              value={generateSelectDefault(disabilitySpecialities)}
              isMulti
              instanceId="disability_specialities"
              name="disability_specialities"
              options={disabilitiesExperienceOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setDisabilitySpecialities(data);
              }}
              isSearchable={true}
              placeholder=""
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-3 md:col-span-full">
            <label
              htmlFor="special_skills"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Provider Special Skills
            </label>
            <Select
              id="special_skills"
              value={generateSelectDefault(providerSpecialSkills)}
              isMulti
              instanceId="special_skills"
              name="special_skills"
              options={otherProviderSkillsOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setProviderSpecialSkills(data);
              }}
              isSearchable={true}
              placeholder=""
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-3 md:col-span-full">
            <label
              htmlFor="complex_needs"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Complex Needs Supported
            </label>
            <Select
              id="complex_needs"
              value={generateSelectDefault(complexNeedsSupported)}
              isMulti
              instanceId="complex_needs"
              name="complex_needs"
              options={complexNeedsSupportedOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setComplexNeedsSupported(data);
              }}
              isSearchable={true}
              placeholder=""
              classNamePrefix="select"
            />
          </div>
          {/* <div className="col-span-3 md:col-span-full">
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
          </div> */}
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
