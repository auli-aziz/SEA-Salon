import { useNavigate } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import haircut from "../images/haircut.jpg";
import facial from "../images/facial.jpeg";
import pedicure from "../images/pedicure.jpeg";

const services = [
  {
    name: "Haircuts and Styling",
    image: haircut,
  },
  {
    name: "Manicure and Pedicure",
    image: pedicure,
  },
  {
    name: "Facial Treatments",
    image: facial,
  },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-fit px-20 my-10">
      <div className="flex flex-wrap justify-center gap-10">
        <Carousel className="min-w-60 max-w-96 h-96 rounded-lg relative">
          {Object.values(services).map((s) => (
            <img
              src={s.image}
              alt={s.name}
              className="min-w-60 max-w-96 h-96 rounded-lg object-cover relative"
            />
          ))}
        </Carousel>
        <div className="w-[800px] md:px-28 px-5 flex flex-col items-center">
          <h3 className="font-bold font-economica text-3xl text-center text-red-900 mb-5">
            Who We Are
          </h3>
          <p className="font-montserrat text-sm">
            Welcome to SEA Salon! Founded in 1995 by Emma Williams, we have been
            a leader in the beauty and wellness industry for nearly three
            decades. Our salon offers a wide range of services including
            haircuts, styling, manicures, pedicures, and facial treatments.
            <br />
            <br />
            Our team of skilled stylists is dedicated to staying current with
            the latest trends and techniques, ensuring you receive the best
            possible service and results. We pride ourselves on creating a
            welcoming and relaxing environment where you can indulge in
            self-care and leave feeling confident and beautiful. Thank you for
            choosing SEA Salon. We look forward to serving you!
          </p>
          <div className="w-full mt-10 flex justify-around">
            <button
              onClick={() => navigate("/branches")}
              className="h-fit py-1 w-32 text-red-900 border-2 border-red-900 font-economica font-bold rounded-lg hover:bg-red-900 hover:text-gray-200"
            >
              Avalable Branches
            </button>
            <button
              onClick={() => navigate("/services")}
              className="h-fit py-1 w-32 text-red-900 border-2 border-red-900 font-economica font-bold rounded-lg hover:bg-red-900 hover:text-gray-200"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
