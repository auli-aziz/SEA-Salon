import { useEffect, useRef, useState } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { BranchModel } from "../../util/interfaces";
import { useAddReservation } from "../../hooks/useAddReservation";
import Input from "../Input";
import TransparentButton from "../TransparentButton";

export default function ReservationForm({
  branches,
}: {
  branches: BranchModel[];
}) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);
  const token = useRouteLoaderData("root") as string | null;
  const [branch, setBranch] = useState<string>(branches[0]?.name || "");
  const [services, setServices] = useState<{ _id: string; name: string }[]>(
    branches[0]?.services || []
  );
  const [selectedService, setSelectedService] = useState<string>(
    branches[0]?.services[0]?.name || ""
  );

  const { addReservation, isSubmitting, error } = useAddReservation(
    token,
    branches
  );

  useEffect(() => {
    const selectedBranch = branches.find((b) => b.name === branch);
    if (selectedBranch) {
      setServices(selectedBranch.services);
      setSelectedService(selectedBranch.services[0]?.name || "");
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
      <div className="flex md:flex-row flex-col w-full h-fit gap-0 md:gap-3">
        <Input
          labelName="Name"
          type="text"
          name="name"
          placeholder=""
          ref={name}
        />
        <Input
          labelName="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder=""
          ref={phoneNumber}
        />
      </div>
      <div className="mt-3 font-montserrat text-sm">
        <label className="font-semibold">Branch</label>
        <select
          className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          {branches.length > 0 ? (
            branches.map((b) => (
              <option value={b.name} key={b._id}>
                {b.name}
              </option>
            ))
          ) : (
            <option className="flex h-full w-full">
              <p className="m-auto">No branches available</p>
            </option>
          )}
        </select>
      </div>
      <div className="mt-3 font-montserrat text-sm">
        <label className="font-semibold">Service</label>
        <select
          className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {services.length > 0 ? (
            services.map((s) => (
              <option value={s.name} key={s._id}>
                {s.name}
              </option>
            ))
          ) : (
            <option className="flex h-full w-full">
              <p className="m-auto">No services available</p>
            </option>
          )}
        </select>
      </div>
      <div className="font-montserrat text-sm mt-3">
        <label className="font-semibold">Date & Time</label>
        <MobileDateTimePicker
          className="w-full"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </div>
      <TransparentButton isSubmitting={isSubmitting} />
    </Form>
  );
}
