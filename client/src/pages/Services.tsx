import haircut from "../images/haircut.jpg";
import facial from "../images/facial.jpeg";
import pedicure from "../images/pedicure.jpeg";
import ServiceCard from "../components/ServiceCard";

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

export default function Services() {
  return (
    <div className="px-16 py-10 h-fit w-full">
      <h3 className="font-bold font-economica text-3xl text-center mb-5">
        Our Signature Services
      </h3>
      <div className="flex flex-wrap justify-around items-center">
        {
          services.map((service) => (
            <ServiceCard key={service.name} name={service.name} image={service.image} />
          ))
        }
      </div>
    </div>
  );
}
