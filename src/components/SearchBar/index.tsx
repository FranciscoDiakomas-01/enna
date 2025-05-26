"use client";
import { Search } from "lucide-react";
import iconSize from "@/constants/iconSize";

interface IProp {
  onClick: () => void;
  placeholder: string;
  values?: Icategory[];
}
export default function SearchBar(prop: IProp) {
  return (
    <form
      id="searchBar"
      className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]"
    >
      <input
        placeholder={prop.placeholder}
        name="search"
        id="search"
        type="text"
        className="w-[90%] h-full border-o outline-0"
      />
      <button
        className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
        onClick={() => {
          prop.onClick();
        }}
      >
        <Search size={iconSize.iconSize} />
      </button>
    </form>
  );
}

export function SelectchBar(prop: IProp) {
  return (
    <form
      id="searchBar"
      className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]"
    >
      <select
        name="search"
        id="search"
        className="w-[90%] h-full border-o outline-0"
      >
        <option>{prop.placeholder}</option>
        {Array.isArray(prop.values) &&
          prop.values.map((data, index) => (
            <option value={data.id} key={index}>
              {data.text}
            </option>
          ))}
      </select>
      <button
        className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
        onClick={() => {
          prop.onClick();
        }}
      >
        <Search size={iconSize.iconSize} />
      </button>
    </form>
  );
}
