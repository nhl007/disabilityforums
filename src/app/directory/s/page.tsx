import { searchBusinesses } from "@/actions/businessData";
import BusinessCard from "@/components/BusinessCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { BusinessDatabaseModel } from "@/types/business";
import Link from "next/link";

interface BusinessSearchParams {
  searchParams: {
    keyword: string;
    radius: string;
    postalCode: string;
    category: string;
  };
}

const page = async ({ searchParams }: BusinessSearchParams) => {
  const resp = await searchBusinesses(
    searchParams.postalCode,
    searchParams.keyword,
    searchParams.category,
    searchParams.radius ?? "15"
  );

  if (!resp) return <p>not found</p>;

  const data: Pick<
    BusinessDatabaseModel,
    "BusinessName" | "about" | "services" | "_id"
  >[] = await JSON.parse(resp);

  return (
    <div className="py-10">
      <MaxWidthWrapper>
        <div className="grid grid-flow-col">
          <div className="col-span-1 min-w-[300px]">
            <h1 className="text-xl font-semibold">Refine Results</h1>
          </div>
          <div className="col-span-3">
            <p className=" mb-4">Total 290 results</p>
            <div className="flex flex-col space-y-4">
              {data.map((data, i) => (
                <Link href={`/business/${data._id}`} key={i}>
                  <BusinessCard
                    name={data.BusinessName.join(" ")}
                    description={data.about}
                    services={data.services}
                    verification="verified"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
