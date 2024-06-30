import { useState } from "react";
import axios from "axios";
import { Review } from "../util/interfaces";

export function useAddReview(token: string | null) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  async function addReview (data: Review){
    const { name, comment, rating } = data;
    console.log("data: ", name, comment, rating);
    

    try {
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
        console.log(response);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setIsSubmitting(false);
      console.log(errorMessage);
      
    }
  }

  return { addReview , isSubmitting };
}