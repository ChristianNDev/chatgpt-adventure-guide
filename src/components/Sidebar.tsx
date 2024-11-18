import { CATEGORIES } from "@/lib/constants";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Local Guide AI</h2>
      </div>
      
      <button className="w-full mb-4 bg-primary hover:bg-primary/90 text-white rounded-md py-2 px-4">
        New Chat
      </button>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};