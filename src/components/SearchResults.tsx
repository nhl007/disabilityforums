import BusinessCard from "./BusinessCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { BusinessMock } from "@/constants/constants";

const SearchResults = () => {
  return (
    <div className="pt-10">
      <MaxWidthWrapper>
        <div className="grid grid-flow-col">
          <div className="col-span-1 min-w-[300px]">
            <h1 className="text-xl font-semibold">Refine Results</h1>
          </div>
          <div className="col-span-3">
            <p className=" mb-4">Total 290 results</p>
            <div className="flex flex-col space-y-4">
              {BusinessMock.map((data) => (
                <BusinessCard
                  key={data.name}
                  name={data.name}
                  description={data.description}
                  services={data.services}
                  verification={data.verification}
                />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SearchResults;
