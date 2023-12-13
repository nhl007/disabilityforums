import Image from "next/image";
import BorderBox from "./ui/BorderBox";
import { CheckCircle, Map } from "lucide-react";
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
}

const FeaturedBusinessCard = ({
  name,
  about,
  services,
}: FeaturedBusinessCardProps) => {
  return (
    <BorderBox className="min-w-[377px] min-h-[530px]">
      <div className="flex flex-col gap-4 items-start h-full w-full">
        <div className="h-auto self-center justify-self-center place-self-center">
          <Image src="/image.jpg" alt="business" width={300} height={200} />
        </div>
        <h2 className=" text-lg font-medium">{name}</h2>
        <div className="flex gap-2">
          <SmallVerificationBox>
            <CheckCircle size={16} /> Verified
          </SmallVerificationBox>
        </div>
        <p>{about}</p>
        <div className="mt-auto flex flex-col gap-1">
          <span>
            <Map /> WA
          </span>
          <div className="flex gap-1 flex-row">
            {services.map((s, i) => {
              return (
                <span className=" text-sm" key={i}>
                  {s}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </BorderBox>
  );
};
