import { useState } from "react";
import axios from "axios";
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
import { useRouteLoaderData } from "react-router-dom";

export default function ReviewModal({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [rated, setRated] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const token = useRouteLoaderData('root');
  
  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/customer/addreview", {
        name: name,
        comment: comment,
        rating: rated,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      setIsLoading(false);
      if (response.status === 201) {
        handleOpen();
      } else {
        console.log(response);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.response.data;
      }
      setIsLoading(false);
      console.log(errorMessage);
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
        <CardBody className="flex flex-col gap-4">
          <div className="w-full text-center">
            <h3 className="font-heading font-bold text-3xl text-red-900">
              Rate Us
            </h3>
          </div>
          <Input
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            color={"red"}
            size="lg"
          />
          <Textarea
            label="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            color={"red"}
          />
          <Rating
            value={rated}
            onChange={(value) => setRated(value)}
            className="m-auto"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <button
            onClick={handleAddReview}
            disabled={isLoading}
            className={`flex justify-center rounded-lg text-gray-200 font-bold w-full py-1 font-economica ${
              isLoading ? "bg-gray-800" : "bg-gray-900 hover:bg-black"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Spinner className="h-4 w-4" />
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
