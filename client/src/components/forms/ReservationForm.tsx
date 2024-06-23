import { useState } from "react";
import axios from "axios";
import { Input, Spinner } from "@material-tailwind/react";
import { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useNavigate } from "react-router-dom";

export default function ReservationForm() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [service, setService] = useState<string>("Haircuts and styling");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addReservation = async (e) => {
    e.preventDefault();
    setError(null);
    if(!date) {
      setError("All fields must be filled");
      return;
    }
    const selectedHour = date!.hour();
    const selectedMinute = date!.minute();
    if (selectedHour < 9 || selectedHour > 21) {
      setError("Please select a time between 9:00 AM and 9:00 PM");
      return;
    } 
    if(selectedMinute !== 0) {
      setError("Please boook a session that starts at the beginning of the hour");      
      return;
    }
      try {
        setIsLoading(true);
        const response = await axios.post("/customer/addreservation", {
          name: name,
          phoneNumber: phoneNumber,
          typeOfService: service,
          dateAndTime: date,
        });
        setIsLoading(false);
        if (response.status === 201) {
          navigate('/');
        } else {
          console.log(response);
        }
      } catch (error) {
        let errorMessage;
        if (error instanceof Error) {
          errorMessage = error.response.data;
        }
        setIsLoading(false);
        setError(errorMessage);
        console.log(errorMessage);
      }
  };

  return (
    <form className="border-2 py-7 md:px-14 px-5 border-red-900 w-full flex flex-col rounded-lg shadow-xl">
      <div className="mb-3 flex md:flex-row flex-col w-full h-fit gap-3">
        <div className="font-montserrat font-medium text-sm flex-1">
          <label className="">Name</label>
          <Input
            type="text"
            className="h-10 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="font-montserrat font-medium text-sm flex-1">
          <label className="">Phone Number</label>
          <Input
            type="Number"
            className="h-10 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 font-montserrat font-medium text-sm">
        <label className="">Service</label>
        <select
          className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
          labelProps={{
            className: "hidden",
          }}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="Haircuts and styling">Haircuts and styling</option>
          <option value="Manicure and pedicure">Manicure and pedicure</option>
          <option value="Facial treatments">Facial treatments</option>
        </select>
      </div>
      <div className="font-montserrat font-medium text-sm">
        <label className="">Date & Time</label>
        <MobileDateTimePicker
          className="w-full"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </div>
      <button
        disabled={isLoading}
        className={`flex justify-center font-economica mt-10 font-bold text-xl border-2 border-red-800 text-red-800 py-1 px-5 rounded-lg ${
          isLoading ? "" : " hover:bg-red-800 hover:text-gray-200"
        }`}
        onClick={addReservation}
      >
        {isLoading ? (
          <div className="margin-auto flex items-center gap-3">
            <Spinner className="h-4 w-4" />
            Loading
          </div>
        ) : (
          "Submit"
        )}
      </button>
      {error && (
        <div className="mt-3 p-5 rounded-xl bg-red-100 font-medium text-red-400">
          {error}
        </div>
      )}
    </form>
  );
}
