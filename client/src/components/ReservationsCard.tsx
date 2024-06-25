import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationModal from "./ReservationModal";
import Border from "./Border";

export interface Reservation {
  _id: "667a4e53efb43a13be759b34";
  customerId: string;
  name: string;
  phoneNumber: string;
  typeOfService: string;
  dateAndTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function ReservationsCard({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const [detail, setDetail] = useState<Reservation | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = (detail: Reservation | null) => {
    setOpen((curr) => !curr)
    setDetail(detail);
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(date));
  };

  return (
    <div className="h-[550px] w-full m-auto md:m-0 md:w-[600px] p-5 rounded-lg border border-black shadow-xl">
      <h4 className="font-montserrat font-semibold">Reservation History</h4>
      <Border>
        {Object.values(reservations).map((r) => (
          <div className="w-full h-fit px-5 py-1 my-1 bg-gray-100" onClick={() => handleOpen(r)}>
            <p className="font-bold">{r.typeOfService}</p>
            <p>{formatDate(r.dateAndTime)}</p>
          </div>
        ))}
      </Border>
      <button
        className={`w-full flex justify-center font-economica mt-5 font-bold text-xl border-2 border-red-800 bg-white text-red-800 py-1 px-5 rounded-xl hover:bg-red-800 hover:text-gray-200`}
        onClick={() => navigate("/reservation")}
      >
        Make a new Reservation
      </button>
      <ReservationModal open={open} handleOpen={() => handleOpen(null)} detail={detail} formatDate={formatDate} />
    </div>
  );
}
