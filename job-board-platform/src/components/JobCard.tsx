import { MapPin, Briefcase, Clock, DollarSign, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job } from '../services/api';

interface JobCardProps {
 job: Job;
 onApplyClick: () => void
}

export function JobCard({ job, onApplyClick }: JobCardProps) {
 return (
  <Card className="hover:shadow-lg transition-shadow duration-200 border-border">
   <CardHeader className="pb-3 lg:pb-4">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
     <div className="flex items-start gap-3 lg:gap-4 flex-1">
      <img
       src={job.companyLogo || "/placeholder.svg"}
       alt={`${job.company} logo`}
       className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg object-cover bg-muted flex-shrink-0"
       onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.svg";
       }}
      />
      <div className="flex-1 min-w-0">
       <CardTitle className="text-lg lg:text-xl text-foreground hover:text-primary cursor-pointer line-clamp-2">
        {job.title}
       </CardTitle>
       <CardDescription className="flex items-center gap-1 mt-1 text-sm lg:text-base">
        <Building className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
        <span className="truncate">{job.company}</span>
       </CardDescription>
      </div>
     </div>
     <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
      <Badge variant="secondary" className="text-xs lg:text-sm">
       {job.category}
      </Badge>
      <p className="text-xs lg:text-sm text-muted-foreground whitespace-nowrap">{job.postedDate}</p>
     </div>
    </div>
   </CardHeader>

   <CardContent className="space-y-3 lg:space-y-4">
    <p className="text-muted-foreground line-clamp-2 text-sm lg:text-base">{job.description}</p>

    <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm text-muted-foreground">
     <div className="flex items-center gap-1">
      <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
      <span className="truncate">{job.location}</span>
     </div>
     <div className="flex items-center gap-1">
      <Briefcase className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
      <span className="truncate">{job.employmentType}</span>
     </div>
     <div className="flex items-center gap-1">
      <Clock className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
      <span className="truncate">{job.experienceLevel}</span>
     </div>
     <div className="flex items-center gap-1">
      <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
      <span className="truncate">{job.salaryRange}</span>
     </div>
    </div>

    <div className="flex flex-wrap gap-1 lg:gap-2">
     {job.skills.slice(0, 2).map((skill, index) => (
      <Badge key={index} variant="outline" className="text-xs">
       {skill}
      </Badge>
     ))}
     {job.skills.length > 2 && (
      <Badge variant="outline" className="text-xs">
       +{job.skills.length - 2} more
      </Badge>
     )}
    </div>

    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 pt-2 lg:pt-4">
     <Button variant="outline" size="sm" className="order-2 sm:order-1 bg-transparent">
      View Details
     </Button>
     <Button onClick={onApplyClick} size="sm" className="order-1 sm:order-2">
      Apply Now
     </Button>
    </div>
   </CardContent>
  </Card>
 )
}
