import axios from "axios";
import { redirect } from "react-router-dom";
import { getAuthToken } from "./auth";

export async function loadServices() {
  try {
    const response = await axios.get("/administrator/services");
    
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
  
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}

export async function loadBranches() {
  try {
    const response = await axios.get("/administrator/branches");
    
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
  
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}

export async function loadProfile() {
  const token = getAuthToken();
  
  try {
    const response = await axios.get("/authentication/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    

    if (response.status !== 200) {
      throw new Error(response.data.message || "Unknown error occurred");
    }    
    
    if(response.data.role === "admin") {
      redirect("/admin")
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
  
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}