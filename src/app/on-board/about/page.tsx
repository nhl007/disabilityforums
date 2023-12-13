"use client";

import { postBusinessData } from "@/actions/businessData";
import {
  selectDeliveryOptions,
  selectOptions,
  selectPaymentOptions,
} from "@/constants/constants";
import { BusinessPersonalInfo } from "@/types/business";
import { useState } from "react";
import Select, { MultiValue } from "react-select";

const About = () => {
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);

  const handleSubmit = async () => {
    const infos = {
      about,
      paymentTypes,
      services,
      deliveryOptions,
    };

    const data = await postBusinessData(infos);

    console.log(data);
  };
  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          About Business
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Write some information about your business.
        </p>
      </div>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="services"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Services
            </label>
            <Select
              id="services"
              defaultValue={null}
              isMulti
              instanceId="services"
              name="services"
              options={selectOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setServices(data);
              }}
              isSearchable={true}
              placeholder="Select Categories"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="delivery_options"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Delivery Options
            </label>
            <Select
              id="delivery_options"
              defaultValue={null}
              isMulti
              instanceId="delivery"
              name="delivery"
              options={selectDeliveryOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setDeliveryOptions(data);
              }}
              isSearchable={true}
              placeholder="Select delivery options"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="payment_types"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              PaymentTypes
            </label>
            <Select
              id="payment_types"
              defaultValue={null}
              isMulti
              instanceId="payment"
              name="payment"
              options={selectPaymentOptions}
              className="basic-multi-select"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setPaymentTypes(data);
              }}
              isSearchable={true}
              placeholder="Select Payment Methods"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about your business.
            </p>
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

export default About;

//   <optgroup label="Home Maintenance">
//     <option value="6642">Cleaning</option>
//     <option value="12179">Gardening</option>
//     <option value="13209">Yard Maintenance</option>
//     <option value="9533">Handyperson &amp; Repairs</option>
//   </optgroup>
//   <optgroup label="Housing">
//     <option value="9388">ILO</option>
//     <option value="9387">Specialist Disability Accommodation (SDA)</option>
//     <option value="12540">Medium Term Accommodation</option>
//     <option value="4922">Respite/Short Term Accommodation</option>
//     <option value="8934">Supported Independent Living (SIL)</option>
//   </optgroup>
//   <optgroup label="Social, Health &amp; Wellbeing">
//     <option value="268">Social Programs &amp; Activities</option>
//     <option value="9157">Personal Training</option>
//     <option value="11264">Family and Peer Support Groups</option>
//   </optgroup>
//   <optgroup label="Children">
//     <option value="290">Early Intervention &amp; Children</option>
//   </optgroup>
//   <optgroup label="Employment">
//     <option value="13215">Finding and Keeping a Job</option>
//     <option value="13216">SLES</option>
//   </optgroup>
//   <optgroup label="Equipment">
//     <option value="6561">Disability Aids</option>
//   </optgroup>
// </select>;
