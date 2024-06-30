import { useRef, useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Rating,
} from "@material-tailwind/react";
import { Form, useRouteLoaderData } from "react-router-dom";
import { useAddReview } from "../../hooks/useAddReview";
import BlackButton from "../BlackButton";
import Input from "../Input";
import { toast } from "react-toastify";

export default function ReviewModal({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [rated, setRated] = useState(0);
  const token = useRouteLoaderData("root") as string | null;

  const { addReview, isSubmitting } = useAddReview(token);

  const handleAddReview = async (e) => {
    e.preventDefault;

    const reviewData = {
      _id: null,
      name: nameRef.current.value,
      comment: commentRef.current.value,
      rating: rated,
    };

    const result = await addReview(reviewData);
    if (result === "success") {
      handleOpen();
      toast.success("Thank you for your feedback!");
    }
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto sm:w-96">
        <Form onSubmit={handleAddReview}>
          <CardBody className="flex flex-col gap-4">
            <div className="w-full text-center">
              <h3 className="font-heading font-bold text-3xl text-red-900">
                Rate Us
              </h3>
            </div>
            <Input
              labelName="Name"
              type="text"
              name="name"
              placeholder=""
              ref={nameRef}
            />
            <div className="w-full mt-3 font-montserrat text-sm">
              <label className="font-semibold" htmlFor="name">
                Comment
              </label>
              <textarea
                required
                name="comment"
                ref={commentRef}
                className="w-full h-32 p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
              />
            </div>
            <Rating
              value={rated}
              onChange={(value) => setRated(value)}
              className="m-auto"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <BlackButton isSubmitting={isSubmitting} />
          </CardFooter>
        </Form>
      </Card>
    </Dialog>
  );
}
