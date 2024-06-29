import { useState } from "react";
import axios from "axios";
import { Review } from "../util/interfaces";

export function useAddReview(token: string | null) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  async function addReview (data: Review){
    const { name, comment, rating } = data;
    console.log("data: ", name, comment, rating);
    

    try {
      setError(null);
      setIsSubmitting(true);
      const response = await axios.post("/customer/addreview", {
        name,
        comment,
        rating,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      setIsSubmitting(false);
      if (response.status === 201) {
        return "success";
      } else {
        setError(response.data.message);
        console.log(response);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.response.data;
      }
      setIsSubmitting(false);
      setError(errorMessage);
    }
  }

  return { addReview , isSubmitting, error };
}