const TabNavigation = ({
  currentTab,
  setCurrentTab
}: {
  currentTab: string
  setCurrentTab: any
}) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        <button
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            currentTab === 'basic'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setCurrentTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            currentTab === 'shipping'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setCurrentTab('shipping')}
        >
          Shipping
        </button>
        <button
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            currentTab === 'details'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setCurrentTab('details')}
        >
          Details
        </button>
        <button
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            currentTab === 'images'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setCurrentTab('images')}
        >
          Images
        </button>
      </nav>
    </div>
  )
}

export default TabNavigation
