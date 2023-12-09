"use client";

import { popularServices } from "@/constants/constants";
import { MapPin, Search } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";

const PopularServices = ({ serviceName }: { serviceName: string }) => {
  return (
    <button className=" bg-violet-400 text-[18px] leading-[27px] text-center py-3 px-3">
      {serviceName}
    </button>
  );
};

const SearchBar = () => {
  const path = usePathname();
  console.log(path);
  return (
    <section className=" bg-bg-banner py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col rounded-2xl p-6 bg-bg-main">
          <h1 className=" text-2xl ">
            Connecting you with local NDIS providers that have immediate
            availability
          </h1>
          <div className="flex mt-4">
            <div className="relative">
              <Search className=" absolute left-2 h-full flex justify-center items-center" />
              <input
                placeholder="Keyword or Business Name"
                name="businessName"
                type="text"
                className="rounded-l-[6px] py-3 text-base pl-[44px] pr-[16px] border w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <select
              defaultValue="Any Category"
              className=" py-3 text-base px-4 border w-[270px] h-[71px] focus:outline-none"
            >
              <option value="null">Any Category</option>
              <optgroup label="Support">
                <option value="265">Support Worker</option>
                <option value="12008">Accessing the Community</option>
                <option value="6650">Nurse</option>
                <option value="9644">Mentor</option>
                <option value="11974">Social Worker</option>
              </optgroup>
              <optgroup label="Allied Health (Therapies)">
                <option value="13207">Art Therapy</option>
                <option value="8826">Counselling</option>
                <option value="9100">Developmental Educator</option>
                <option value="11239">Dietician</option>
                <option value="8827">Exercise Physiology</option>
                <option value="12368">Key Worker</option>
                <option value="12741">Music Therapy</option>
                <option value="6653">Occupational Therapy</option>
                <option value="6647">Physiotherapy</option>
                <option value="11102">Podiatry</option>
                <option value="9969">Positive Behaviour Support Plan</option>
                <option value="6975">Psychology</option>
                <option value="12740">Psychotherapy</option>
                <option value="13211">Social Worker</option>
                <option value="6652">Speech Therapy</option>
                <option value="9921">Therapy Assistant</option>
                <option value="6655">Other (Sand, Animal, Play)</option>
              </optgroup>
              <optgroup label="Plan Support">
                <option value="13218">Plan Manager</option>
                <option value="7846">Support Coordinator</option>
                <option value="9453">Specialist Support Coordinator</option>
                <option value="9405">Recovery Coach (PRS)</option>
              </optgroup>
              <optgroup label="Skills Development">
                <option value="9546">Support in Employment</option>
                <option value="9759">Life Skills</option>
                <option value="13212">Mentoring</option>
                <option value="13217">Travel Training</option>
              </optgroup>
              <optgroup label="Home Maintenance">
                <option value="6642">Cleaning</option>
                <option value="12179">Gardening</option>
                <option value="13209">Yard Maintenance</option>
                <option value="9533">Handyperson &amp; Repairs</option>
              </optgroup>
              <optgroup label="Housing">
                <option value="9388">ILO</option>
                <option value="9387">
                  Specialist Disability Accommodation (SDA)
                </option>
                <option value="12540">Medium Term Accommodation</option>
                <option value="4922">Respite/Short Term Accommodation</option>
                <option value="8934">Supported Independent Living (SIL)</option>
              </optgroup>
              <optgroup label="Social, Health &amp; Wellbeing">
                <option value="268">Social Programs &amp; Activities</option>
                <option value="9157">Personal Training</option>
                <option value="11264">Family and Peer Support Groups</option>
              </optgroup>
              <optgroup label="Children">
                <option value="290">Early Intervention &amp; Children</option>
              </optgroup>
              <optgroup label="Employment">
                <option value="13215">Finding and Keeping a Job</option>
                <option value="13216">SLES</option>
              </optgroup>
              <optgroup label="Equipment">
                <option value="6561">Disability Aids</option>
              </optgroup>
            </select>
            <div className="relative">
              <MapPin className=" absolute left-2 h-full flex justify-center items-center" />
              <input
                placeholder="Suburb or Post Code"
                name="businessName"
                type="text"
                className=" py-3 text-base pl-[44px] pr-[16px] border w-[270px] h-[71px] focus:outline-none"
              />
            </div>
            <select
              defaultValue={15}
              className="rounded-r-[6px] py-3 text-base px-4 border w-[270px] h-[71px] focus:outline-none"
            >
              <option value="1">Add radius of xxkm</option>
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
            <button className=" ml-2 bg-btn-orange px-4 rounded-md">
              Search
            </button>
          </div>
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

        {path !== "/business/s" ? (
          <>
            <h2 className=" mt-8 mb-3 text-xl font-bold text-center">
              Popular Services
            </h2>
            <div className="flex flex-wrap w-full gap-2 justify-center items-center">
              {popularServices.map((service, index) => {
                return <PopularServices key={index} serviceName={service} />;
              })}
            </div>
          </>
        ) : null}
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchBar;
