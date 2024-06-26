import { defer, useLoaderData } from "react-router-dom"
import { loadProfile } from "../util/admin"
import ProfileCard, { Profile } from "../components/ProfileCard"

export default function AdminSettings() {
  const { profile } = useLoaderData() as { profile: Profile };
  
  return (
    <div className="flex justify-center">
      <ProfileCard profile={profile} />
    </div>
  )
}

export async function loader() {
  return defer({
    profile: await loadProfile()
  })
}
