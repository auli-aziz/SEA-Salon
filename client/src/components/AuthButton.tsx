import { useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import { NavbarContext } from "../contexts/navbar";

export default function AuthButton({
  isAdminDashboard,
  isLogin,
}: {
  isAdminDashboard: boolean;
  isLogin: boolean;
}) {
  const navigate = useNavigate();
  const { path, isFixed } = useContext(NavbarContext);

  const buttonStyle =
    `w-fit rounded-lg px-8 py-1 font-bold text-md md:text-xl font-economica hover:bg-black hover:text-white border-2 ${isAdminDashboard? "ml-5" : "md:mt-0 mt-5 md:ml-10"}`;
  const adminStyling = "border-black text-gray-900 mt-0";
  const customerStyling = `${(isFixed || path !== "/")? "md:border-black md:text-gray-900 border-white text-white" : "border-white text-white"}`;

  const handleLogin = () => {
    navigate("/auth?mode=login");
  };

  return (
    <>
      {isLogin ? (
        <button
          onClick={handleLogin}
          className={`${buttonStyle} ${
            isAdminDashboard ? adminStyling : customerStyling
          }`}
        >
          Log in
        </button>
      ) : (
        <Form action={"/logout"} method="POST">
          <button
            type="submit"
            className={`${buttonStyle} ${
              isAdminDashboard ? adminStyling : customerStyling
            }`}
          >
            Log out
          </button>
        </Form>
      )}
    </>
  );
}
