import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OnBoardingTabs from "@/components/OnBoardingTabs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper>
      <div className="border-b border-gray-900/10 pb-4 md:pb-6">
        <h1 className="text-lg font-semibold leading-7 text-gray-900">
          On Boarding
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please fill the following details to list your business in the
          directory.
        </p>
      </div>
      <OnBoardingTabs />
      {children}
    </MaxWidthWrapper>
  );
};

export default layout;
