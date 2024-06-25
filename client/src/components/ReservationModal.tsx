import { Dialog } from "@material-tailwind/react";
import { Reservation } from "./ReservationsCard.tsx";

export default function ReservationModal({
  open,
  detail,
  handleOpen,
  formatDate,
}: {
  open: boolean;
  detail: Reservation | null;
  handleOpen: (detail: Reservation | null) => void;
  formatDate: (date: Date) => string;
}) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="text-center py-5 px-10 ">
        <h3 className="font-montserrat font-bold text-red-900 m-auto">
          Reservation Detail
        </h3>
        <table className="w-full mt-5 text-left font-montserrat text-sm text-gray-800">
          <tr className="h-7">
            <td className="font-semibold w-52">Type of Service:</td>
            <td className="font-regular">{detail?.typeOfService}</td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Customer Name:</td>
            <td className="font-regular">{detail?.name}</td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Phone Number:</td>
            <td className="font-regular">{detail?.phoneNumber}</td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Date & Time:</td>
            <td className="font-regular">
              {detail && formatDate(detail?.dateAndTime)}
            </td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Booking Time:</td>
            <td className="font-regular">
              {detail && formatDate(detail?.updatedAt)}
            </td>
          </tr>
        </table>
        <button
          onClick={() => handleOpen(null)}
          className={`w-full flex justify-center font-economica mt-10 font-bold text-xl bg-red-900 text-white py-1 px-5 rounded-xl`}
        >
          Ok
        </button>
      </div>
    </Dialog>
  );
}
