import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringifyResponse = (data: any) => {
  return JSON.stringify(data);
};

export const generateSelectDefault = (data: string[]) => {
  if (data && data[0]) {
    const r = data.map((v) => {
      return { value: v, label: v };
    });
    return r;
  } else {
    return [];
  }
};
