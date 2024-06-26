import { useNavigate, useRouteLoaderData } from "react-router-dom";

export default function Hero() {
  const token = useRouteLoaderData("root") as string | null;
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gray-300 border-2 flex flex-col items-center justify-center">
      <h3 className="font-heading md:text-6xl text-5xl mx-24 text-center">
        “Beauty and Elegance Redefined”
      </h3>
      <p className="font-montserrat mt-10 lg:mx-72 mx-20 text-center text-sm md:text-base">
        We are dedicated to delivering the highest level of professionalism,
        expertise, and innovation in the salon industry. Our highly skilled team
        of stylists, stay up-to-date with the latest trends, techniques, and
        products to ensure that our clients receive the best possible service
        and results.
      </p>
      <button
        onClick={() => navigate("/reservation")}
        className="font-economica mt-10 font-bold text-xl border-2 border-red-800 hover:text-gray-200 text-red-800 hover:bg-red-800 py-1 px-5 rounded-xl"
      >
        Book Now
      </button>
    </div>
  );
}
