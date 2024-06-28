import { useEffect, useState } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { Input, Spinner } from "@material-tailwind/react";
import dayjs, { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useNavigate } from "react-router-dom";
import { Branch, Service } from "../../util/interfaces";
import { toast } from "react-toastify";


export default function ReservationForm({ branches }: { branches: Branch[] }) {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = useRouteLoaderData('root') as string | null;
  const [branch, setBranch] = useState<string>(branches[0].name);
  const [services, setServices] = useState<Service[]>(branches[0].services);
  const [selectedService, setSelectedService] = useState<string>(branches[0].services[0].name);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedBranch = branches.find(b => b.name === branch);
    if (selectedBranch) {
      setServices(selectedBranch.services);
      setSelectedService(selectedBranch.services[0].name);
    }

  }, [branch, branches]);

  const addReservation = async (e) => {
    e.preventDefault();
    setError(null);

    if (!date) {
      setError("All fields must be filled");
      return;
    } else if (date.isBefore(dayjs())) {
      setError("Reservation must be in the future.");
      return;
    }

    const selectedBranch = branches.find(b => b.name === branch);
    if (!selectedBranch) {
      setError("Selected branch is invalid");
      return;
    }

    const selectedHour = date!.hour();
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
        branch: selectedBranch.name,
        typeOfService: selectedService,
        dateAndTime: date,
      }
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
        errorMessage = error.response.data;
      }
      if(errorMessage === "read ECONNRESET") {
        errorMessage = "Please check your internet connection";
      } else if(errorMessage === "Access denied") {
        errorMessage = "Only customers can make reservations";
      }
      setIsSubmitting(false);
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <Form
      onSubmit={addReservation}
      className="border-2 py-7 md:px-12 px-5 border-red-900 w-full flex flex-col rounded-lg shadow-xl"
    >
      <h2 className="m-auto mb-10 font-economica font-bold text-3xl">
        Make a Reservation
      </h2>
      {error && (
        <div className="mb-3 p-5 rounded-xl bg-red-100 font-medium text-red-400">
          {error}
        </div>
      )}
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
        <label className="">Branch</label>
        <select
          className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          {branches.map((b) => (
            <option value={b.name} key={b._id}>{b.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3 font-montserrat font-medium text-sm">
        <label className="">Service</label>
        <select
          className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {services.map((s) => (
            <option value={s.name} key={s._id}>{s.name}</option>
          ))}
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
        disabled={isSubmitting}
        className={`flex justify-center font-economica mt-10 font-bold text-xl border-2 border-red-800 text-red-800 py-1 px-5 rounded-xl ${
          isSubmitting ? "" : " hover:bg-red-800 hover:text-gray-200"
        }`}
        type="submit"
      >
        {isSubmitting ? (
          <div className="margin-auto flex items-center gap-3">
            <Spinner className="h-4 w-4" />
            Submitting...
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </Form>
  );
}
