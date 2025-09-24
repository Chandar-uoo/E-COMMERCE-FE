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
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNo?.trim()) newErrors.phoneNo = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNo.replace(/\D/g, "")))
      newErrors.phoneNo = "Please enter a valid 10-digit phone number";
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.DOB) newErrors.DOB = "Date of birth is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    return newErrors;
  };

  export const validatePassword = (passwords) => {
      const newErrors = {};
      if (!passwords.oldPassword) newErrors.oldPassword = "Current password is required";
      if (!passwords.newPassword) newErrors.newPassword = "New password is required";
      else if (passwords.newPassword.length < 6)
        newErrors.newPassword = "Password must be at least 6 characters";
      if (passwords.newPassword !== passwords.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      return newErrors;
    };

