import { Spinner } from '@material-tailwind/react'

export default function TransparentButton({ isSubmitting }: { isSubmitting: boolean; }) {
  return (
    <button
        disabled={isSubmitting}
        className={`w-full flex justify-center font-economica mt-10 font-bold text-xl border-2 border-red-800 text-red-800 py-1 px-5 rounded-xl ${
          isSubmitting ? "" : " hover:bg-red-800 hover:text-gray-200"
        }`}
        type="submit"
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
  )
}
