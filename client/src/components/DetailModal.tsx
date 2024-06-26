import { Dialog } from "@material-tailwind/react";
import { Reservation } from "../util/interfaces.tsx";
import { ReactElement } from "react";

export default function DetailModal({
  title,
  open,
  children,
  handleOpen,
}: {
  title: string;
  open: boolean;
  detail: Reservation | null;
  children: ReactElement;
  handleOpen: (detail: Reservation | null) => void;
  formatDate: (date: Date) => string;
}) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="text-center py-5 px-10 ">
        <h3 className="font-montserrat font-bold text-red-900 m-auto">
          {title}
        </h3>
        {children}
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
