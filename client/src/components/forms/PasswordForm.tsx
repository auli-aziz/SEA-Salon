import { Form, useNavigation } from "react-router-dom";
import BlackButton from "../BlackButton";

export default function PasswordForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const inputStyling =
    "h-8 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md";

  return (
    <Form
      method="POST"
      className="mt-5 p-3 rounded-lg border border-black font-montserrat text-sm"
    >
      <p className="font-semibold mb-5">Reset Password</p>
      <div className="mt-1">
        <table className="text-xs">
          <tr className="text-left">
            <td className="font-semibold min-w-20 md:min-w-32">
              <label className="font-medium w-full" htmlFor="fullName">
                Current Password
              </label>
            </td>
            <td className="w-full">
              <input
                type="password"
                name="currentPass"
                required
                className={inputStyling}
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="mt-1 mb-7">
        <table className="text-xs">
          <tr className="text-left">
            <td className="font-semibold min-w-20 md:min-w-32">
              <label className="font-medium" htmlFor="fullName">
                New Password
              </label>
            </td>
            <td className="w-full">
              <input
                type="password"
                name="newPass"
                required
                className={inputStyling}
              />
            </td>
          </tr>
          <tr className="text-left">
            <td className="font-semibold min-w-20 md:min-w-32">
              <label className="font-medium" htmlFor="fullName">
                Confirm Password
              </label>
            </td>
            <td className="w-full">
              <input
                type="password"
                name="confirmPass"
                required
                className={inputStyling}
              />
            </td>
          </tr>
        </table>
      </div>
      <BlackButton isSubmitting={isSubmitting} />
    </Form>
  );
}
