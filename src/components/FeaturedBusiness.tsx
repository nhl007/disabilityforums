import Image from "next/image";
import BorderBox from "./ui/BorderBox";
import { CheckCircle, MapPin } from "lucide-react";
import SmallVerificationBox from "./ui/SmallVerificationBox";
import { getBusinessByStates } from "@/actions/businessData";
import { BusinessDatabaseModel } from "@/types/business";
import Link from "next/link";

interface FeaturedBusinessProps {
  AddressState: string;
}

const FeaturedBusiness = async ({ AddressState }: FeaturedBusinessProps) => {
  const resp = await getBusinessByStates(AddressState);
  if (!resp) return null;

  const data: Pick<
    BusinessDatabaseModel,
    "BusinessName" | "about" | "services" | "_id"
  >[] = await JSON.parse(resp);

  return (
    <div className=" my-8">
      <h1 className=" text-4xl font-semibold mb-4">
        Featured Providers in {AddressState}
      </h1>
      <div className="flex w-full overflow-x-scroll gap-7 scroll-smooth no-scrollbar">
        {data.map((b, i) => {
          return (
            <Link key={i} href={`/business/${b._id}`}>
              <FeaturedBusinessCard
                about={b.about}
                name={b.BusinessName.join(" ")}
                services={b.services}
                state={AddressState}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedBusiness;

interface FeaturedBusinessCardProps {
  name: string;
  services: BusinessDatabaseModel["services"];
  about: string;
  state: string;
}

const FeaturedBusinessCard = ({
  name,
  about,
  services,
  state,
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

      <p className=" text-sm font-semibold">{name}</p>
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
