function Mobile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-3">
          Desktop Only
        </h1>
        
        <p className="text-slate-600 mb-6 leading-relaxed">
          This application is optimized for desktop screens. Please visit us on a laptop or desktop computer for the best experience.
        </p>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">Tip:</span> Use a device with a screen width of at least 768px
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mobile