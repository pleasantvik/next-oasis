"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);

    if (filter) {
      params.set("capacity", filter);
    } else {
      params.delete("capacity");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter={"small"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        1&mdash;3 guest
      </Button>
      <Button
        filter={"medium"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        4&mdash;7 guest
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        8&mdash;12 guest
      </Button>
    </div>
  );
};

const Button = ({ filter, handleFilter, activeFilter, children }) => {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Filter;
