import ReservationForm from "../components/forms/ReservationForm";


export default function Reservation() {
  return (
    <div className="flex items-center p-16 flex-col">
      <h2 className="m-auto mb-10 font-economica font-bold text-3xl">
        Make a Reservation
      </h2>
      <div className="h-fit w-full relative">
        <ReservationForm />
      </div>
    </div>
  );
}
