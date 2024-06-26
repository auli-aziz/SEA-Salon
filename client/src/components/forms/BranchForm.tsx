import { useState } from "react";
import axios from "axios";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Select from "react-tailwindcss-select";
import BlackButton from "../BlackButton";
import { Dayjs } from "dayjs";
import { Form } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { Service } from "../../util/interfaces";

export default function BranchForm({ services }: { services: Service[] }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<{ value: string; label: string }[]>([]);
  const [location, setLocation] = useState<string>("");
  const [openingTime, setOpeningTime] = useState<Dayjs | null>(null);
  const [closingTime, setClosingTime] = useState<Dayjs | null>(null);
  const token = getAuthToken() as string | null;

  const addBranch = async (e) => {
    e.preventDefault();
    setError(null);

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
      
      const selectedServiceIds = selectedServices.map(service => service.value);

      const response = await axios.post(
        "/administrator/addbranch",
        {
          name: name,
          location: location,
          openingTime: openingTime,
          closingTime: closingTime,
          services: selectedServiceIds,  // Include selected services
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
        setName("");
        setLocation("");
        setOpeningTime(null);
        setClosingTime(null);
        setSelectedServices([]); // Clear selected services
      } else {
        console.log(response);
      }
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

  const handleChange = (value) => {
    setSelectedServices(value);
  };

  return (
    <Form
      onSubmit={addBranch}
      className="lg:max-w-[420px] w-full py-5 px-10 bg-gray-300 rounded-lg text-left"
    >
      <p className="font-economica text-xl font-bold">Add New Branch</p>
      {error && (
        <div className="mt-3 p-5 rounded-xl bg-red-100 font-medium text-red-400">
          {error}
        </div>
      )}
      <div className="w-full mt-3 font-montserrat text-sm">
        <label className="w-full font-semibold" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
        />
      </div>
      <div className="w-full mt-3 font-montserrat text-sm">
        <label className="w-full font-semibold" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
        />
      </div>
      <div className="w-full mt-3 font-montserrat text-sm">
        <label className="w-full font-semibold" htmlFor="services">
          Services
        </label>
        <Select
          options={services.map(service => ({ value: service._id, label: service.name }))}
          value={selectedServices}
          onChange={handleChange}
          isMultiple={true}
        />
      </div>
      <div className="w-full mt-3 font-montserrat text-sm">
        <label className="w-full font-semibold" htmlFor="openingTime">
          Opening Time
        </label>
        <MobileTimePicker
          className="w-full bg-white rounded-md"
          value={openingTime}
          onChange={(newTime) => setOpeningTime(newTime)}
        />
      </div>
      <div className="w-full mt-3 font-montserrat text-sm mb-7">
        <label className="w-full font-semibold" htmlFor="closingTime">
          Closing Time
        </label>
        <MobileTimePicker
          className="w-full bg-white rounded-md"
          value={closingTime}
          onChange={(newTime) => setClosingTime(newTime)}
        />
      </div>
      <BlackButton isSubmitting={isSubmitting} />
    </Form>
  );
}
