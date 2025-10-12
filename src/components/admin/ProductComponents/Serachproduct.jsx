import { Search } from "lucide-react";
import React from "react";

export const Serachproduct = ({text,settext,searchProduct}) => {
  return (
    <>
      <div className="p-4 border-b w-5/6 border-gray-200">
        <div className="flex items-center gap-4">
          <form
            className="relative flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              searchProduct();
            }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      </div>
    </>
  );
};
