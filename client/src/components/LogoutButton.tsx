import { Form } from "react-router-dom";

export default function LogoutButton({ isMobile }: { isMobile: boolean }) {
  const mobileStyling = "text-gray-200 md:border-black md:text-gray-900";
  return (
    <Form action="/logout" method="POST">
      <button className={`w-fit rounded-lg md:ml-10 ml-5 px-8 py-1 font-bold text-md md:text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white border-2 ${ isMobile? mobileStyling:"border-black text-gray-900" }`}>
        Log out
      </button>
    </Form>
  );
}
