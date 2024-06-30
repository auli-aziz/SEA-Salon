import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useActionData, useNavigation } from "react-router-dom";
import { Form } from "react-router-dom";
import BlackButton from "../BlackButton";
import { data } from "../../util/interfaces";

export default function ServiceModal({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  const data = useActionData() as data;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (data && data.status === 201 && isSubmitted) {
      handleOpen();
      setIsSubmitted(false);
    }
  }, [data, isSubmitted, handleOpen]);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      {data && data.message && <p>{data.message}</p>}
      <Card className="mx-auto sm:w-96">
        <Form method="POST" onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-economica font-bold text-3xl text-red-900 text-center">
              Add a new service
            </h3>
            <div className="w-full font-montserrat">
              <label className="font-medium w-full" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
              />
            </div>
            <div className="w-full flex flex-col font-montserrat">
              <label className="font-medium w-full" htmlFor="duration">
                Duration
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  name="duration"
                  required
                  className="h-10 max-w-64 p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
                />
                <p className="m-auto font-semibold text-black text-sm md:text-md">Minutes</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <BlackButton isSubmitting={isSubmitting} />
          </CardFooter>
        </Form>
      </Card>
    </Dialog>
  );
}
