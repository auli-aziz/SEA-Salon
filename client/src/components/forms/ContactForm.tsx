export default function ContactForm() {
  return (
    <div className="px-14 py-3 w-full h-[400px] flex-2 relative">
      <form
        action=""
        className="lg:w-[600px] lg:ml-10 md:w-[670px] sm:w-[500px] w-[280px] bg-white px-10 py-12 flex flex-col shadow-2xl absolute"
      >
        <input
          type="text"
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl"
          placeholder="Enter your Name"
        />
        <input
          type="email"
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl"
          placeholder="Enter your Email"
        />
        <textarea
          className="p-1 border-4 border-red-800 mb-5 font-economica md:text-xl h-52"
          placeholder="Enter your Message"
        />
        <button className="bg-red-800 p-2 text-white font-economica md:text-lg font-bold">
          SEND EMAIL
        </button>
      </form>
    </div>
  );
}
