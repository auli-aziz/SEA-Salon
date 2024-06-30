export default function Border({ children }) {
  return (
    <div className="h-[400px] w-full p-1 border-4 border-red-800 rounded-lg overflow-scroll font-montserrat text-sm">
      {children}
    </div>
  );
}
