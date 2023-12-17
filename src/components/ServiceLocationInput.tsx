import { serviceLocationsType } from "@/types/business";
import { Check, X } from "lucide-react";
import { SetStateAction, useState } from "react";
import DynamicInput from "./DynamicInput";
import LocationDropdown from "./LocationDropdown";
import CustomInput from "./ui/CustomInput";
import { useFeatureContext } from "@/context/feature/FeatureContext";

interface LocationProps {
  data: serviceLocationsType;
  setData: React.Dispatch<SetStateAction<serviceLocationsType>>;
}

const ServiceLocationInput = ({ data, setData }: LocationProps) => {
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [curr, setCurr] = useState<string>("");
  const { displayAlert } = useFeatureContext();

  const addToList = () => {
    if (!suburbs.length || curr.length < 2) {
      return displayAlert("State or suburbs missing!", false);
    }
    setData([
      ...data,
      {
        state: curr,
        suburbs: suburbs,
      },
    ]);
    setCurr("");
    setSuburbs([]);
  };

  const removeItem = (i: number) => {
    const updatedData = data.filter((_, index) => index !== i);
    setData(updatedData);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col mt-2 col-span-2 gap-2">
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <CustomInput
            id="state"
            type="text"
            value={curr}
            onChange={(e) => setCurr(e.target.value)}
            className="w-[200px]"
          />
        </div>
        <DynamicInput name="Suburbs" data={suburbs} setData={setSuburbs} />
        <button
          className=" w-fit bg-green-600 text-white px-5 py-2 rounded-md mb-4 flex mt-2"
          onClick={addToList}
        >
          Confirm Location Details
          <Check />
        </button>
      </div>
      <h2 className=" text-xl font-bold my-2">
        Inserted Service Location Records
      </h2>
      <div className="flex flex-wrap gap-4">
        {data.length
          ? data.map((loc, i) => {
              return (
                <div className="relative" key={loc.state + i}>
                  <LocationDropdown state={loc.state} suburbs={loc.suburbs} />
                  <X
                    size={16}
                    className=" absolute top-[2px] right-[2px] text-red-400 cursor-pointer"
                    onClick={() => removeItem(i)}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ServiceLocationInput;
