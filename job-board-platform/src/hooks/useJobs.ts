import { useState, useEffect } from "react";
import { apiService, type Job, type JobFilters } from "../services/api";

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
  refetch: () => void;
  updateFilters: (newFilters: Partial<JobFilters>) => void;
}

export const useJobs = (initialFilters: JobFilters = {}): UseJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getJobs({
        ...filters,
        page,
        limit: 10,
      });

      if (response.success && response.data) {
        setJobs(response.data);
        setTotal(response.total);
        setPage(response.page);
        setPages(response.pages);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page when filters change
  };

  const refetch = () => {
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, [filters, page]);

  return {
    jobs,
    loading,
    error,
    total,
    page,
    pages,
    refetch,
    updateFilters,
  };
};
