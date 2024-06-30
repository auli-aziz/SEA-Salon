export default function StatCard({ title, num, bgColor }: { title: string; num: number; bgColor: string; }) {
  return (
    <div className={"p-5 text-center rounded-lg min-w-52 w-64 " + bgColor}>
      <p className="font-montserrat font-bold">{title}</p>
      <p className="font-montserrat font-semibold text-4xl mt-5">{num}</p>
    </div>
  );
}
