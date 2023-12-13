import { serviceLocationsType } from "@/types/business";
import { Check, X } from "lucide-react";
import { SetStateAction, useState } from "react";
import DynamicInput from "./DynamicInput";
import LocationDropdown from "./LocationDropdown";

interface LocationProps {
  data: serviceLocationsType;
  setData: React.Dispatch<SetStateAction<serviceLocationsType>>;
}

const ServiceLocationInput = ({ data, setData }: LocationProps) => {
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [curr, setCurr] = useState<string>("");

  const addToList = () => {
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
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <input
            type="text"
            value={curr}
            onChange={(e) => setCurr(e.target.value)}
            className="block w-[50%] pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <DynamicInput name="Suburbs" data={suburbs} setData={setSuburbs} />
        <button
          className=" w-fit bg-green-600 text-white px-5 py-2 rounded-md mb-4 flex"
          onClick={addToList}
        >
          Add Location Details
          <Check />
        </button>
      </div>
      <div className="flex gap-4">
        {data.length
          ? data.map((loc, i) => {
              return (
                <div className="relative" key={loc.state}>
                  <LocationDropdown state={loc.state} suburbs={loc.suburbs} />
                  <X
                    className=" absolute top-[-4px] right-[-4px] text-red-400 cursor-pointer"
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
