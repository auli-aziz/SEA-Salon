import { Form } from "react-router-dom";

export default function LogoutButton() {
  return (
    <Form action="/logout" method="POST">
      <button className="w-fit rounded-lg border-2 md:border-black ml-5 md:ml-10 px-8 py-1 text-gray-200 md:text-gray-900 font-bold text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white hover:border-black">
        Log out
      </button>
    </Form>
  );
}
