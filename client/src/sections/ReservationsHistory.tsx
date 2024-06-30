import Border from "../components/Border";
import { formatDate } from "../util/format";
import { Reservation } from "../util/interfaces";

export default function ReservationsHistory({
  reservations,
  handleOpen
}: {
  reservations: Reservation[];
  handleOpen: (detail: Reservation | null) => void;
}) {

  return (
    <Border>
      {reservations.length > 0 ? (Object.values(reservations).map((r) => (
        <div
          key={r._id}
          className="w-full h-fit px-5 py-1 my-1 bg-gray-100 hover:cursor-pointer"
          onClick={() => handleOpen(r)}
        >
          <p className="font-bold">{r.typeOfService}</p>
          <p>{formatDate(r.dateAndTime)}</p>
        </div>
      ))) : (<div className="flex h-full w-full"><p className="m-auto">No reservations found.</p></div>)}
    </Border>
  );
}
