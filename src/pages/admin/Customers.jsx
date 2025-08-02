import React ,{useEffect,useState}from 'react';
import { Search, Eye, Edit } from 'lucide-react';
import Loader from "../../components/Common/Loader"
import { AdminUserThunk } from '../../store/AdminThunk/AdminUserThunk';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/Common/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/Common/EmptyState';
const Customers = () => {
const [user, setuser] = useState('')
const dispatch  = useDispatch();
const nav = useNavigate();
const {customers,error,loading} = useSelector((state) => state.adminUserState);
const fetchCustomers = async () => {
  await dispatch(AdminUserThunk(user));
};
  useEffect(() => {
    fetchCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 
    const veiwCustomer = async (customer) => {
    try {
      nav(`/admin/veiwCustomer/${customer._id}`,{state: { customer }});
    } catch (err) {
      console.log(err.message);
    }
  }
    if(loading) return <Loader />;
    if(error) return <ErrorMessage message = {error} />;
  return  (
   <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        {/*search custome -- future */}
        <div className="relative">
          <Search onClick={fetchCustomers} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
          <input
            type="text"
            value={user}
            onChange={(e)=>setuser(e.target.value)}
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> 
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length > 1 ? (customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.email}</td>
{/*                  <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.spent}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye onClick={()=>veiwCustomer(customer)} className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))):(<EmptyState message={"no users found"}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
};

export default Customers;