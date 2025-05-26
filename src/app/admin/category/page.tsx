"use client";
import SearchBar from "@/components/SearchBar";
import "./index.css";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
export default function Category() {

  const [load, setLoad] = useState(true)
  const [category, setCategory] = useState<Icategory[]>([])
  
  return (
    <main>
      <header className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-3 pt-[70px] lg:pt-0">
        <div className="w-[90%] lg:w-[45%]">
          <SearchBar onClick={() => {}} placeholder="Busque por categoria" />
        </div>
        <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[90%] lg:w-[100px]">
          <PlusCircle size={14} />
          Adicionar
        </button>
      </header>
    </main>
  );
}
