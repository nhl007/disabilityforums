import FeaturedBusiness from "@/components/FeaturedBusiness";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = () => {
  const topStates = ["WA", "QLD", "VIC", "NSW", "SA", "NT", "ACT"];
  return (
    <div>
      <MaxWidthWrapper>
        {topStates.map((state) => {
          return <FeaturedBusiness key={state} AddressState={state} />;
        })}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
