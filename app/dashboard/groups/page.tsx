export default function GroupsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Groups & Projects
        </h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          disabled
        >
          Add Project
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Project management functionality is currently in development. 
            Soon you'll be able to organize your tasks into groups and projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {['Create Projects', 'Organize Tasks', 'Track Progress'].map((feature) => (
            <div key={feature} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-gray-400">
                {feature}
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded">
                <div className="w-1/3 h-full bg-blue-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}