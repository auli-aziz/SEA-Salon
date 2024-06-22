export default function ServiceCard({ name, image }: { name: string, image: string}) {
  return (
    <div className="w-fit h-fit m-5 rounded-lg hover:scale-105 relative">
      <img
        src={image}
        alt={name}
        className="min-w-60 max-w-72 h-72 rounded-lg object-cover relative"
      />
      <div className="min-w-72 max-w-96 absolute bottom-0 left-0 py-5 px-3 bg-gradient-to-t from-black to-transparent rounded-b-lg">
        <h5 className="text-gray-200 text-2xl font-bold font-economica z-10">
          {name}
        </h5>
      </div>
    </div>
  );
}
