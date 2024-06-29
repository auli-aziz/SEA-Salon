import { useEffect, useRef, useState } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Branch, Service } from "../../util/interfaces";
import { useAddReservation } from "../../hooks/useAddReservation";

export default function ReservationForm({ branches }: { branches: Branch[] }) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);
  const token = useRouteLoaderData('root') as string | null;
  const [branch, setBranch] = useState<string>(branches[0].name);
  const [services, setServices] = useState<Service[]>(branches[0].services);
  const [selectedService, setSelectedService] = useState<string>(branches[0].services[0].name);

  const { addReservation, isSubmitting, error } = useAddReservation(token, branches);

  useEffect(() => {
    const selectedBranch = branches.find(b => b.name === branch);
    if (selectedBranch) {
      setServices(selectedBranch.services);
      setSelectedService(selectedBranch.services[0].name);
    }
  }, [branch, branches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.current && phoneNumber.current && date) {
      const reservationData = {
        name: name.current.value,
        phoneNumber: phoneNumber.current.value,
        branch,
        typeOfService: selectedService,
        dateAndTime: date,
      };
      addReservation(reservationData);
    }
  };

  const inputStyling = "h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md";

  return (
    <Form
      onSubmit={handleSubmit}
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
          <input
            type="text"
            className={inputStyling}
            name="name"
            ref={name}
          />
        </div>
        <div className="font-montserrat font-medium text-sm flex-1">
          <label className="">Phone Number</label>
          <input
            type="tel"
            className={inputStyling}
            name="phoneNumber"
            ref={phoneNumber}
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
