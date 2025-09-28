
import './index.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { JobFilters } from './components/Filters'
import ResultsHeader from './components/ResultsHeader'
import JobGrid from './components/JobGrid'
import { JobApplicationModal } from './components/JobApplicationModal'
import { useJobs } from './hooks/useJobs'
import { useState } from 'react'

function App() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    experience: "",
    type: "",
    salaryRange: [40, 200] as [number, number],
    datePosted: "",
    companySize: "",
    remote: "",
  })

  const { jobs, loading, error, total, updateFilters } = useJobs()
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)


  const handleApplyClick = (job: any) => {
    setSelectedJob(job)
    setIsApplicationModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsApplicationModalOpen(false)
    setSelectedJob(null)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    updateFilters({
      category: newFilters.category || undefined,
      location: newFilters.location || undefined,
      experience: newFilters.experience || undefined,
      type: newFilters.type || undefined,
      datePosted: newFilters.datePosted || undefined,
      companySize: newFilters.companySize || undefined,
      remote: newFilters.remote || undefined,
    })
  }

  return (
    <div className="min-h-screen bg-background ">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Find Your Dream Job</h1>
          <p className="text-muted-foreground text-lg">Discover opportunities that match your skills and aspirations</p>
        </div>

        <SearchBar />

        <div className="my-6">
          <JobFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Loading jobs...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        ) : jobs && jobs.length > 0 ? (
          <>
            <ResultsHeader totalJobs={total} showingJobs={jobs?.length || 0} />
            <JobGrid jobs={jobs || []} onApplyClick={handleApplyClick} />
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-lg">No jobs found</div>
          </div>
        )}
      </div>

      <JobApplicationModal
        job={selectedJob}
        isOpen={isApplicationModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
export default App
