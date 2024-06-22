import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="h-fit static w-full md:px-28 px-14 pb-12 pt-36 bg-red-900">
        <div className="h-fit w-full flex flex-col md:flex-row items-center md:justify-between">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-100">
            <a href="/">SEA Salon</a>
          </h3>
          <div className="h-fit w-fit flex justify-between md:mt-0 mt-2">
            <FaInstagram className="text-2xl text-gray-300 hover:text-gray-100 md:ml-5 mx-3" />
            <FaWhatsapp className="text-2xl text-gray-300 hover:text-gray-100 md:ml-5 mx-3" />
          </div>
        </div>
        <div className="h-fit w-full lg:mt-2 mt-5 flex lg:flex-row flex-col justify-between items-center text-center">
          <p className="text-gray-200 text-sm font-light font-montserrat">Beauty and Elegance Redefined</p>
          <div className="flex md:flex-row flex-col lg:mt-0 mt-2">
            <p className="text-gray-300 text-xs font-light font-montserrat">&copy; 2024 by Aulia Anugrah Aziz</p>
            <p className="text-gray-300 text-xs font-light font-montserrat md:ml-5 hover:underline"><a href="">Privacy Policy</a></p>
            <p className="text-gray-300 text-xs font-light font-montserrat md:ml-5 hover:underline"><a href="">Legal</a></p>
          </div>
        </div>
      </div>
  )
}
