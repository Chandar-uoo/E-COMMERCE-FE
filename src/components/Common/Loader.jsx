import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center items-center z-50">
      {/* Main spinner container */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 shadow-lg"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading</h2>
        <p className="text-slate-500 text-sm">Please wait....</p>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 bg-slate-200 rounded-full h-1 mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default Loader;