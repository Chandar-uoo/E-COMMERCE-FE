import { toast } from "react-toastify";
import { usePasswordUpdateMutation } from "../../services/user/userApi";
import { validatePassword } from "../../utils/helpers";
import { useState } from "react";

function usePasswordFormHooks() {
      const [editPassword, { isLoading: isEditPasswordLoading }] = usePasswordUpdateMutation()
    
      const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

  
   const submitPasswordUpdate = async () => {
      const passwordErrors = validatePassword(passwords);
      if (Object.keys(passwordErrors).length > 0) {
       /*  setErrors(passwordErrors); */
        return { success: false, error: passwordErrors };
      }
  
      try {
        await editPassword(passwords).unwrap();
        toast.success("Password changed successfully!");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
       
         return { success: true };
      } catch (error) {
       console.log(error);
       
        return { success: false, error: error.message };
      }
    };
    return{
        submitPasswordUpdate,
        isEditPasswordLoading,
        passwords,
        setPasswords
    }
}
export default usePasswordFormHooks;