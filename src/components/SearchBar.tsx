"use client";

import { popularServices, selectOptions } from "@/constants/constants";
import { LucideWorkflow, MapPin, Search } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";

import { useRef, useState } from "react";
import Select from "react-select";

const SearchBar = () => {
  const customStyles: any = {
    control: (base: any) => ({
      ...base,
      height: 71,
      minHeight: 30,
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 0,
    }),
  };

  const [keyWord, setKeyWord] = useState("");
  const [postCode, setPostCode] = useState("");
  const [radius, setRadius] = useState("");
  const [category, setCategory] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectCategory = (category: string) => {
    setCategory(() => category);
    if (selectRef.current) {
      selectRef.current.selectedIndex = 1;
    }
  };

  const path = usePathname();

  return (
    <section className=" bg-bg-banner py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col rounded-2xl p-6 bg-bg-main">
          <h1 className=" text-2xl ">
            Connecting you with local NDIS providers that have immediate
            availability
          </h1>
          <form className="flex mt-4" action="/directory/s">
            <div className="relative w-[270px]">
              <Search className="absolute left-2 h-full flex justify-center items-center" />
              <input
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder="Keyword or Business Name"
                name="keyword"
                type="text"
                className="rounded-l-[6px] py-3 text-base pl-[44px] pr-[16px] border w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <div className=" w-[270px]">
              <Select
                id="category"
                defaultValue=""
                instanceId="gender"
                name="category"
                // @ts-expect-error
                options={selectOptions}
                className="w-[270px] h-auto text-base"
                // onChange={(val) => {
                //   const data = val.map((d: any) => d.value);
                //   setGenderOfAttendants(data);
                // }}
                styles={customStyles}
                isSearchable={true}
                placeholder="Any Category"
              />
            </div>

            <div className="relative w-[270px]">
              <MapPin className=" absolute left-2 h-full flex justify-center items-center" />
              <input
                placeholder="Suburb or Post Code"
                onChange={(e) => setPostCode(e.target.value)}
                name="postalCode"
                type="text"
                className=" py-3 text-base pl-[44px] pr-[16px] border w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <div className="relative w-[270px]">
              <select
                onChange={(e) => setRadius(e.target.value)}
                defaultValue={15}
                name="radius"
                className="rounded-r-[6px] py-3 text-base px-4 border w-[270px] h-[71px] focus:outline-none"
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
              className="ml-2 bg-btn-orange px-4 w-full rounded-md"
            >
              Search
            </button>
          </form>
          <div className="flex flex-row gap-4 mt-4">
            <div>
              <label htmlFor="edit-ndis">
                <input type="checkbox" id="edit-ndis" name="ndis" value="1" />
                NDIS Registered only
              </label>
            </div>
            <div>
              <label htmlFor="edit-ndis">
                <input type="checkbox" id="edit-ndis" name="ndis" value="1" />
                NDIS Registered only
              </label>
            </div>
          </div>
        </div>

        {path !== "/directory/s" ? (
          <>
            <h2 className=" mt-8 mb-3 text-xl font-bold text-center">
              Popular Services
            </h2>
            <div className="flex flex-wrap w-full gap-2 justify-center items-center">
              {popularServices.map((service, index) => {
                return (
                  <button
                    onClick={() => selectCategory(service)}
                    key={index}
                    className=" flex gap-2 bg-btn-main rounded-md text-[18px] leading-[27px] text-center py-3 px-3"
                  >
                    <LucideWorkflow />
                    {service}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchBar;
