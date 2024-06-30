import axios from "axios";
import { getAuthToken } from "../util/auth";
import { toast } from "react-toastify";


export async function action({ request }: { request: Request }) {
  const token = getAuthToken();
  try {
    const formData = await request.formData();
    const currentPass = formData.get("currentPass");
    const newPass = formData.get("newPass");
    const confirmPass = formData.get("confirmPass");

    if (newPass !== confirmPass) {
      throw new Error("New password and confirm password do not match");
    }

    const response = await axios.post(
      "/authentication/resetpassword",
      {
        oldPassword: currentPass,
        newPassword: newPass,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Reset password failed.");
    }

    toast.success(response.data.message);
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";

      toast.error(errorMessage);
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      toast.error(error.message);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
