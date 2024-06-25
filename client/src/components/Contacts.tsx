import { CgBoy, CgGirl } from "react-icons/cg";
import ContactForm from "./forms/ContactForm";

export default function Contacts() {
  return (
    <div className="h-fit w-full flex lg:flex-row flex-wrap scroll-mt-[170px]" id="contacts">
      <div className="h-fit xl:w-[490px] w-full md:px-40 py-24 flex flex-col items-center">
        <h3 className="font-heading font-bold text-3xl sm:text-4xl mb-10 text-red-900">Contact Us!</h3>
        <div className="mt-5 font-montserrat flex items-center">
          <CgBoy className="text-4xl mr-10 text-red-800" />
          <div className="">
            <p className="font-semibold font-montserrat md:text-xl">Thomas</p>
            <p className="mt-1 font-regular flex"><span className="hidden md:block mr-3">Phone: </span>08123456789</p>
          </div>
        </div>
        <div className="mt-5 font-montserrat flex items-center">
        <CgGirl className="text-4xl mr-10 text-red-800" />
          <div className="">
            <p className="font-semibold font-montserrat md:text-xl">Sekar</p>
            <p className="mt-1 font-regular flex"><span className="hidden md:block mr-3">Phone: </span>08164829372</p>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
