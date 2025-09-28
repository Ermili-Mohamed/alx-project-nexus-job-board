import { Search } from 'lucide-react';

const SearchBar = () => {
 return (
  <div className="bg-white py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
     </div>
     <input
      type="text"
      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
      placeholder="Search jobs, companies, or keywords..."
     />
    </div>
   </div>
  </div>
 );
};

export default SearchBar;
