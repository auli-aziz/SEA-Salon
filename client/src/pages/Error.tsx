import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-montserrat">
      <h1 className="text-6xl font-bold text-red-800 mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-red-800 underline text-lg">
        Go back to Home
      </Link>
    </div>
  )
}
