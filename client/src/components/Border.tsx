import React from 'react'

export default function Border({ children }) {
  return (
    <div className="h-[400px] p-1 mt-3 border-4 border-red-800 rounded-lg overflow-scroll font-montserrat text-sm">
      {children}
    </div>
  )
}
