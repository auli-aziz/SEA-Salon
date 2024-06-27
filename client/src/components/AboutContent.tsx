import { Link } from "react-router-dom";

const ServicesContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <Link to="/services" className="block text-sm hover:underline">
          Our Services
        </Link>
        <Link to="/Branches" className="block text-sm hover:underline">
          Branches
        </Link>
      </div>
    </div>
  );
};

export default ServicesContent;