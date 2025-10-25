export const DateUtils = {
  format: (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),

  getAge: (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
      age--;
    return age;
  },
};

 export const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.message = "Name is required";
    if (!formData.phoneNo?.trim()) newErrors.message= "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNo.replace(/\D/g, "")))
      newErrors.message = "Please enter a valid 10-digit phone number";
    if (!formData.address?.trim()) newErrors.message = "Address is required";
    if (!formData.DOB) newErrors.message = "Date of birth is required";
    if (!formData.image) newErrors.message = "Image URL is required";
    return newErrors;
  };

  export const validatePassword = (passwords) => {
      const newErrors = {};
      if (!passwords.oldPassword) newErrors.message = "Current password is required";
      if (!passwords.newPassword) newErrors.message = "New password is required";
      else if (passwords.newPassword.length < 6)
        newErrors.message = "Password must be at least 6 characters";
      if (passwords.newPassword !== passwords.confirmPassword)
        newErrors.message = "Passwords do not match";
      return newErrors;
    };

