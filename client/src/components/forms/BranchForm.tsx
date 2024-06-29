import { useRef, useState } from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Select from "react-tailwindcss-select";
import BlackButton from "../BlackButton";
import { Dayjs } from "dayjs";
import { Form } from "react-router-dom";
import { Service } from "../../util/interfaces";
import { useAddBranch } from "../../hooks/useAddBranch";

export default function BranchForm({ services }: { services: Service[] }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [selectedServices, setSelectedServices] = useState<{ value: string; label: string }[]>([]);
  const [openingTime, setOpeningTime] = useState<Dayjs | null>(null);
  const [closingTime, setClosingTime] = useState<Dayjs | null>(null);

  const { addBranch, isSubmitting, error } = useAddBranch();

  const handleAddBranch = async (e) => {
    e.preventDefault();

    if (!nameRef.current || !locationRef.current) return;

    const branchData = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      openingTime,
      closingTime,
      services: selectedServices,
    };

    const result = await addBranch(branchData);

    if (result === "success") {
      e.target.reset();
      setSelectedServices([]);
      setOpeningTime(null);
      setClosingTime(null);
    }
  };

  const handleChange = (value) => {
    setSelectedServices(value);
  };

  return (
    <Form
      onSubmit={handleAddBranch}
      className="lg:max-w-[420px] w-full py-5 px-7 bg-gray-300 rounded-lg text-left"
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
          ref={nameRef}
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
          ref={locationRef}
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
