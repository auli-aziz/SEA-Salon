import ListItem from "../components/ListItem";
import Border from "../components/Border";
import { formatTime } from "../pages/Admin";
import { Branch } from "../util/interfaces";

export default function BranchSection({ branches }: { branches: Branch[] }) {
  return (
    <Border>
      {Object.values(branches).map((b) => (
        <ListItem key={b.name}>
          <div>
            <p className="font-bold text-lg m-1">{b.name}</p>
            <div className="w-fit flex flex-wrap gap-1 my-1 py-1 bg-gray-100">
              {Object.values(b.services).map((s) => (<div className="w-fit px-3 bg-red-100 rounded-md text-center font-medium text-xs">{s.name}</div>))}
            </div>
            <p className="font-regular text-xs m-1">{b.location}</p>
            <p className="font-regular text-xs font-semibold text-red-900 m-1">
              {formatTime(b.openingTime)} - {formatTime(b.closingTime)}
            </p>
          </div>
        </ListItem>
      ))}
    </Border>
  );
}
