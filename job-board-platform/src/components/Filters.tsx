import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { X, Filter, Bookmark, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface JobFiltersProps {
  filters: {
    category: string
    location: string
    experience: string
    type: string
    salaryRange: [number, number]
    datePosted: string
    companySize: string
    remote: string
  }
  onFiltersChange: (filters: JobFiltersProps['filters']) => void
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateFilter = (key: string, value: string | [number, number]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      location: "",
      experience: "",
      type: "",
      salaryRange: [40, 200],
      datePosted: "",
      companySize: "",
      remote: "",
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.location) count++
    if (filters.experience) count++
    if (filters.type) count++
    if (filters.datePosted) count++
    if (filters.companySize) count++
    if (filters.remote) count++
    if (filters.salaryRange[0] !== 40 || filters.salaryRange[1] !== 200) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Primary Filters */}
      <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2 lg:gap-4">
        <Select value={filters.category} onValueChange={(value: string) => updateFilter("category", value)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Data">Data</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(value: string) => updateFilter("location", value)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Los Angeles">Los Angeles</SelectItem>
            <SelectItem value="Austin">Austin</SelectItem>
            <SelectItem value="Seattle">Seattle</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.experience} onValueChange={(value: string) => updateFilter("experience", value)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Entry-Level">Entry-Level</SelectItem>
            <SelectItem value="Mid-Level">Mid-Level</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value: string) => updateFilter("type", value)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <div className="col-span-2 lg:col-span-1 flex gap-2">
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="flex-1">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full lg:w-auto flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                <span className="lg:hidden">More Filters</span>
                <span className="hidden lg:inline">Advanced</span>
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4 lg:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 lg:hidden" />
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2 bg-transparent">
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleContent className="space-y-4 lg:space-y-6">
          <div className="border border-border rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base lg:text-lg font-semibold text-foreground">Advanced Filters</h3>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 self-start sm:self-auto">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save Search</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Salary Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Salary Range: ${filters.salaryRange[0]}k - ${filters.salaryRange[1]}k
                </Label>
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value: number[]) => updateFilter("salaryRange", value as [number, number])}
                  max={200}
                  min={40}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$40k</span>
                  <span>$200k+</span>
                </div>
              </div>

              {/* Date Posted */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Date Posted</Label>
                <Select value={filters.datePosted} onValueChange={(value: string) => updateFilter("datePosted", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="3d">Last 3 days</SelectItem>
                    <SelectItem value="1w">Last week</SelectItem>
                    <SelectItem value="2w">Last 2 weeks</SelectItem>
                    <SelectItem value="1m">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Company Size</Label>
                <Select value={filters.companySize} onValueChange={(value: string) => updateFilter("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any size</SelectItem>
                    <SelectItem value="startup">Startup (1-50)</SelectItem>
                    <SelectItem value="small">Small (51-200)</SelectItem>
                    <SelectItem value="medium">Medium (201-1000)</SelectItem>
                    <SelectItem value="large">Large (1000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remote Work */}
              <div className="space-y-3 lg:col-span-3">
                <Label className="text-sm font-medium">Remote Work</Label>
                <Select value={filters.remote} onValueChange={(value: string) => updateFilter("remote", value)}>
                  <SelectTrigger className="lg:w-1/3">
                    <SelectValue placeholder="Any option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any option</SelectItem>
                    <SelectItem value="remote">Remote only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Category: {filters.category}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("category", "")}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Location: {filters.location}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("location", "")}
              />
            </Badge>
          )}
          {filters.experience && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Experience: {filters.experience}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("experience", "")}
              />
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Type: {filters.type}
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => updateFilter("type", "")} />
            </Badge>
          )}
          {filters.datePosted && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Posted:{" "}
              {filters.datePosted === "24h"
                ? "Last 24 hours"
                : filters.datePosted === "3d"
                  ? "Last 3 days"
                  : filters.datePosted === "1w"
                    ? "Last week"
                    : filters.datePosted === "2w"
                      ? "Last 2 weeks"
                      : filters.datePosted === "1m"
                        ? "Last month"
                        : filters.datePosted}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("datePosted", "")}
              />
            </Badge>
          )}
          {filters.companySize && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Size:{" "}
              {filters.companySize === "startup"
                ? "Startup (1-50)"
                : filters.companySize === "small"
                  ? "Small (51-200)"
                  : filters.companySize === "medium"
                    ? "Medium (201-1000)"
                    : filters.companySize === "large"
                      ? "Large (1000+)"
                      : filters.companySize}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("companySize", "")}
              />
            </Badge>
          )}
          {filters.remote && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Remote:{" "}
              {filters.remote === "remote"
                ? "Remote only"
                : filters.remote === "hybrid"
                  ? "Hybrid"
                  : filters.remote === "onsite"
                    ? "On-site only"
                    : filters.remote}
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => updateFilter("remote", "")} />
            </Badge>
          )}
          {(filters.salaryRange[0] !== 40 || filters.salaryRange[1] !== 200) && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Salary: ${filters.salaryRange[0]}k - ${filters.salaryRange[1]}k
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("salaryRange", [40, 200])}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
