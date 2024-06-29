import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent");
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message");
        }
      );
  };
  return (
    <div className="px-14 py-3 w-full xl:w-[770px] h-[400px] flex-2 relative">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="lg:w-[700px] md:w-[670px] sm:w-[500px] w-[280px] bg-white px-10 py-12 flex flex-col shadow-2xl absolute xl:left-14 lg:left-52"
      >
        <input
          name="user_name"
          required
          type="text"
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl"
          placeholder="Enter your Name"
        />
        <input
          name="user_email"
          required
          type="email"
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl"
          placeholder="Enter your Email"
        />
        <textarea
          name="message"
          required
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl h-52"
          placeholder="Enter your Message"
        />
        <button
          type="submit"
          className="bg-red-800 p-2 text-white font-economica md:text-lg font-bold hover:scale-105"
        >
          SEND EMAIL
        </button>
      </form>
    </div>
  );
}
