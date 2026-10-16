import apiRequest from "./api";

export const getApplications = async () => {
  return apiRequest("/applications");
};

export const getApplicationById = async (id) => {
  return apiRequest(`/applications/${id}`);
};

export const createApplication = async (applicationData) => {
  return apiRequest("/applications", {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
};

export const deleteApplication = async (id) => {
  return apiRequest(`/applications/${id}`, {
    method: "DELETE",
  });
};
