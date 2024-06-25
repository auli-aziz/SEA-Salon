import { redirect } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import axios from "axios";

export default function Authentication() {
  return (
    <div className="w-full px-10 h-[500px] pt-[160px] flex items-center justify-center relative">
      <AuthForm />
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  try {
    const data = await request.formData();

    let authData;
    if (mode === "login") {
      authData = {
        email: data.get("email"),
        password: data.get("password"),
      };
    } else {
      authData = {
        email: data.get("email"),
        fullName: data.get("fullName"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
      };
    }

    const response = await axios.post(`/${mode}`, authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      response.status === 422 ||
      response.status === 401 ||
      response.status === 500
    ) {
      throw new Error(response.data.message || "Unknown error occurred");
    }

    const token = response.data.token;
    const role = response.data.role;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    if (role === "admin") {
      return redirect("/admin");
    } else {
      return redirect("/dashboard");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      const errors = error.response.data.errors;

      return {
        status: error.response.status,
        message: errorMessage,
        errors: errors,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
