import { useState } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { toast } from "react-toastify";
import { Branch } from "../util/interfaces";

export function useAddBranch() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = getAuthToken() as string | null;

  const addBranch = async (data: Branch) => {
    setError(null);

    const { name, location, openingTime, closingTime, services } = data;

    if (!openingTime || !closingTime) {
      setError("All fields must be filled");
      return;
    }

    if (openingTime > closingTime) {
      setError("Opening time must be before closing time");
      return;
    }

    try {
      setIsSubmitting(true);

      const selectedServiceIds = services.map(service => service.value);

      const response = await axios.post(
        "/administrator/addbranch",
        {
          name,
          location,
          openingTime,
          closingTime,
          services: selectedServiceIds,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      setIsSubmitting(false);
      if (response.status === 201) {
        toast.success("Branch added succesfully")
      } else {
        console.log(response);
      }
      return "success";
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setIsSubmitting(false);
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

  return { addBranch, isSubmitting, error };
}
