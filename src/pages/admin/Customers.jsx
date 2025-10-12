import React, { useState } from "react";
import { Search, Eye, Edit, MoveRight, MoveLeft } from "lucide-react";
import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from "../../components/Common/EmptyState";
import usePagination from "../../hooks/usePagination";
import { useFetchCustomersQuery } from "../../services/admin/adminCustomerApi";

const Customers = () => {
  const [user, setuser] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";

  const { data, isLoading, isError, error } = useFetchCustomersQuery({
    fetchUser: user,
    page: Number(page),
  });
  const { data: customers, pagination } = data || {};
  const nav = useNavigate();

  const veiwCustomer = async (customer) => {
    try {
      nav(`/admin/veiwCustomer/${customer._id}`, { state: { customer } });
    } catch (err) {
      console.log(err.message);
    }
  };
  const searchUser = (text)=>{
    setuser(text)
    setsearchParams({fetchUser: text})
  }
  const { nextPage, prevPage } = usePagination();
  const next = () => {
    if (pagination.hasNextPage) {
      nextPage();
    }
  };

  const prev = () => {
    if (pagination.hasPrevPage) {
      prevPage();
    }
  };
  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error?.message} />;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        {/*search custome -- future */}
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
          <input
            type="text"
            value={user}
            onChange={(e) => searchUser(e.target.value)}
            required
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  veiw
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length > 1 ? (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.email}
                    </td>
                    {/*                  <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.spent}</td> */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye
                            onClick={() => veiwCustomer(customer)}
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    <EmptyState message="No orders found" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center-safe gap-4  px-4">
        {pagination.hasPrevPage && (
          <button
            onClick={prev}
            className="join-item  btn btn-outline bg-black w"
          >
            <MoveLeft />
            Prev
          </button>
        )}
        {pagination.hasNextPage && (
          <button
            onClick={next}
            className="join-item btn btn-outline bg-black "
          >
            Next
            <MoveRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Customers;
