import React from "react";
import { useNavigate } from "react-router-dom";

export const NotificationsDropDown = ({ totalPendingOrders }) => {
  const nav = useNavigate();
  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn bg-black text-green-300 btn-ghost btn-circle"
        >
          <div className="indicator">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.1V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1"
              />
            </svg>
            {totalPendingOrders > 0 && (
              <span className="badge badge-xs badge-primary indicator-item"></span>
            )}
          </div>
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-black rounded-box w-64 mt-4 z-[999]"
        >
          {totalPendingOrders > 0 ? (
            <>
              <li>
                <p className="text-sm font-semibold text-white">
                  {`You have ${totalPendingOrders} orders to ship.`}
                </p>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-outline btn-primary mt-2"
                  onClick={() => {
                    nav("/admin/orders");
                    document.activeElement.blur(); // close dropdown on nav
                  }}
                >
                  View Orders
                </button>
              </li>
            </>
          ) : (
            <li>
              <p className="text-sm text-gray-500">No pending orders</p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
