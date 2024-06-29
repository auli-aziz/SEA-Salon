import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { ReservationData, Branch } from "../util/interfaces"; 


export function useAddReservation(token: string | null, branches: Branch[]) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addReservation = async (data: ReservationData) => {
    setError(null);

    const { name, phoneNumber, dateAndTime: date, branch: branchName, typeOfService } = data;

    if (!name || !phoneNumber || !date) {
      setError("All fields must be filled");
      return;
    }

    if (date.isBefore(dayjs())) {
      setError("Reservation must be in the future.");
      return;
    }

    const selectedBranch = branches.find(b => b.name === branchName);
    if (!selectedBranch) {
      setError("Selected branch is invalid");
      return;
    }

    const selectedHour = date.hour();
    const openingHour = dayjs(selectedBranch.openingTime).hour();
    const closingHour = dayjs(selectedBranch.closingTime).hour();

    if (selectedHour < openingHour || selectedHour >= closingHour) {
      setError(`Please select a time between ${openingHour}:00 and ${closingHour}:00`);
      return;
    }

    try {
      setIsSubmitting(true);
      const reservationData = {
        name,
        phoneNumber,
        branch: branchName,
        typeOfService,
        dateAndTime: date,
      };

      const response = await axios.post("/customer/addreservation", reservationData, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + token
        }
      });

      setIsSubmitting(false);
      if (response.status === 201) {
        navigate("/dashboard");
        toast.success("Reservation Added Successfully");
      } else {
        console.log(response);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.response?.data;
      }
      if (errorMessage === "read ECONNRESET") {
        errorMessage = "Please check your internet connection";
      } else if (errorMessage === "Access denied") {
        errorMessage = "Only customers can make reservations";
      }
      setIsSubmitting(false);
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

  return { addReservation, isSubmitting, error };
}
