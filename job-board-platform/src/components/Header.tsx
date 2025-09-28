import { Plus } from 'lucide-react';

const Header = () => {
 return (
  <header className="bg-white border-b border-gray-200">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-6">
     {/* Logo and Title */}
     <div className="flex items-center space-x-4">
      <div className="text-2xl font-bold text-gray-900">
       JobBoard
      </div>
      <div className="text-sm text-gray-600 hidden sm:block">
       Find your next opportunity
      </div>
     </div>

     {/* Post a Job Button */}
     <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
      <Plus size={20} />
      <span>Post a Job</span>
     </button>
    </div>
   </div>
  </header>
 );
};

export default Header;
