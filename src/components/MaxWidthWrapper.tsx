import { ReactNode } from "react";

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-10">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
