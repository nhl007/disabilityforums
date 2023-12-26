"use client";

import { getBusiness, updateBusinessData } from "@/actions/businessActions";
import ServiceLocationInput from "@/components/ServiceLocationInput";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { serviceLocationsType } from "@/types/business";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Contact = () => {
  // const router = useRouter();
  const { displayAlert } = useFeatureContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [serviceLocations, setServiceLocations] =
    useState<serviceLocationsType>([]);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const setInitialData = async () => {
    const resp = await getBusiness(["contact", "serviceLocations"]);

    const data = JSON.parse(resp);

    setServiceLocations(
      data.data?.serviceLocations.length ? data.data.serviceLocations : []
    );

    setEmail(data.data?.contact?.email ? data.data.contact.email : "");
    setPhone(data.data?.contact?.phone ? data.data.contact.phone : "");
    setWebsite(data.data?.contact?.website ? data.data.contact.website : "");
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const infos = {
      serviceLocations,
      contact: {
        email,
        phone,
        website,
      },
    };
    const data = await updateBusinessData(infos!);
    if (data.success) {
      displayAlert(data.message, true);
      // router.push("/on-board/support");
    } else {
      displayAlert(data.message, false);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 md:space-y-12 mb-8">
      <div className="border-b border-gray-900/10 md:pb-12 pb-4">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Contact Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Submit the contact information of the business.
        </p>
      </div>
      <div>
        <div className="mt-4 md:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2">
              <CustomInput
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                name="phone"
                id="phone"
                autoComplete="phone"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <CustomInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                // autoComplete="address-level1"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              website
            </label>
            <div className="mt-2">
              <CustomInput
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
                type="text"
                name="website"
                id="website"
                autoComplete="website"
              />
            </div>
          </div>
          <div className="sm:col-span-full">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Service Locations
            </label>
            <ServiceLocationInput
              data={serviceLocations}
              setData={setServiceLocations}
            />
          </div>
        </div>
      </div>

      {/* //! Submit buttons */}
      <div className="my-6 ">
        <CustomButton isLoading={loading} onClick={handleSubmit} type="submit">
          Save
        </CustomButton>
      </div>
    </div>
  );
};

export default Contact;
