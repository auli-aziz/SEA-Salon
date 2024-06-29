import { useRef, useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Textarea,
  Input,
  Rating,
  Spinner,
} from "@material-tailwind/react";
import { Form, useRouteLoaderData } from "react-router-dom";
import { useAddReview } from "../../hooks/useAddReview";
import BlackButton from "../BlackButton";

export default function ReviewModal({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);
  const [rated, setRated] = useState(0);
  const token = useRouteLoaderData("root") as string | null;

  const { addReview, isSubmitting, error } = useAddReview(token);

  const handleAddReview = async (e) => {
    e.preventDefault;

    const reviewData = {
      _id: null,
      name: nameRef.current.value,
      comment: commentRef.current.value,
      rating: rated
    }

    const result = await addReview(reviewData);
    if(result === "success") {
      handleOpen();
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
            <input ref={nameRef} color={"red"} size="lg" />
            <textarea ref={commentRef} color={"red"} />
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
