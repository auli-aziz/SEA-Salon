export default function ServiceCard({
  name,
  duration,
}: {
  name: string;
  duration: string;
}) {
  return (
    <div className="w-fit h-fit rounded-lg hover:scale-105 relative">
      <div className="w-72 h-24 rounded-lg relative bg-red-300"></div>
      <div className="min-w-72 max-w-96 absolute text-center bottom-0 left-0 py-5 px-3 text-gray-200 bg-gradient-to-t from-red-900 to-transparent rounded-b-lg">
        <h5 className="text-xl font-bold font-economica z-10">
          {name}
        </h5>
        <p className="text-sm">Duration: {duration} Minute(s)</p>
      </div>
    </div>
  );
}
