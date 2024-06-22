import { useState, useEffect } from "react";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Rating } from "@material-tailwind/react";
import ReviewModal from "./forms/ReviewModal";


export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [showDots, setShowDots] = useState(true);
  const [reviews, setReviews] = useState([]);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get('/customer/reviews');
        setReviews(response.data);
      } catch(error) {
        console.log(error);
      }
    }
    getReviews();
  },[]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
        setShowDots(false);
      } else if(window.innerWidth >= 640 && window.innerWidth < 768){
        setShowDots(true);
        setSlidesToShow(2);
      } else{
        setShowDots(true);
        setSlidesToShow(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);

  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-fit py-5 px-7 relative flex justify-center">
      <div className="h-fit w-full py-10 px-14 bg-red-900 min-h-52 rounded-3xl flex flex-wrap items-center justify-around">
        <div className="h-fit lg:mr-9 lg:w-52 mb-7 text-center">
          <h5 className="text-gray-200 font-medium font-montserrat text-xl mb-3">
            Reviews
          </h5>
          <p className="text-gray-200 font-semibold font-montserrat text-3xl">
            What They Say About Us
          </p>
          <button
            onClick={handleOpen}
            className="w-fit mt-5 rounded-lg border-2 md:border-gray-200 px-8 py-1 text-gray-200 md:text-gray-200 font-bold text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
          >
            Add Review
          </button>
        </div>
        <div className="h-fit lg:w-[800px] md:w-[600px] sm:w-[400px] w-[20px]">
          <Slider {...settings}>
            {reviews && reviews.map((review, idx) => (
              <div key={idx} className="h-60 p-3 bg-gray-200 rounded-xl">
                <FaQuoteLeft className="text-3xl"/>
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
        </div>
        <ReviewModal open={open} handleOpen={handleOpen} />
      </div>
    </div>
  );
}
