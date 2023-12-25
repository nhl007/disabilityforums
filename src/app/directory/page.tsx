import { getFeaturedBusiness } from "@/actions/businessActions";
import FeaturedBusinessCard from "@/components/FeaturedBusiness";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { BusinessDatabaseModel } from "@/types/business";
import Link from "next/link";

const page = async () => {
  const resp = await getFeaturedBusiness();
  if (!resp) return null;

  const data: Pick<
    BusinessDatabaseModel,
    | "BusinessName"
    | "about"
    | "serviceLocations"
    | "EntityTypeCode"
    | "_id"
    | "rank"
  >[] = await JSON.parse(resp);

  return (
    <div className=" my-8">
      <MaxWidthWrapper>
        <div className=" grid grid-flow-row grid-cols-4 place-items-center gap-x-7 gap-y-7">
          {data.map((b, i) => {
            return (
              <Link className="col-span-1" key={i} href={`/business/${b._id}`}>
                <FeaturedBusinessCard
                  about={b.about}
                  name={b.BusinessName.join(" ")}
                  businessType={b.EntityTypeCode}
                  rank={b.rank}
                  serviceLocations={b.serviceLocations}
                />
              </Link>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
