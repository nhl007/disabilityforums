"use client";

import { getBusiness, updateBusinessData } from "@/actions/businessData";
import CustomButton from "@/components/ui/CustomButton";
import {
  selectDeliveryOptions,
  selectOptions,
  selectPaymentOptions,
} from "@/constants/constants";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { BusinessPersonalInfo } from "@/types/business";
import { generateSelectDefault } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const About = () => {
  const router = useRouter();
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);

  const { displayAlert } = useFeatureContext();

  const setInitialData = async () => {
    const resp = await getBusiness([
      "about",
      "paymentTypes",
      "services",
      "deliveryOptions",
    ]);

    const data = JSON.parse(resp);

    if (data.data) {
      setAbout(data.data.about);
      setPaymentTypes(data.data.paymentTypes);
      setServices(data.data.services);
      setDeliveryOptions(data.data.deliveryOptions);
    }
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const infos = {
      about,
      paymentTypes,
      services,
      deliveryOptions,
    };

    const data = await updateBusinessData(infos!);
    if (data.success) {
      displayAlert(data.message, true);
      router.push("/on-board/support");
    } else {
      displayAlert(data.message, false);
    }
    setLoading(false);
  };
  return (
    <div className="space-y-6 md:space-y-12 mb-8">
      <div className="border-b border-gray-900/10 md:pb-12 pb-4">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          About Business
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Write some information about your business.
        </p>
      </div>
      <div>
        <div className=" mt-4 md:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="md:col-span-full col-span-3">
            <label
              htmlFor="services"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Services
            </label>
            <Select
              id="services"
              value={generateSelectDefault(services)}
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
              value={generateSelectDefault(deliveryOptions)}
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
              value={generateSelectDefault(paymentTypes)}
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
          <div className="md:col-span-full col-span-3">
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
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  text-sm md:text-base sm:leading-6"
                value={about}
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
      <div className="my-6">
        <CustomButton isLoading={loading} onClick={handleSubmit} type="submit">
          Save
        </CustomButton>
      </div>
    </div>
  );
};

export default About;
