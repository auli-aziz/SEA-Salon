import { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import BranchForm from "../components/forms/BranchForm";
import { Branch, Service } from "../util/interfaces";
import { loadBranches, loadServices } from "../util/admin";
import BranchSection from "../sections/BranchSection";

export default function Branches() {
  const { branches, services } = useLoaderData() as {
    branches: Branch[]; services: Service[]
  };

  return (
    <div className="mt-7 md:mx-16 mx-5">
      <div className="h-fit w-full p-10 border-t-xl bg-white">
        <h4 className="font-montserrat font-semibold text-xl lg:ml-10 text-center lg:text-left">
          Branches
        </h4>
        <div className="flex flex-wrap lg:justify-between justify-center gap-5 mt-3">
          <div className="w-full md:max-w-[800px]">
            <Suspense
              fallback={<p className="font-montserrat m-auto">Loading...</p>}
            >
              <Await resolve={branches}>
              {(loadedBranches) => (
                <BranchSection branches={loadedBranches} />
              )}
              </Await>
            </Suspense>
          </div>
          <BranchForm services={services} />
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  return defer({
    branches: loadBranches(),
    services: await loadServices()
  });
}
