"use client";
import Select from "react-select";

import Image from "next/image";
import {
  CarFront,
  Globe,
  Heart,
  Mail,
  MousePointerClick,
  PersonStanding,
  Phone,
  Printer,
  Share2,
  X,
} from "lucide-react";
import BorderBox from "@/components/ui/BorderBox";
import { getBusiness, updateBusinessData } from "@/actions/businessActions";
import { serviceAgeNames, serviceLocationsType } from "@/types/business";
import Link from "next/link";
import { useEffect, useState } from "react";
import { generateSelectDefault } from "@/utils/utils";
import {
  agesSupportedOptions,
  complexNeedsSupportedOptions,
  genderOfAttendanceOptions,
  selectDeliveryOptions,
  selectLanguages,
  selectOptions,
} from "@/constants/constants";
import CustomInput from "@/components/ui/CustomInput";
import ServiceLocationInput from "@/components/ServiceLocationInput";
import CustomButton from "@/components/ui/CustomButton";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { saveBase64Image } from "@/utils/saveImage";

const CreateList = () => {
  const { displayAlert } = useFeatureContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [about, setAbout] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [complexNeedsSupported, setComplexNeedsSupported] = useState<string[]>(
    []
  );

  const [genderOfAttendants, setGenderOfAttendants] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [agesSupported, setAgesSupported] = useState<serviceAgeNames[]>([]);

  const [serviceLocations, setServiceLocations] =
    useState<serviceLocationsType>([]);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const infos = {
      about,
      services,
      deliveryOptions,
      languages,
      agesSupported,
      genderOfAttendants,
      complexNeedsSupported,
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
      // router.push("/on-board/contacts");
    } else {
      displayAlert(data.message, false);
    }
    setLoading(false);
  };

  const setInitialData = async () => {
    const resp = await getBusiness([
      "about",
      "services",
      "deliveryOptions",
      "contact",
      "serviceLocations",
      "languages",
      "agesSupported",
      "genderOfAttendants",
      "complexNeedsSupported",
    ]);

    const data = JSON.parse(resp);

    setServiceLocations(
      data.data?.serviceLocations.length ? data.data.serviceLocations : []
    );

    setAbout(data.data.about);
    setServices(data.data.services);
    setDeliveryOptions(data.data.deliveryOptions);

    setEmail(data.data?.contact?.email ? data.data.contact.email : "");
    setPhone(data.data?.contact?.phone ? data.data.contact.phone : "");
    setWebsite(data.data?.contact?.website ? data.data.contact.website : "");

    setAgesSupported(data.data.agesSupported);
    setLanguages(data.data.languages);
    setGenderOfAttendants(data.data.genderOfAttendants);
    setComplexNeedsSupported(data.data.complexNeedsSupported);
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0];
    const fileReader = new FileReader();
    // const name = e.target.files?.[0].name;
    if (fileData) {
      fileReader.readAsDataURL(fileData);
      fileReader.onloadend = async () => {
        // const imageData = await saveBase64Image(
        //   fileReader.result as string,
        //   "name"
        // );
        // setImage(imageData);
        setImagePreview(fileReader.result as string);
      };
    }
  };

  return (
    <div>
      <div>
        <div className="my-6">
          <span className="text-3xl font-medium my-6">Upload a banner :</span>
          <div className="">
            <div className=" flex gap-2 items-center mt-2">
              <div className="w-[300px] flex items-center justify-start">
                <input
                  className=" py-2 px-4 block w-full text-sm text-white rounded-md cursor-pointer bg-btn-orange focus:outline-none"
                  id="file_input"
                  type="file"
                  accept=".svg,.png,.jpg"
                  onChange={saveImage}
                />
              </div>
              <button
                title="clear"
                className=" text-red-500 flex items-center bg-gray-400 rounded-md px-4 py-2 hover:bg-red-500 hover:text-white"
                onClick={() => setImagePreview("")}
              >
                <X />
              </button>
            </div>

            <p className="text-xs font-medium mt-1 ">
              SVG, PNG, JPG (MAX. 1200x300px).
            </p>
          </div>
        </div>
        <span className="text-2xl font-medium">Preview</span>
        {imagePreview ? (
          <div className="w-full h-[300px] overflow-hidden object-contain mt-4">
            <Image
              src={imagePreview}
              alt="banner"
              width={1280}
              height={300}
              className="object-cover h-[300px] w-[1280px]"
            />
          </div>
        ) : (
          <div className="bg-bg-banner py-5 md:py-8 px-4 mt-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center relative">
              <span className=" text-red-400 absolute top-2 right-2">
                *Default Banner
              </span>
              <Image width={220} height={120} src="/image.jpg" alt="name" />
              <div className="flex flex-col gap-2 md:gap-10">
                <h1 className="text-2xl md:text-4xl font-semibold w-fit truncate">
                  Business name
                </h1>
                <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                  <span className="flex gap-2">
                    <Heart /> Save Provider
                  </span>
                  <span className="flex gap-2">
                    <Share2 /> Share
                  </span>
                  <span className="flex gap-2">
                    <Printer /> Print List
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-flow-col md:grid-cols-8 md:gap-x-6 mt-8 mb-20">
        {/* //! left side */}
        <div className="col-span-full md:col-span-5 flex flex-col gap-4 md:gap-6">
          <BorderBox>
            <div className="md:col-span-full col-span-3 mb-4">
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your business.
              </p>

              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none outline-none placeholder:text-gray-400  text-sm md:text-base sm:leading-6"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </div>
            <h1 className=" text-2xl font-medium">About</h1>
            <p>{about}</p>
          </BorderBox>

          <BorderBox>
            <Select
              id="services"
              value={generateSelectDefault(services)}
              isMulti
              instanceId="services"
              name="services"
              options={selectOptions}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setServices(data);
              }}
              isSearchable={true}
              placeholder="Select Service Options"
            />
            <h1 className=" text-2xl font-medium">Services</h1>
            <ul className="list-disc mx-5">
              {services.map((service) => {
                return <li key={service}>{service}</li>;
              })}
            </ul>
          </BorderBox>

          <BorderBox>
            <Select
              id="complex_needs"
              value={generateSelectDefault(complexNeedsSupported)}
              isMulti
              instanceId="complex_needs"
              name="complex_needs"
              options={complexNeedsSupportedOptions}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setComplexNeedsSupported(data);
              }}
              isSearchable={true}
              placeholder="Select complex need options "
            />
            <h1 className=" text-2xl font-medium">Complex Needs Supported</h1>
            <ul className="list-disc mx-5">
              {complexNeedsSupported.map((cNeeds) => {
                return <li key={cNeeds}>{cNeeds}</li>;
              })}
            </ul>
          </BorderBox>

          <BorderBox>
            <h1 className=" text-2xl font-medium  mb-4">
              Additional Information
            </h1>

            <Select
              id="gender"
              value={generateSelectDefault(genderOfAttendants)}
              isMulti
              instanceId="gender"
              name="gender"
              options={genderOfAttendanceOptions}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setGenderOfAttendants(data);
              }}
              isSearchable={true}
              placeholder="Select Genders of Attendance"
              classNamePrefix="select"
            />

            <h1 className=" text-2xl font-medium mb-2">Gender of attendants</h1>
            <ul className="list-disc mx-5 mb-4">
              {genderOfAttendants.map((gen) => {
                return <li key={gen}>{gen}</li>;
              })}
            </ul>

            <Select
              id="Languages"
              value={generateSelectDefault(languages)}
              isMulti
              instanceId="Languages"
              name="Languages"
              options={selectLanguages}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setLanguages(data);
              }}
              isSearchable={true}
              placeholder="Select Languages"
              classNamePrefix="select"
            />
            <h1 className=" text-2xl font-medium mb-2">Languages</h1>
            <ul className="list-disc mx-5 mb-4">
              {languages.map((lan) => {
                return <li key={lan}>{lan}</li>;
              })}
            </ul>
          </BorderBox>
        </div>

        {/* //! Right side */}
        <div className="mt-4 md:mt-0 col-span-full md:col-span-3 flex flex-col gap-4 md:gap-6">
          <BorderBox>
            <h1 className=" text-2xl font-medium">Contacts</h1>
            <div className="">
              <div className="mt-2">
                <CustomInput
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  placeholder="Contact Number"
                />
              </div>

              <div className="">
                <div className="mt-2">
                  <CustomInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Contact email"
                    // autoComplete="address-level1"
                  />
                </div>
              </div>

              <div className="">
                <div className="mt-2">
                  <CustomInput
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                    type="text"
                    name="website"
                    id="website"
                    autoComplete="website"
                    placeholder="Business Website"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2 items-center flex-wrap">
              {website ? (
                <>
                  <MousePointerClick size={16} />
                  <Link
                    target="_blank"
                    href={
                      website.startsWith("https://")
                        ? website
                        : `https://${website}`
                    }
                  >
                    Visit Website
                  </Link>
                </>
              ) : null}

              {phone ? (
                <>
                  <Phone size={16} />
                  <Link href={`tel:${phone}`}>{phone}</Link>
                </>
              ) : null}
              {email ? (
                <div className="flex gap-1 items-center">
                  <Mail size={16} />
                  <Link href={`mailto:${email}`}>{email}</Link>
                </div>
              ) : null}
            </div>
          </BorderBox>
          <BorderBox>
            <Select
              id="delivery_options"
              value={generateSelectDefault(deliveryOptions)}
              isMulti
              instanceId="delivery"
              name="delivery"
              options={selectDeliveryOptions}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setDeliveryOptions(data);
              }}
              isSearchable={true}
              placeholder="Select delivery options"
              classNamePrefix="select"
            />
            <h1 className=" text-2xl font-medium">Delivery Options</h1>
            <div className="flex flex-col">
              {deliveryOptions.map((option) => {
                return (
                  <div key={option}>
                    <div className="flex gap-2 items-center">
                      {option === "Online/Telehealth" ? (
                        <Globe size={16} />
                      ) : option === "Mobile" ? (
                        <CarFront size={16} />
                      ) : (
                        <PersonStanding size={16} />
                      )}
                      {option}
                    </div>
                  </div>
                );
              })}
            </div>
          </BorderBox>
          <BorderBox>
            <ServiceLocationInput
              data={serviceLocations}
              setData={setServiceLocations}
            />
            {/* <h1 className=" text-2xl font-medium">Service Locations</h1>
            {serviceLocations.map((loc) => {
              return (
                <LocationDropdown
                  key={loc.state}
                  state={loc.state}
                  suburbs={loc.suburbs}
                  classNames="w-full mt-2"
                />
              );
            })} */}
          </BorderBox>

          <BorderBox>
            <Select
              id="ages_supported"
              value={generateSelectDefault(agesSupported)}
              isMulti
              instanceId="ages_supported"
              name="ages_supported"
              options={agesSupportedOptions}
              className="basic-multi-select mb-4"
              onChange={(val) => {
                const data = val.map((d: any) => d.value);
                setAgesSupported(data);
              }}
              isSearchable={true}
              placeholder="Select Ages Supported"
              classNamePrefix="select"
            />
            <h1 className=" text-2xl font-medium">Ages Supported</h1>
            <ul className="list-disc ml-5 mt-2">
              {agesSupported.map((ages) => {
                return <li key={ages}>{ages}</li>;
              })}
            </ul>
          </BorderBox>
        </div>
      </div>
      <div className="my-6">
        <CustomButton
          isLoading={loading}
          onClick={handleSubmit}
          className=" w-40"
        >
          Save
        </CustomButton>
      </div>
    </div>
  );
};

export default CreateList;
