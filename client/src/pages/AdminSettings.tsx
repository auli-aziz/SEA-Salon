import { defer, useLoaderData } from "react-router-dom";
import { loadProfile } from "../util/admin";
import ProfileCard from "../sections/ProfileCard";
import { Profile } from "../util/interfaces";

export default function AdminSettings() {
  const { profile } = useLoaderData() as { profile: Profile };
  
  return (
    <div className="flex justify-center pt-10">
      <ProfileCard profile={profile} />
    </div>
  )
}

export async function loader() {
  return defer({
    profile: await loadProfile()
  })
}
