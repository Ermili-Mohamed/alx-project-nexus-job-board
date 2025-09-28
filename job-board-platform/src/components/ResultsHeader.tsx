import { ChevronDown } from 'lucide-react';

const sortOptions = [
 'Most Recent',
 'Oldest First',
 'Salary: High to Low',
 'Salary: Low to High',
 'Company Name A-Z',
 'Company Name Z-A'
];

interface ResultsHeaderProps {
 totalJobs: number;
 showingJobs: number;
}

const ResultsHeader = ({ totalJobs, showingJobs }: ResultsHeaderProps) => {
 return (
  <div className="bg-white py-4 border-b border-gray-200">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center">
     {/* Job Count */}
     <div className="text-sm text-gray-600">
      Showing {showingJobs} of {totalJobs} jobs
     </div>

     {/* Sort Dropdown */}
     <div className="relative">
      <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
       {sortOptions.map((option) => (
        <option key={option} value={option}>
         {option}
        </option>
       ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
     </div>
    </div>
   </div>
  </div>
 );
};

export default ResultsHeader;
