import ReservationForm from "../components/forms/ReservationForm";

export default function Reservation() {
  return (
    <div className="flex items-center py-16 px-5 md:px-32 flex-col">
      <div className="h-fit w-full relative">
        <ReservationForm />
      </div>
    </div>
  );
}
