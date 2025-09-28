"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, ChevronLeft, ChevronRight, X, Plus } from "lucide-react"

interface JobApplicationModalProps {
  job: any
  isOpen: boolean
  onClose: () => void
}

const skillOptions = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "Next.js",
  "Vue.js",
  "Angular",
  "CSS",
  "HTML",
  "Figma",
  "Adobe Creative Suite",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Agile",
  "Scrum",
  "Product Management",
  "Data Analysis",
  "Machine Learning",
  "UI/UX Design",
  "Marketing",
  "SEO",
  "Content Writing",
]

export function JobApplicationModal({ job, isOpen, onClose }: JobApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    portfolioUrl: "",

    // Step 2: Professional Information
    experience: "",
    currentRole: "",
    currentCompany: "",
    salaryExpectation: "",
    availabilityDate: "",
    skills: [] as string[],
    customSkills: "",

    // Step 3: Application Details
    coverLetter: "",
    whyInterested: "",
    resume: null as File | null,
    portfolio: null as File | null,
    references: false,
    relocate: false,
    remoteWork: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const addCustomSkill = () => {
    if (formData.customSkills.trim() && !formData.skills.includes(formData.customSkills.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.customSkills.trim()],
        customSkills: "",
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.location.trim()) newErrors.location = "Location is required"
    }

    if (step === 2) {
      if (!formData.experience) newErrors.experience = "Experience level is required"
      if (!formData.currentRole.trim()) newErrors.currentRole = "Current role is required"
      if (!formData.salaryExpectation.trim()) newErrors.salaryExpectation = "Salary expectation is required"
      if (!formData.availabilityDate) newErrors.availabilityDate = "Availability date is required"
      if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill"
    }

    if (step === 3) {
      if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required"
      if (!formData.whyInterested.trim()) newErrors.whyInterested = "Please explain why you're interested"
      if (!formData.resume) newErrors.resume = "Resume is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false)
      setCurrentStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        linkedinUrl: "",
        portfolioUrl: "",
        experience: "",
        currentRole: "",
        currentCompany: "",
        salaryExpectation: "",
        availabilityDate: "",
        skills: [],
        customSkills: "",
        coverLetter: "",
        whyInterested: "",
        resume: null,
        portfolio: null,
        references: false,
        relocate: false,
        remoteWork: "",
      })
      setErrors({})
      onClose()
    }, 3000)
  }

  const handleFileUpload = (field: string, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size must be less than 5MB",
      }))
      return
    }
    handleInputChange(field, file)
  }

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] sm:w-full overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg lg:text-xl">Apply for {job.title}</DialogTitle>
          <DialogDescription className="text-sm lg:text-base">
            {job.company} • {job.location}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6 lg:py-8">
            <CheckCircle className="mx-auto h-12 w-12 lg:h-16 lg:w-16 text-green-500 mb-4" />
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground text-sm lg:text-base">
              Thank you for your interest. We'll review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs lg:text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm">
                        Current Location *
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City, State/Country"
                        className={errors.location ? "border-destructive" : ""}
                      />
                      {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedinUrl" className="text-sm">
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolioUrl" className="text-sm">
                        Portfolio Website
                      </Label>
                      <Input
                        id="portfolioUrl"
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
                      Professional Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience" className="text-sm">
                        Years of Experience *
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="4-6">4-6 years</SelectItem>
                          <SelectItem value="7-10">7-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.experience && <p className="text-xs text-destructive mt-1">{errors.experience}</p>}
                    </div>
                    <div>
                      <Label htmlFor="currentRole" className="text-sm">
                        Current Role *
                      </Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => handleInputChange("currentRole", e.target.value)}
                        placeholder="e.g., Software Engineer"
                        className={errors.currentRole ? "border-destructive" : ""}
                      />
                      {errors.currentRole && <p className="text-xs text-destructive mt-1">{errors.currentRole}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentCompany" className="text-sm">
                        Current Company
                      </Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaryExpectation" className="text-sm">
                        Salary Expectation *
                      </Label>
                      <Input
                        id="salaryExpectation"
                        value={formData.salaryExpectation}
                        onChange={(e) => handleInputChange("salaryExpectation", e.target.value)}
                        placeholder="e.g., $80k - $100k"
                        className={errors.salaryExpectation ? "border-destructive" : ""}
                      />
                      {errors.salaryExpectation && (
                        <p className="text-xs text-destructive mt-1">{errors.salaryExpectation}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availabilityDate" className="text-sm">
                      Availability Date *
                    </Label>
                    <Input
                      id="availabilityDate"
                      type="date"
                      value={formData.availabilityDate}
                      onChange={(e) => handleInputChange("availabilityDate", e.target.value)}
                      className={errors.availabilityDate ? "border-destructive" : ""}
                    />
                    {errors.availabilityDate && (
                      <p className="text-xs text-destructive mt-1">{errors.availabilityDate}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm">Skills & Technologies *</Label>
                    <div className="mt-2 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {skillOptions.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={formData.skills.includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                            />
                            <Label htmlFor={skill} className="text-xs lg:text-sm">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom skill"
                          value={formData.customSkills}
                          onChange={(e) => handleInputChange("customSkills", e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                          className="text-sm"
                        />
                        <Button type="button" variant="outline" onClick={addCustomSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {formData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {formData.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1 text-xs">
                              {skill}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => removeSkill(skill)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}

                      {errors.skills && <p className="text-xs text-destructive">{errors.skills}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Application Details */}
              {currentStep === 3 && (
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
                      Application Details
                    </h3>
                  </div>

                  <div>
                    <Label htmlFor="whyInterested" className="text-sm">
                      Why are you interested in this position? *
                    </Label>
                    <Textarea
                      id="whyInterested"
                      placeholder="Tell us what excites you about this role and company..."
                      value={formData.whyInterested}
                      onChange={(e) => handleInputChange("whyInterested", e.target.value)}
                      rows={3}
                      className={`text-sm ${errors.whyInterested ? "border-destructive" : ""}`}
                    />
                    {errors.whyInterested && <p className="text-xs text-destructive mt-1">{errors.whyInterested}</p>}
                  </div>

                  <div>
                    <Label htmlFor="coverLetter" className="text-sm">
                      Cover Letter *
                    </Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Tell us about your experience and why you're a great fit..."
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                      rows={4}
                      className={`text-sm ${errors.coverLetter ? "border-destructive" : ""}`}
                    />
                    {errors.coverLetter && <p className="text-xs text-destructive mt-1">{errors.coverLetter}</p>}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="resume" className="text-sm">
                        Resume *
                      </Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 lg:p-6 text-center hover:border-primary transition-colors cursor-pointer ${errors.resume ? "border-destructive" : "border-border"
                          }`}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                      >
                        <Upload className="mx-auto h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground mb-2" />
                        <p className="text-xs lg:text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                        <Input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => handleFileUpload("resume", e.target.files?.[0] || null)}
                        />
                        {formData.resume && (
                          <p className="text-xs text-foreground mt-2">Selected: {formData.resume.name}</p>
                        )}
                      </div>
                      {errors.resume && <p className="text-xs text-destructive mt-1">{errors.resume}</p>}
                    </div>

                    <div>
                      <Label htmlFor="portfolio" className="text-sm">
                        Portfolio (Optional)
                      </Label>
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-4 lg:p-6 text-center hover:border-primary transition-colors cursor-pointer"
                        onClick={() => document.getElementById('portfolio-upload')?.click()}
                      >
                        <Upload className="mx-auto h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground mb-2" />
                        <p className="text-xs lg:text-sm text-muted-foreground mb-2">
                          Upload portfolio or work samples
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, ZIP (max 10MB)</p>
                        <Input
                          id="portfolio-upload"
                          type="file"
                          accept=".pdf,.zip"
                          className="hidden"
                          onChange={(e) => handleFileUpload("portfolio", e.target.files?.[0] || null)}
                        />
                        {formData.portfolio && (
                          <p className="text-xs text-foreground mt-2">Selected: {formData.portfolio.name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Work Preferences</Label>
                    <div className="mt-2 space-y-4">
                      <div>
                        <Label htmlFor="remoteWork" className="text-sm">
                          Remote Work Preference
                        </Label>
                        <Select
                          value={formData.remoteWork}
                          onValueChange={(value) => handleInputChange("remoteWork", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remote">Remote only</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="onsite">On-site only</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="relocate"
                            checked={formData.relocate}
                            onCheckedChange={(checked) => handleInputChange("relocate", checked as boolean)}
                          />
                          <Label htmlFor="relocate" className="text-sm">
                            I am willing to relocate for this position
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="references"
                            checked={formData.references}
                            onCheckedChange={(checked) => handleInputChange("references", checked as boolean)}
                          />
                          <Label htmlFor="references" className="text-sm">
                            I can provide professional references upon request
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 lg:pt-6 border-t border-border">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2 bg-transparent w-full sm:w-auto"
                      size="sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    size="sm"
                    className="order-2 sm:order-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 order-1 sm:order-2"
                      size="sm"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} size="sm" className="order-1 sm:order-2">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
