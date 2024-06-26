import { useState, useEffect } from "react";
import ReviewModal from "../components/forms/ReviewModal";
import ReviewCarousel from "../components/ReviewCarousel";
import { useRouteLoaderData } from "react-router-dom";

export default function Reviews() {
  const token = useRouteLoaderData("root") as string | null;
  const [open, setOpen] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [showDots, setShowDots] = useState(true);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
        setShowDots(false);
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setShowDots(true);
        setSlidesToShow(2);
      } else {
        setShowDots(true);
        setSlidesToShow(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {token && (
            <button
              onClick={handleOpen}
              className="w-fit mt-5 rounded-lg border-2 md:border-gray-200 px-8 py-1 text-gray-200 md:text-gray-200 font-bold text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
            >
              Add Review
            </button>
          )}
        </div>
        <ReviewCarousel slidesToShow={slidesToShow} showDots={showDots} />
        <ReviewModal open={open} handleOpen={handleOpen} />
      </div>
    </div>
  );
}
