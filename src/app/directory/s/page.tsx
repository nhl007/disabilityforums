import { searchBusinesses } from "@/actions/businessData";
import BusinessCard from "@/components/BusinessCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RefineResults from "@/components/RefineResults";
import { BusinessDatabaseModel } from "@/types/business";
import { BusinessSearchParams } from "@/types/common";
import Link from "next/link";

const page = async ({ searchParams }: BusinessSearchParams) => {
  let data: Pick<
    BusinessDatabaseModel,
    "BusinessName" | "about" | "services" | "_id" | "rating"
  >[] = [];

  const resp = await searchBusinesses(searchParams);

  if (resp) {
    data = await JSON.parse(resp);
  }

  return (
    <div className="py-10">
      <MaxWidthWrapper>
        <div>
          {/* <div className="grid grid-flow-row md:grid-flow-col md:gap-x-2"> */}
          {/* <div className="md:col-span-1 col-span-3 pr-8 w-full md:w-[300px]">
            <h1 className="text-xl font-semibold  border-b-2 pb-3">
              Refine Results
            </h1>
            <div>
              <RefineResults searchParams={searchParams} />
            </div>
          </div> */}
          {data.length ? (
            <div className="col-span-3">
              <p className=" mt-4 md:mt-0 mb-4">Total 290 results</p>
              <div className="flex flex-col space-y-2 md:space-y-4">
                {data.map((data, i) => (
                  <Link href={`/business/${data._id}`} key={i}>
                    <BusinessCard
                      name={data.BusinessName.join(" ")}
                      description={data.about}
                      services={data.services}
                      verification="verified"
                      rating={data.rating}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-3">
              <p className=" text-3xl">
                No results? Let our connection team help you!
              </p>
              <p>We did not find a perfect match using your requirements.</p>
              <p>
                Let our connections team help you find the services you need.
              </p>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
