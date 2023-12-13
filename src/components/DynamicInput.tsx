"use client";

import { X } from "lucide-react";
import { SetStateAction, useState } from "react";

interface InputProps {
  name: string;
  data: string[];
  setData: React.Dispatch<SetStateAction<string[]>>;
}

const DynamicInput = ({ name, data, setData }: InputProps) => {
  const [curr, setCurr] = useState("");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      addToList(e.target.value);
    }
  };

  const addToList = (input: string) => {
    setData(() => [...data, input]);
    setCurr("");
  };

  const removeItem = (i: number) => {
    const updatedData = data.filter((_, index) => index !== i);
    setData(updatedData);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 mb-2 text-gray-900"
      >
        {name}
      </label>
      <div className="mt-2 relative">
        <input
          type="text"
          name={name}
          value={curr}
          id={name}
          onChange={(e) => setCurr(e.target.value)}
          onKeyDown={handleKeyPress}
          className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className=" flex items-center justify-center h-full gap-3 absolute right-4 top-0">
          <button
            className=" bg-green-600 text-white px-3 rounded-md"
            onClick={() => addToList(curr)}
          >
            Add
          </button>
          <button
            className=" bg-red-600 text-white px-3 rounded-md"
            onClick={() => setData([])}
          >
            Clear
          </button>
        </div>
      </div>
      {data ? (
        <div className="flex gap-4 flex-wrap mt-4">
          {data.map((d, i) => {
            return (
              <div className="flex items-center gap-2" key={d}>
                <p className=" py-2 px-4 bg-btn-orange text-center rounded-md ">
                  {d}
                </p>
                <X
                  size={24}
                  className=" text-red-500 cursor-pointer"
                  onClick={() => removeItem(i)}
                />
              </div>
            );
          })}
        </div>
      ) : null}
      <input />
    </div>
  );
};

export default DynamicInput;
