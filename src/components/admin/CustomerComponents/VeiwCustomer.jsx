import React from "react";
import { useLocation } from "react-router-dom";

const ViewCustomer = () => {
  const location = useLocation();
  const { customer } = location.state || {};
  
  if (!customer) return null;

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Customer Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              {/* Customer Info */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {customer.name}
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <a 
                      href={`mailto:${customer.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {customer.email}
                    </a>
                    {customer.role && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full capitalize">
                        {customer.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  {customer.DOB && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {calculateAge(customer.DOB)}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Years Old
                      </div>
                    </div>
                  )}
                  {customer.phoneNo && (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        📱
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </div>
                    </div>
                  )}
                  {customer.address && (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        🏠
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Address
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {customer.email && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Email:</span>
                      <a 
                        href={`mailto:${customer.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                      >
                        {customer.email}
                      </a>
                    </div>
                  )}
                  {customer.phoneNo && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Phone:</span>
                      <a 
                        href={`tel:${customer.phoneNo}`}
                        className="text-blue-600 hover:text-blue-800 font-mono transition-colors"
                      >
                        {customer.phoneNo}
                      </a>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Address:</span>
                      <span className="text-gray-900 text-right max-w-xs">
                        {customer.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  {customer.DOB && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Date of Birth:</span>
                      <div className="text-right">
                        <div className="text-gray-900 font-medium">
                          {new Date(customer.DOB).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {calculateAge(customer.DOB)} years old
                        </div>
                      </div>
                    </div>
                  )}
                  {customer.gender && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Gender:</span>
                      <span className="text-gray-900 capitalize font-medium">
                        {customer.gender}
                      </span>
                    </div>
                  )}
                  {customer._id && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Customer ID:</span>
                      <span className="text-gray-900 font-mono text-sm">
                        {customer._id}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                {customer.email && (
                  <a
                    href={`mailto:${customer.email}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📧 Send Email
                  </a>
                )}
                {customer.phoneNo && (
                  <a
                    href={`tel:${customer.phoneNo}`}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📞 Call
                  </a>
                )}
                <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                  ✏️ Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;