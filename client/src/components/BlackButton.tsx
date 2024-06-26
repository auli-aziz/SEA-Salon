import { Spinner } from "@material-tailwind/react";

export default function BlackButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`flex justify-center rounded-lg text-gray-200 font-bold w-full py-1 font-economica ${
        isSubmitting ? "bg-gray-800" : "bg-gray-900 hover:bg-black"
      }`}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-3">
          <Spinner className="h-4 w-4" />
          Submitting...
        </div>
      ) : (
        "Add"
      )}
    </button>
  );
}
