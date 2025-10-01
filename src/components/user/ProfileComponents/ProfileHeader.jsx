import { DateUtils } from "../../../utils/helpers";
import userImage from "../../../assets/default-img.jpg";
import { Calendar, Edit2, X, Camera, MailQuestion } from "lucide-react";

export const ProfileHeader = ({
  user,
  setEditProfile,
  editPasswords,
  editProfile,
}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
            <div className="relative">
              <img
                src={user?.image?.trim() ? user.image : userImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {user?.name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start mt-2 text-sm gap-1.5 text-gray-500">
                <Calendar />
                Age {DateUtils.format(user?.DOB)}
                <MailQuestion />{" "}
                <p
                  className={`${
                    user?.isVerified ? "text-green-400" : "text-red-600"
                  }`}
                >
                  {user?.isVerified ? "Verified" : "Verfication Pending"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={() => setEditProfile(!editProfile)}
              disabled={editPasswords}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              {editProfile ? (
                <X className="w-4 h-4 mr-2" />
              ) : (
                <Edit2 className="w-4 h-4 mr-2" />
              )}
              {editProfile ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
