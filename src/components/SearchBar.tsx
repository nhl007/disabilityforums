"use client";

import { popularServices, selectOptions } from "@/constants/constants";
import { LucideWorkflow, MapPin, Search } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname, useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import Select from "react-select";
import { generateSelectDefault } from "@/utils/utils";

const SearchBar = () => {
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

  const [keyword, setKeyword] = useState("");
  const [postCode, setPostCode] = useState("");
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState("15");

  const path = usePathname();
  const router = useRouter();

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = `/directory/s?keyword=${keyword}&category=${category}&postalCode=${postCode}&radius=${radius}`;
    router.push(url);
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
              className="mt-4 md:mt-0 md:ml-2 bg-btn-orange px-4 h-[71px] w-full rounded-md"
            >
              Search
            </button>
          </form>
          <div className="flex flex-row gap-4 mt-4 font-semibold">
            <div className="flex gap-2">
              <input type="checkbox" id="edit-ndis" name="ndis" value="1" />
              <label htmlFor="edit-ndis">NDIS Registered only</label>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" id="edit-ndis" name="ndis" value="1" />
              <label htmlFor="edit-ndis">Verified Only</label>
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
                    onClick={() => setCategory(service)}
                    key={index}
                    className=" flex gap-2 bg-btn-main rounded-md text-[16px] font-medium leading-[27px] text-center py-3 px-3"
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
