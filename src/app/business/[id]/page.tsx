import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import {
  Car,
  Heart,
  MousePointerClick,
  Phone,
  Printer,
  Share2,
  WebhookIcon,
} from "lucide-react";
import BorderBox from "@/components/ui/BorderBox";
import { getBusinessById } from "@/actions/businessActions";
import { BusinessDatabaseModel } from "@/types/business";
import SmallVerificationBox from "@/components/ui/SmallVerificationBox";
import Link from "next/link";
import LocationDropdown from "@/components/LocationDropdown";
// import Reviews from "@/components/Reviews";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const resp = await getBusinessById(params.id);
  if (resp === null) return <p>not found</p>;
  const data = JSON.parse(resp) as Partial<BusinessDatabaseModel>;
  // console.log(data);

  return (
    <div>
      <div className="bg-bg-banner py-5 md:py-8">
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <Image width={220} height={120} src="/image.jpg" alt="name" />
            <div className="flex flex-col gap-2 md:gap-10">
              <h1 className="text-2xl md:text-4xl font-semibold w-fit truncate">
                {data.BusinessName?.length ? data.BusinessName.join(" ") : ""}
              </h1>
              <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                <span className="flex gap-2">
                  <Heart /> Save Provider
                </span>
                <span className="flex gap-2">
                  <Share2 /> Share
                </span>
                <span className="flex gap-2">
                  <Printer /> Print Page
                </span>
                {/* <span className="px-3 py-2 md:py-3 md:px-4 border-2 rounded-md border-blue-600">
                  Write a Review
                </span> */}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <SmallVerificationBox className="w-fit my-4 bg-green-300">
          Verified
        </SmallVerificationBox>
        <div className="grid md:grid-flow-col md:gap-x-6">
          {/* //! left side */}
          <div className="col-span-full md:col-span-6 flex flex-col gap-4 md:gap-6">
            {data.about && (
              <BorderBox>
                <h1 className=" text-2xl font-medium">About</h1>
                <p>{data.about}</p>
              </BorderBox>
            )}

            {data.services?.length ? (
              <BorderBox>
                <h1 className=" text-2xl font-medium">Services</h1>
                <ul className="list-disc mx-5">
                  {data.services.map((service) => {
                    return <li key={service}>{service}</li>;
                  })}
                </ul>
              </BorderBox>
            ) : null}
            {/* <BorderBox>
              <h1 className=" text-2xl font-medium">Services</h1>
            </BorderBox> */}
            <BorderBox>
              <h1 className=" text-2xl font-medium  mb-4">
                Additional Information
              </h1>

              {data.genderOfAttendants?.length ? (
                <>
                  <h1 className=" text-2xl font-medium mb-2">
                    Gender of attendants
                  </h1>
                  <ul className="list-disc mx-5 mb-4">
                    {data.genderOfAttendants.map((gen) => {
                      return <li key={gen}>{gen}</li>;
                    })}
                  </ul>
                </>
              ) : null}

              {data.languages?.length ? (
                <>
                  <h1 className=" text-2xl font-medium mb-2">Languages</h1>
                  <ul className="list-disc mx-5 mb-4">
                    {data.languages.map((lan) => {
                      return <li key={lan}>{lan}</li>;
                    })}
                  </ul>
                </>
              ) : null}
            </BorderBox>
          </div>

          {/* //! Right side */}
          <div className="mt-4 md:mt-0 col-span-full md:col-span-1 flex flex-col gap-4 md:gap-6">
            <BorderBox>
              <h1 className=" text-2xl font-medium">Contacts</h1>
              <div className="flex gap-2 mt-2 items-center">
                {data.contact?.website ? (
                  <>
                    <MousePointerClick size={16} />
                    <Link
                      target="_blank"
                      href={
                        data.contact.website.startsWith("https://")
                          ? data.contact.website
                          : `https://${data.contact.website}`
                      }
                    >
                      Visit Website
                    </Link>
                  </>
                ) : null}

                {data.contact?.phone ? (
                  <>
                    <Phone size={16} />
                    <Link href={`tel:${data.contact.phone}`}>
                      {data.contact.phone}
                    </Link>
                  </>
                ) : null}
              </div>
            </BorderBox>
            {data.deliveryOptions?.length ? (
              <BorderBox>
                <h1 className=" text-2xl font-medium">Delivery Options</h1>
                <div className="flex flex-col">
                  {data.deliveryOptions.map((option) => {
                    return (
                      <div key={option}>
                        <div className="flex gap-2 items-center">
                          {option === "Online" ? (
                            <WebhookIcon size={16} />
                          ) : (
                            <Car size={16} />
                          )}
                          {option}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BorderBox>
            ) : null}
            {/* {data.paymentTypes?.length ? (
              <BorderBox>
                <h1 className=" text-2xl font-medium">Payment Types</h1>
                <div className="flex flex-col">
                  {data.paymentTypes.map((payment) => {
                    return (
                      <div key={payment}>
                        <div className="flex gap-2 items-center">
                          <CreditCard size={16} /> {payment}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BorderBox>
            ) : null} */}
            {data.serviceLocations?.length ? (
              <BorderBox>
                <h1 className=" text-2xl font-medium">Service Locations</h1>
                {data.serviceLocations.map((loc) => {
                  return (
                    <LocationDropdown
                      key={loc.state}
                      state={loc.state}
                      suburbs={loc.suburbs}
                      classNames="w-full mt-2"
                    />
                  );
                })}
              </BorderBox>
            ) : null}
            {data.agesSupported?.length ? (
              <BorderBox>
                <h1 className=" text-2xl font-medium">Ages Supported</h1>
                <ul className="list-disc ml-5 mt-2">
                  {data.agesSupported.map((ages) => {
                    return <li key={ages}>{ages}</li>;
                  })}
                </ul>
              </BorderBox>
            ) : null}
          </div>
        </div>
        {/* <Reviews
          total={data.totalReviews ? data.totalReviews}
          rating={data.rating}
          _id={params.id}
          reviewsData={data.reviews}
        /> */}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
