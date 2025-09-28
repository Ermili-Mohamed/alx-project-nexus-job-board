import { JobCard } from './JobCard';
import type { Job } from '../services/api';

interface JobGridProps {
 jobs: Job[];
 onApplyClick: (job: Job) => void;
}

const JobGrid = ({ jobs, onApplyClick }: JobGridProps) => {
 return (
  <div className="py-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {jobs.map((job) => (
      <JobCard key={job._id} job={job} onApplyClick={() => onApplyClick(job)} />
     ))}
    </div>
   </div>
  </div>
 );
};

export default JobGrid;
