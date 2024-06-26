import Border from "../components/Border";
import { Reservation } from "../util/interfaces";

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(date));
};

export default function ReservationsHistory({
  reservations,
  handleOpen
}: {
  reservations: Reservation[];
  handleOpen: (detail: Reservation | null) => void;
}) {

  return (
    <Border>
      {Object.values(reservations).map((r) => (
        <div
          key={r._id}
          className="w-full h-fit px-5 py-1 my-1 bg-gray-100 hover:cursor-pointer"
          onClick={() => handleOpen(r)}
        >
          <p className="font-bold">{r.typeOfService}</p>
          <p>{formatDate(r.dateAndTime)}</p>
        </div>
      ))}
    </Border>
  );
}
