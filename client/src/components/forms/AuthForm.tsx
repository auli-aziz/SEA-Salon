import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const inputStyling =
    "h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md";

  return (
    <Form
      method="POST"
      className="p-10 md:w-[600px] mx-3 font-montserrat bg-gray-100 rounded-xl shadow-2xl absolute"
    >
      <div className="flex items-center justify-center">
        <h1 className="m-auto mb-7 font-economica font-bold text-3xl text-red-900">
          {isLogin ? "Log in" : "Become a Member!"}
        </h1>
      </div>
      {data && (data.message || data.errors) && (
        <div className="border text-sm border-red-800 bg-red-100 p-2 rounded-md">
          {data.message && <p>{data.message}</p>}
          {data.errors && (
            <ul className="list-disc list-inside">
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}  
      <div className="mt-1">
        <label className="font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className={inputStyling}
          placeholder="example@mail.com"
        />
      </div>
      {!isLogin && (
        <div>
          <div className="mt-1">
            <label className="font-medium" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              className={inputStyling}
              placeholder="John Doe"
            />
          </div>
          <div className="mt-1">
            <label className="font-medium" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              required
              className={inputStyling}
              placeholder="08XXXXXXXX"
            />
          </div>
        </div>
      )}
      <div className="mt-1">
        <label className="font-medium" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          className={inputStyling}
          placeholder="password"
        />
      </div>
      <button
        disabled={isSubmitting}
        className={`w-full flex justify-center font-economica mt-10 font-bold text-xl border-2 border-red-800 bg-white text-red-800 py-1 px-5 rounded-xl ${
          isSubmitting ? "" : " hover:bg-red-800 hover:text-gray-200"
        }`}
      >
        {isSubmitting ? (
          <div className="margin-auto flex items-center gap-3">
            <Spinner className="h-4 w-4" />
            Submitting...
          </div>
        ) : (
          "Submit"
        )}
      </button>
      <div className="text-center mt-10">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={`?mode=${isLogin ? "signup" : "login"}`}
          className="font-semibold"
        >
          {isLogin ? "Register" : "Login"}
        </Link>
      </div>
    </Form>
  );
}
