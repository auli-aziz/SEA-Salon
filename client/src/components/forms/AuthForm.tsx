import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Input from "../Input";
import TransparentButton from "../TransparentButton";
import { data } from "../../util/interfaces";

export default function AuthForm() {
  const data = useActionData() as data;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

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
      <Input
        labelName="Email"
        type="email"
        name="email"
        placeholder="email@gmail.com"
      />

      {!isLogin && (
        <>
          <Input
            labelName="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
          />
          <Input
            labelName="Phone Number"
            type="tel"
            name="phoneNumber"
            placeholder="08XXXXXXXX"
          />
        </>
      )}
      <Input
        labelName="Password"
        type="password"
        name="password"
        placeholder="password"
      />
      <TransparentButton isSubmitting={isSubmitting} />
      <div className="text-center text-sm mt-10">
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
