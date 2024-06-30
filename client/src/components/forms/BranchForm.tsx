import { useRef, useState } from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Select from "react-tailwindcss-select";
import BlackButton from "../BlackButton";
import { Dayjs } from "dayjs";
import { Form } from "react-router-dom";
import { Branch, Service } from "../../util/interfaces";
import { useAddBranch } from "../../hooks/useAddBranch";
import Input from "../Input";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

export default function BranchForm({ services }: { services: Service[] }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [selectedServices, setSelectedServices] = useState<{ label: string; value: string }[] | SelectValue>([]);
  const [openingTime, setOpeningTime] = useState<Dayjs | null>(null);
  const [closingTime, setClosingTime] = useState<Dayjs | null>(null);

  const { addBranch, isSubmitting, error } = useAddBranch();

  const handleAddBranch = async (e) => {
    e.preventDefault();

    if (!nameRef.current || !locationRef.current) return;

    const branchData = {
      _id: "",
      name: nameRef.current.value,
      location: locationRef.current.value,
      openingTime,
      closingTime,
      services: selectedServices,
    } as Branch;

    const result = await addBranch(branchData);

    if (result === "success") {
      e.target.reset();
      setSelectedServices([]);
      setOpeningTime(null);
      setClosingTime(null);
    }
  };

  const handleChange = (value: SelectValue) => {
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
      <Input
        labelName="Name"
        type="text"
        name="name"
        placeholder=""
        ref={nameRef}
      />
      <Input
        labelName="Location"
        type="text"
        name="location"
        placeholder=""
        ref={locationRef}
      />
      <div className="w-full mt-3 font-montserrat text-sm">
        <label className="w-full font-semibold" htmlFor="services">
          Services
        </label>
        <Select
          primaryColor="white"
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
