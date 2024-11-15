import Link from "next/link";
import React, { FC } from "react";

const Carpenters: FC = () => {
  return (
    <div className="mt-[9vh] ">
      <div className="w-[100vw] h-[91vh] text-3xl font-bold mx-auto flex">
        <Link href={"carpenters/drawings"} className="border-r-2 h-full w-1/2 p-10 flex items-center justify-center text-center">
          <p > Чертежи мебели</p>
        </Link>
        <Link href={"carpenters/list-carpenters"} className=" h-full w-1/2 p-10 flex items-center justify-center text-center">
          <p >Производители</p>
        </Link>
      </div>{" "}
    </div>
  );
};

export default Carpenters;
