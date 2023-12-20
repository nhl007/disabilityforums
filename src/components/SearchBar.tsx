"use client";

import {
  agesSupportedOptions,
  complexNeedsSupportedOptions,
  genderOfAttendanceOptions,
  selectDeliveryOptions,
  selectLanguages,
  selectOptions,
} from "@/constants/constants";
import { ChevronDown, MapPin, Search } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useRouter } from "next/navigation";

import { FormEvent, SetStateAction, useState } from "react";
import Select from "react-select";
import { generateSelectDefault } from "@/utils/utils";

const SearchBar = () => {
  // const params = useSearchParams();

  const customStyles: any = {
    control: (base: any) => ({
      ...base,
      height: 71,
      minHeight: 30,
      boxShadow: "none",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 0,
      "&:hover": {
        outline: "none",
      },
    }),
  };

  const [moreOptions, setMoreOptions] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [postCode, setPostCode] = useState("");
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState("15");

  const [delivery, setDelivery] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [languages, setLanguages] = useState("AusLan");
  const [complexNeeds, setComplexNeeds] = useState("");

  const [ndis, setNdis] = useState(false);
  const [companiesOnly, setCompaniesOnly] = useState(false);
  const [tradersOnly, setTradersOnly] = useState(false);

  const router = useRouter();

  const handleCheckboxChange = (
    value: string,
    prev: string[],
    setData: React.Dispatch<SetStateAction<string[]>>
  ) => {
    if (prev.includes(value)) {
      setData(prev.filter((item) => item !== value));
    } else {
      setData([...prev, value]);
    }
  };

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMoreOptions(false);
    const urlObj = {
      keyword: keyword,
      postCode: postCode,
      category: category,
      radius: radius,
      delivery: delivery,
      gender: gender,
      age: age,
      languages: languages,
      complexNeeds: complexNeeds,
    };

    let url = "/directory/s?";

    for (const [key, value] of Object.entries(urlObj)) {
      url = url + key + "=" + value + "&";
    }
    router.replace(url);
  };

  return (
    <section className=" bg-bg-banner py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col rounded-2xl p-6 bg-bg-main">
          <h1 className=" text-xl md:text-2xl font-bold tracking-normal md:tracking-wide">
            Connecting you with local NDIS providers that have immediate
            availability
          </h1>
          <form
            className="flex flex-col md:flex-row mt-4"
            onSubmit={onSearchSubmit}
          >
            <div className="relative">
              <Search className="absolute left-2 h-full flex justify-center items-center" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Keyword or Business Name"
                name="keyword"
                type="text"
                className="rounded-t-[6px] md:rounded-l-[6px] py-3 text-base pl-[44px] pr-[16px] border w-full md:w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <div>
              <Select
                id="category"
                value={generateSelectDefault(
                  [category] ?? [
                    {
                      label: "Category",
                      value: "",
                    },
                  ]
                )}
                instanceId="gender"
                name="category"
                options={selectOptions}
                className="w-full md:w-[270px] h-auto text-base"
                onChange={(val) => {
                  setCategory(val?.value ?? "");
                }}
                styles={customStyles}
                isSearchable={true}
                placeholder="Any Category"
              />
            </div>

            <div className="relative">
              <MapPin className=" absolute left-2 h-full flex justify-center items-center" />
              <input
                placeholder="Suburb or Post Code"
                onChange={(e) => setPostCode(e.target.value)}
                value={postCode}
                name="postalCode"
                type="text"
                className=" py-3 text-base pl-[44px] pr-[16px] border w-full md:w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <div className="relative">
              <select
                onChange={(e) => setRadius(e.target.value)}
                value={radius}
                name="radius"
                className="rounded-r-[6px] py-3 text-base px-4 border w-full md:w-[270px] h-[71px] focus:outline-none"
              >
                <option value="1">Add radius of xx km</option>
                <option value="2">2km</option>
                <option value="5">5km</option>
                <option value="10">10km</option>
                <option value="15">15km</option>
                <option value="30">30km</option>
                <option value="50">50km</option>
                <option value="100">100km</option>
                <option value="250">250km</option>
                <option value="500">500km</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 md:mt-0 md:ml-2 bg-btn-orange md:text-lg text-txt-blue px-4 h-[71px] w-full rounded-md"
            >
              Search
            </button>
          </form>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 font-semibold">
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={(e) => setNdis((prev) => !prev)}
                id="edit-ndis"
                name="ndis"
                checked={ndis}
              />
              <label htmlFor="edit-ndis">NDIS Registered only</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="edit-companies"
                name="companies"
                onChange={() => {
                  setCompaniesOnly((prev) => !prev);
                  setTradersOnly(false);
                }}
                checked={companiesOnly}
              />
              <label htmlFor="edit-companies">Companies Only</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                onChange={() => {
                  setTradersOnly((prev) => !prev);
                  setCompaniesOnly(false);
                }}
                id="edit-sole_traders"
                name="sole_traders"
                checked={tradersOnly}
              />
              <label htmlFor="edit-sole_traders">Sole Traders Only</label>
            </div>
            <button
              onClick={() => setMoreOptions((prev) => !prev)}
              className="flex gap-1 items-center font-medium"
            >
              More Search Options <ChevronDown size={16} />
            </button>
          </div>
          {moreOptions ? (
            <div className="flex flex-col md:gap-6">
              <div className="flex md:gap-20 md:py-6">
                <div className="">
                  <h2 className="font-semibold text-lg">Service Delivery</h2>
                  {selectDeliveryOptions.map((value, index) => {
                    return (
                      <div className="flex gap-2 mt-1 " key={index}>
                        <input
                          id={value.value}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e.target.value,
                              delivery,
                              setDelivery
                            )
                          }
                          type="checkbox"
                          checked={delivery.includes(value.value)}
                          value={value.value}
                        />
                        <label htmlFor={value.value} className="font-medium">
                          {value.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    Gender of Attendants
                  </h2>
                  {genderOfAttendanceOptions.map((value, index) => {
                    return (
                      <div className="flex gap-2 mt-1" key={index}>
                        <input
                          id={value.value}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e.target.value,
                              gender,
                              setGender
                            )
                          }
                          type="checkbox"
                          checked={gender.includes(value.value)}
                          value={value.value}
                        />
                        <label htmlFor={value.value} className=" font-medium">
                          {value.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Ages Supported</h2>
                  {agesSupportedOptions.map((value, index) => {
                    return (
                      <div className="flex gap-2 mt-1" key={index}>
                        <input
                          id={value.value}
                          onChange={(e) =>
                            handleCheckboxChange(e.target.value, age, setAge)
                          }
                          type="checkbox"
                          checked={age.includes(value.value)}
                          value={value.value}
                        />
                        <label htmlFor={value.value} className="font-medium">
                          {value.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex md:gap-20">
                <div className="flex flex-col gap-1">
                  <label className="font font-semibold" htmlFor="languages">
                    Complex Needs Supported
                  </label>
                  <Select
                    id="complexNeeds"
                    value={generateSelectDefault(
                      [complexNeeds] ?? [
                        {
                          label: "Complex needs Supported",
                          value: "",
                        },
                      ]
                    )}
                    instanceId="complexNeeds"
                    name="complexNeeds"
                    options={complexNeedsSupportedOptions}
                    className="w-full md:w-[270px] h-auto text-base"
                    onChange={(val) => {
                      setComplexNeeds(val?.value ?? "");
                    }}
                    isSearchable={true}
                    placeholder="Complex Needs Supported"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font font-semibold" htmlFor="languages">
                    Languages Supported
                  </label>
                  <Select
                    id="languages"
                    value={generateSelectDefault(
                      [languages] ?? [
                        {
                          label: "Language",
                          value: "",
                        },
                      ]
                    )}
                    instanceId="languages"
                    name="languages"
                    options={selectLanguages}
                    className="w-full md:w-[270px] h-auto text-base"
                    onChange={(val) => {
                      setLanguages(val?.value ?? "");
                    }}
                    // styles={customStyles}
                    isSearchable={true}
                    placeholder="Select Language"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchBar;
