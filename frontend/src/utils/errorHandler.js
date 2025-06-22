// Api format kontolü
export const formatApiError = (error) => {
  const data = error.response?.data;

  if (data?.detail) {
    return data.detail;
  }

  if (typeof data === "object" && data !== null) {
    const allMessages = [];
    
    Object.entries(data).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          allMessages.push(`${field}: ${msg}`);
        });
      } else {
        allMessages.push(`${field}: ${messages}`);
      }
    });

    return allMessages.join("\n");
  }

  return "Bilinmeyen bir hata oluştu.";
};

// Register format kontolü
export const formatRegisterError = (error) => {
  const data = error?.response?.data;
  
  // Email specific error
  if (data?.email?.[0]) {
    return data.email[0];
  }
  
  // Password specific error
  if (data?.password?.[0]) {
    return data.password[0];
  }
  
  // General validation errors
  if (data?.non_field_errors?.[0]) {
    return data.non_field_errors[0];
  }
  
  // Use the general error formatter as fallback
  return formatApiError(error);
};