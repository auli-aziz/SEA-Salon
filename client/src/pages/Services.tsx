import haricut from "../images/haricut.jpg";
import facial from "../images/facial.jpeg";
import pedicure from "../images/pedicure.jpeg";

export default function Services() {
  return (
    <div className="px-16 py-10 h-fit w-full">
      <h3 className="font-bold font-economica text-3xl text-center mb-5">
        Our Signature Services
      </h3>
      <div className="flex flex-wrap justify-around items-center">
        <div className="w-fit h-fit m-5 rounded-lg hover:scale-105 relative">
          <img
            src={haricut}
            alt="Haricuts and Styling"
            className="min-w-60 max-w-72 h-72 rounded-lg object-cover relative"
          />
          <div className="min-w-72 max-w-96 absolute bottom-0 left-0 py-5 px-3 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <h5 className="text-neutral-200 text-2xl font-bold font-economica z-10">
              Haricuts and Styling
            </h5>
          </div>
        </div>
        <div className="w-fit h-fit m-5 rounded-lg hover:scale-105 relative">
          <img
            src={pedicure}
            alt="Manicure and Pedicure"
            className="min-w-60 max-w-72 h-72 rounded-lg object-cover relative"
          />
          <div className="min-w-72 max-w-96 absolute bottom-0 left-0 py-5 px-3 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <h5 className="text-neutral-200 text-2xl font-bold font-economica z-10">
              Manicure and Pedicure
            </h5>
          </div>
        </div>
        <div className="w-fit h-fit m-5 rounded-lg hover:scale-105 relative">
          <img
            src={facial}
            alt="Facial Treatments"
            className="min-w-60 max-w-72 h-72 rounded-lg object-cover relative"
          />
          <div className="min-w-72 max-w-96 absolute bottom-0 left-0 py-5 px-3 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <h5 className="text-neutral-200 text-2xl font-bold font-economica z-10">
              Facial Treatments
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
