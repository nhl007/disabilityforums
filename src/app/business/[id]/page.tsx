import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import { BusinessMock } from "@/constants/constants";
import { Heart } from "lucide-react";
import BorderBox from "@/components/BorderBox";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  //? initial load get data from database with id

  return (
    <div>
      <div className="bg-bg-banner py-8">
        <MaxWidthWrapper>
          <div className="flex gap-6 items-center">
            <Image width={220} height={120} src="/image.jpg" alt="name" />
            <div className="flex flex-col gap-10">
              <h1 className=" text-4xl font-semibold w-fit truncate">
                {BusinessMock[0].name}
              </h1>
              <div className="flex gap-4 items-center">
                <span className="flex gap-2">
                  <Heart /> Save Provider
                </span>
                <span className="flex gap-2">
                  <Heart /> Share
                </span>
                <span className="flex gap-2">
                  <Heart /> Print Page
                </span>
                <span className="py-3 px-4 border-2 border-blue-600">
                  Write a Review
                </span>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <p className="py-3 px-4 bg-green-200 my-6 w-fit rounded-md">Verified</p>
        <div className="grid grid-flow-col gap-x-6">
          {/* //! left side */}
          <div className="col-span-5 flex flex-col gap-6">
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
          </div>

          {/* //! Right side */}
          <div className=" col-span-2 flex flex-col gap-6">
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
            <BorderBox>
              <h1>ok</h1>
            </BorderBox>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
