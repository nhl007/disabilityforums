import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import SmallVerificationBox from "./ui/SmallVerificationBox";
import { BusinessDatabaseModel } from "@/types/business";

interface FeaturedBusinessCardProps {
  name: string;
  serviceLocations: BusinessDatabaseModel["serviceLocations"];
  businessType: string;
  about: string;
  rank: number;
}

const FeaturedBusinessCard = ({
  name,
  about,
  serviceLocations,
  rank,
  businessType,
}: FeaturedBusinessCardProps) => {
  return (
    <div className="w-[281px] h-[326px] flex flex-col gap-3 items-start">
      <div className="w-[281px] h-[200px] overflow-hidden">
        <Image
          className="rounded-md w-[281px] h-[200px]"
          src="/image.jpg"
          alt="business"
          width={281}
          height={200}
        />
      </div>

      <p className=" text-sm h-5 font-semibold line-clamp-1 overflow-ellipsis">
        {name}
      </p>
      <div className="flex gap-2">
        <SmallVerificationBox className="py-1.5 px-3 text-sm font-semibold">
          <CheckCircle size={16} /> {businessType}
        </SmallVerificationBox>
      </div>
      <p className="w-full h-[55px] line-clamp-3 text-[12px] break-words font-medium leading-4">
        {about}
      </p>

      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <MapPin className="mr-1" size={18} strokeWidth={2} />
          {serviceLocations.map((l, i) => {
            const regex = /\(([^)]+)\)/;
            const match = l.state.match(regex);
            return (
              <span className="text-sm font-semibold" key={i}>
                {match?.[1]}
                {i + 1 < serviceLocations.length ? ", " : ""}
              </span>
            );
          })}
        </div>
        <span className="font-semibold text-sm">Overall Rank {rank}</span>
      </div>
    </div>
  );
};

export default FeaturedBusinessCard;
