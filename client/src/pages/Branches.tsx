import BranchSection from "../sections/BranchSection";
import { Await, defer, useLoaderData } from "react-router-dom";
import { loadBranches } from "../util/admin";
import { Branch } from "../util/interfaces";
import { Suspense } from "react";

export default function Branches() {
  const { branches } = useLoaderData() as { branches: Branch[] };

  return (
    <div className="py-10 mx-5 flex flex-col items-center">
      <h3 className="font-economica text-2xl font-bold mb-7">Our Branches</h3>
      <Suspense fallback={<p className="font-montserrat m-auto">Loading...</p>}>
        <Await resolve={branches}>
          {(loadedBranches) => (
            <BranchSection branches={loadedBranches} searchable={true} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export async function loader() {
  return defer({
    branches: loadBranches(),
  });
}
