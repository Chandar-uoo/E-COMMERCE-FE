import { toast } from "react-toastify";
import {
  useCheckUserQuery,
  useEditUserMutation,
} from "../../services/user/userApi";
import { validateForm } from "../../utils/helpers";
import { useState } from "react";

function useProfileFormHooks() {
  const { data: user, isLoading: isCheckuserLoading } = useCheckUserQuery();
  
  const [editUser, { isLoading: isEditUserLoading }] = useEditUserMutation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    DOB: user?.DOB?.slice(0, 10) || "",
    address: user?.address || "",
    phoneNo: user?.phoneNo || "",
    image: user?.image || "",
  });
  const submitProfileUpdate = async () => {
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      return { success: false, error: formErrors };
    }

    try {
      await editUser(formData).unwrap();
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      toast.warn(error.message);
      console.log(error.message);

      return { success: false, error: error.message };
    }
  };

  return {
    formData,
    submitProfileUpdate,
    setFormData,
    isEditUserLoading,
    isCheckuserLoading,
    user
  };
}

export default useProfileFormHooks;
