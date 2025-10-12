import { Filter } from "lucide-react";
import React from "react";

export const FIlterProduct = ({
  availabilityStatus,
  setavailabilityStatus,
  searchProduct,
}) => {
  return (
    <div className="flex items-center  w-1/6 m-2.5 gap-2">
      {/* Icon */}

      <Filter className="w- 8 h-6 text-gray-600  hover:text-blue-800" />

      {/* Dropdown */}
      <select
        value={availabilityStatus}
        onChange={(e) => {
          const value = e.target.value;
          setavailabilityStatus(value);
          searchProduct();
        }}
        className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Discontinued">Discontinued</option>
      </select>
    </div>
  );
};
