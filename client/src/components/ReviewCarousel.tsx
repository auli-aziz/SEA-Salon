import { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@material-tailwind/react";
import { Review } from "../util/interfaces";

export default function ReviewCarousel({
  showDots,
  slidesToShow,
}: {
  showDots: boolean;
  slidesToShow: number;
}) {
  const { reviews } = useLoaderData() as { reviews: Review[] };

  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div className="h-fit lg:w-[800px] md:w-[600px] sm:w-[400px] w-[200px]">
      <Suspense fallback={<p className="m-auto text-center text-white font-montserrat">Loading...</p>}>
        <Await resolve={reviews}>
          {(loadedReviews) => (loadedReviews && loadedReviews.length > 2 ? (
            <Slider {...settings}>
              {loadedReviews.map((review) => (
                <div
                  key={review._id}
                  className="h-60 p-3 bg-gray-200 rounded-xl"
                >
                  <FaQuoteLeft className="text-3xl" />
                  <div className="font-montserrat mt-3 text-sm">
                    {review.comment}
                  </div>
                  <div className="absolute bottom-4">
                    <p className="font-bold font-montserrat">{review.name}</p>
                    <Rating value={review.rating} readonly />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-200 font-montserrat">
              No reviews available
            </p>
          ))}
        </Await>
      </Suspense>
    </div>
  );
}

export async function loadReviews() {
  try {
    const response = await axios.get("/customer/reviews");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
  
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}

export function loader() {
  return defer({
    reviews: loadReviews(),
  });
}
