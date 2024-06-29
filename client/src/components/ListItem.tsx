import { ReactElement, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDeleteData } from "../hooks/useDeleteData";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { Dialog } from "@material-tailwind/react";

export default function ListItem({
  children,
  isAdmin,
  id,
  deleteFn,
}: {
  children: ReactElement;
  isAdmin: boolean;
  id: string;
  deleteFn: (
    token: string | null,
    id: string
  ) => Promise<AxiosResponse<any, any>>;
}) {
  const [open, setOpen] = useState(false);
  const { deleteData, error } = useDeleteData(id, deleteFn);
  const handleOpen = () => setOpen((curr) => !curr);

  const handleDelete = async () => {
    const response = await deleteData();
    if (response.status === 200) {
      handleOpen();
      toast.success("Data deleted succesfully");
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <div
        key={id}
        className="w-full h-fit px-5 py-1 my-1 bg-gray-100 relative"
      >
        {children}
        {isAdmin && (
          <RxCrossCircled
            className="absolute top-4 right-3 text-red-200 hover:text-red-500 hover:cursor-pointer"
            style={{ fontSize: "14px" }}
            onClick={handleOpen}
          />
        )}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex flex-col items-center p-10">
          <p className="font-montserrat font-semibold text-red-900 mb-10">
            Are your sure you want to delete this?
          </p>
          <button
            className="bg-red-900 rounded-lg px-5 py-1 text-white font-montserrat font-semibold"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </Dialog>
    </>
  );
}
