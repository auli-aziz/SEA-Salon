import ListItem from "../components/ListItem";
import Border from "../components/Border";
import { formatTime } from "../pages/Admin";
import { Branch } from "../util/interfaces";
import { useEffect, useState } from "react";
import { deleteBranch } from "../util/http";

export default function BranchSection({
  branches,
  searchable,
}: {
  branches: Branch[];
  searchable: boolean;
}) {
  const [searchBranch, setSearchBranch] = useState("");
  const [result, setResult] = useState<Branch[]>(branches);
  const role = localStorage.getItem("role");

  const isAdmin = (role === "admin" ? true : false);

  useEffect(() => {
    const filteredData = Object.values(branches).filter((branch) =>
      branch.name.toLowerCase().includes(searchBranch.toLowerCase())
    );
    setResult(filteredData);
  }, [searchBranch, branches]);
  
  return (
    <div className="relative">
      <div className="px-1">
        {searchable && (
          <input
            type="text"
            placeholder="Search..."
            className=" w-full h-7 p-2 mb-3 border border-gray-500 rounded-xl text-sm"
            value={searchBranch}
            onChange={(e) => setSearchBranch(e.target.value)}
          />
        )}
      </div>
      <Border>
        {result &&
          Object.values(result).map((b) => (
            <ListItem isAdmin={isAdmin} id={b._id} deleteFn={deleteBranch}>
              <div>
                <p className="font-bold text-lg m-1">{b.name}</p>
                <div className="w-fit flex flex-wrap gap-1 my-1 py-1 bg-gray-100">
                  {Object.values(b.services).map((s) => (
                    <div key={s.name} className="w-fit px-3 bg-red-100 rounded-md text-center font-medium text-xs">
                      {s.name}
                    </div>
                  ))}
                </div>
                <p className="font-regular text-xs m-1">{b.location}</p>
                <p className="font-regular text-xs font-semibold text-red-900 m-1">
                  {formatTime(b.openingTime)} - {formatTime(b.closingTime)}
                </p>
              </div>
            </ListItem>
          ))}
      </Border>
    </div>
  );
}
