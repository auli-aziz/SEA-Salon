import ListItem from "../components/ListItem";
import Border from "../components/Border";
import { formatTime } from "../util/format";
import { BranchModel } from "../util/interfaces";
import { useEffect, useState } from "react";
import { deleteBranch } from "../util/http";

export default function BranchSection({
  branches,
  searchable,
}: {
  branches: BranchModel[];
  searchable: boolean;
}) {
  const [searchBranch, setSearchBranch] = useState("");
  const [result, setResult] = useState<BranchModel[]>(branches);
  const role = localStorage.getItem("role");

  const isAdmin = role === "admin" ? true : false;

  useEffect(() => {
    const filteredData = Object.values(branches).filter((branch) =>
      branch.name.toLowerCase().includes(searchBranch.toLowerCase())
    );
    setResult(filteredData);
  }, [searchBranch, branches]);

  return (
    <div className="relative w-full">
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
        {result.length > 0 ? (
          Object.values(result).map((b) => (
            <ListItem
              isAdmin={isAdmin}
              id={b._id}
              deleteFn={deleteBranch}
              key={b._id}
            >
              <div>
                <p className="font-bold text-lg m-1">{b.name}</p>
                <div className="w-fit flex flex-wrap gap-1 my-1 py-1 bg-gray-100">
                  {Object.values(b.services).map((s) => (
                    <div
                      key={s.name}
                      className="w-fit px-3 bg-red-100 rounded-md text-center font-medium text-xs"
                    >
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
          ))
        ) : (
          <div className="flex h-full w-full">
            <p className="m-auto">No branches found</p>
          </div>
        )}
      </Border>
    </div>
  );
}
