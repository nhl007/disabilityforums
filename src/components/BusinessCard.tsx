import Image from "next/image";
import React from "react";
import { BusinessMock } from "@/constants/constants";

type Businessdata = (typeof BusinessMock)[0];

const BusinessCard = (data: Businessdata) => {
  BusinessMock;
  return (
    <div className="flex gap-6 p-[20px] border-gray-200 border-[1.5px] rounded-lg max-w-[100%]">
      <Image src="/image.jpg" alt="business" width={284} height={150} />
      <div className="flex flex-col gap-4">
        <h1 className=" text-2xl font-semibold">{data.name}</h1>
        <p className="mb-4 py-2 px-2.5 bg-red-200 w-fit rounded-md">
          {data.verification}
        </p>
        <p className="break-words w-fit h-[82px] text-sm font-medium overflow-hidden">
          {data.description}
        </p>
        <p className="flex flex-wrap gap-x-4 text-ellipsis text-sm justify-start items-center ">
          {data.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;
