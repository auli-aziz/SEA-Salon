import { ReactElement } from "react";

export default function ListItem({ children, key }: { children: ReactElement; key: string}) {
  return (
    <div key={key} className="w-full h-fit px-5 py-1 my-1 bg-gray-100">
      {children}
    </div>
  )
}
