import FeaturedBusiness from "@/components/FeaturedBusiness";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = () => {
  const topStates = ["WA", "QLD", "VIC", "NSW", "SA", "NT", "ACT"];
  return (
    <div>
      <MaxWidthWrapper>
        <FeaturedBusiness AddressState="QLD" />
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
