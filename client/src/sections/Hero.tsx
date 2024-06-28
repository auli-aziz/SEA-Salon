import { useNavigate } from "react-router-dom";
import wallpaper from "../images/wallpaper.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-fit py-52 bg-gray-300 border-2 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-65"></div>
      <h3 className="font-heading md:text-6xl text-5xl mx-24 text-center text-white z-10">
        “Beauty and Elegance Redefined”
      </h3>
      <p className="font-montserrat mt-10 lg:mx-72 mx-20 text-center text-sm md:text-base text-white z-10">
        We are dedicated to delivering the highest level of professionalism,
        expertise, and innovation in the salon industry. Our highly skilled team
        of stylists stays up-to-date with the latest trends, techniques, and
        products to ensure that our clients receive the best possible service
        and results.
      </p>
      <button
        onClick={() => navigate("/reservation")}
        className="font-economica mt-10 font-bold text-xl py-1 px-5 rounded-xl z-10 text-gray-200 bg-transparent border-2 border-white hover:border-red-900 hover:bg-red-800"
      >
        Book Now
      </button>
    </div>
  );
}
