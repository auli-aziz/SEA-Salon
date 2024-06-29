import { forwardRef } from "react";

interface InputProps {
  labelName: string;
  name: string;
  type: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ labelName, type, name, placeholder }, ref) {
  return (
    <div className="w-full mt-3 font-montserrat text-sm">
      <label className="font-semibold" htmlFor="name">
        {labelName}
      </label>
      <input
        type={type}
        required
        ref={ref}
        name={name}
        placeholder={placeholder}
        className="h-10 w-full p-2 !border !border-gray-400 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-md"
      />
    </div>
  );
});

export default Input;