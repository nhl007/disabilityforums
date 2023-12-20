import Image from "next/image";
import { CheckCircle } from "lucide-react";
import SmallVerificationBox from "./ui/SmallVerificationBox";
import { BusinessDatabaseModel } from "@/types/business";

interface FeaturedBusinessCardProps {
  name: string;
  services: BusinessDatabaseModel["services"];
  about: string;
}

const FeaturedBusinessCard = ({
  name,
  about,
  services,
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
          <CheckCircle size={16} /> Verified
        </SmallVerificationBox>
      </div>
      <p className="w-full h-[55px] line-clamp-3 text-[12px] break-words font-medium leading-4">
        {about}
      </p>

      <p className="w-full h-[20px] tracking-tighter line-clamp-1 text-[10px] break-words font-medium">
        {services.join(" | ")}
      </p>
    </div>
  );
};

export default FeaturedBusinessCard;
