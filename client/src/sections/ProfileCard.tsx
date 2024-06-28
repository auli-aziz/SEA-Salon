import PasswordForm from "../components/forms/PasswordForm";
import { Profile } from "../util/interfaces";

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="h-fit w-full m-auto md:m-0 md:w-[600px] py-5 px-10 rounded-lg shadow-xl text-center">
      <h4 className="font-montserrat font-semibold text-xl">My Profile</h4>
      <table className="w-full mt-5 text-left font-montserrat text-sm">
        <tbody>
          <tr className="h-7">
            <td className="font-semibold w-52">Full Name:</td>
            <td>{profile.fullName}</td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Email:</td>
            <td>{profile.email}</td>
          </tr>
          <tr className="h-7">
            <td className="font-semibold w-52">Phone Number:</td>
            <td>{profile.phoneNumber}</td>
          </tr>
        </tbody>
      </table>
      <PasswordForm />
    </div>
  );
}

