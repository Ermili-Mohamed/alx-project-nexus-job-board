const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

interface Job {
  _id: string;
  title: string;
  company: string;
  companyLogo: string;
  category: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Remote";
  experienceLevel: "Entry" | "Mid-Level" | "Senior" | "Lead";
  salaryRange: string;
  postedDate: string;
  description: string;
  skills: string[];
  isActive: boolean;
  applicationsCount: number;
  companyId?: string;
}

interface JobFilters {
  category?: string;
  location?: string;
  experience?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  datePosted?: string;
  companySize?: string;
  remote?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

interface ApplicationData {
  jobId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
  };
  professionalInfo: {
    experience: string;
    currentRole: string;
    currentCompany?: string;
    salaryExpectation: string;
    availabilityDate: string;
    skills: string[];
  };
  applicationDetails: {
    coverLetter: string;
    whyInterested: string;
    references: boolean;
    relocate: boolean;
    remoteWork: string;
  };
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  }

  // Jobs API
  async getJobs(filters: JobFilters = {}): Promise<
    ApiResponse<Job[]> & {
      total: number;
      page: number;
      pages: number;
      count: number;
    }
  > {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}/jobs?${params}`;

    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/jobs/categories`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getLocations(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/jobs/locations`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Applications API
  async submitApplication(
    applicationData: ApplicationData,
    files?: { resume?: File; portfolio?: File }
  ): Promise<ApiResponse<any>> {
    const formData = new FormData();

    // Add application data as JSON
    formData.append("jobId", applicationData.jobId);
    formData.append(
      "personalInfo",
      JSON.stringify(applicationData.personalInfo)
    );
    formData.append(
      "professionalInfo",
      JSON.stringify(applicationData.professionalInfo)
    );
    formData.append(
      "applicationDetails",
      JSON.stringify(applicationData.applicationDetails)
    );

    // Add files if provided
    if (files?.resume) {
      formData.append("resume", files.resume);
    }
    if (files?.portfolio) {
      formData.append("portfolio", files.portfolio);
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    return this.handleResponse(response);
  }

  async getMyApplications(
    page = 1,
    limit = 10,
    status?: string
  ): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append("status", status);

    const response = await fetch(
      `${API_BASE_URL}/applications/my-applications?${params}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  // Authentication API
  async registerCandidate(data: {
    email: string;
    password: string;
    profile: {
      firstName: string;
      lastName: string;
      phone?: string;
      location?: string;
    };
  }): Promise<ApiResponse<{ token: string; data: any }>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async loginCandidate(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ token: string; data: any }>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export type { Job, JobFilters, ApplicationData, ApiResponse };
