"use client";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { useState } from "react";
import CustomButton from "./ui/CustomButton";

const RefineResults = () => {
  const [ndis, setNdis] = useState(false);
  const refineResults = () => {
    console.log(ndis);
  };
  return (
    <div className="flex flex-col">
      <CustomDropdown name="NDIS Registered">
        <label>
          <input
            className=" mr-3"
            onChange={(e) => setNdis((prev) => !prev)}
            type="checkbox"
            checked={ndis}
          />
          NDIS Registered Only
        </label>
      </CustomDropdown>
      <div className="flex gap-4 mt-6">
        <CustomButton className="text-sm" onClick={refineResults}>
          Apply
        </CustomButton>
        <CustomButton className="text-sm bg-btn-orange">Clear</CustomButton>
      </div>
    </div>
  );
};

export default RefineResults;
