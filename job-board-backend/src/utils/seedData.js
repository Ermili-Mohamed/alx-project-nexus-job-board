const Job = require('../models/Job');
const Company = require('../models/Company');

const seedJobs = [
 {
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  companyLogo: "/tech-company-logo.jpg",
  category: "Engineering",
  location: "San Francisco, CA",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salaryRange: "$120k - $160k",
  description: "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building user-friendly interfaces and implementing responsive designs.",
  skills: [
   "5+ years React experience",
   "TypeScript proficiency",
   "UI/UX design",
  ],
 },
 {
  title: "Product Manager",
  company: "StartupXYZ",
  companyLogo: "/abstract-startup-logo.png",
  category: "Product",
  location: "New York, NY",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$100k - $130k",
  description: "Join our product team to drive the roadmap and strategy for our core platform. Work closely with engineering and design teams.",
  skills: [
   "3+ years product management",
   "Agile methodology",
   "Data analysis",
  ],
 },
 {
  title: "UX Designer",
  company: "Design Studio",
  companyLogo: "/design-studio-logo.png",
  category: "Design",
  location: "Remote",
  employmentType: "Contract",
  experienceLevel: "Mid-Level",
  salaryRange: "$80k - $100k",
  description: "Create beautiful and intuitive user experiences for our clients. Work on diverse projects across different industries.",
  skills: ["Figma expertise", "User research experience", "Prototyping"],
 },
 {
  title: "Junior Software Engineer",
  company: "GrowthCo",
  companyLogo: "/growth-company-logo.png",
  category: "Engineering",
  location: "Austin, TX",
  employmentType: "Full-time",
  experienceLevel: "Entry",
  salaryRange: "$70k - $90k",
  description: "Perfect opportunity for new graduates to start their career in software development. Work on exciting projects with mentorship.",
  skills: ["JavaScript/TypeScript", "React/Vue.js", "Git version control"],
 },
 {
  title: "Marketing Manager",
  company: "BrandBuilder",
  companyLogo: "/marketing-agency-logo.png",
  category: "Marketing",
  location: "Chicago, IL",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$85k - $110k",
  description: "Lead and execute marketing initiatives to drive brand awareness and customer acquisition. Manage digital marketing campaigns.",
  skills: ["Digital marketing", "Content strategy", "Analytics"],
 },
 {
  title: "Data Scientist",
  company: "DataDriven LLC",
  companyLogo: "/data-science-company-logo.jpg",
  category: "Data",
  location: "Seattle, WA",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salaryRange: "$130k - $170k",
  description: "Applying advanced statistical analysis and machine learning to solve complex business problems. Work with large datasets.",
  skills: ["Python/R", "Machine Learning", "SQL"],
 },
 // Additional jobs
 {
  title: "Backend Developer",
  company: "TechCorp Inc.",
  companyLogo: "/tech-company-logo.jpg",
  category: "Engineering",
  location: "San Francisco, CA",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$100k - $140k",
  description: "Build scalable backend systems and APIs. Work with Node.js, Python, and cloud technologies.",
  skills: ["Node.js", "Python", "AWS", "Database design"],
 },
 {
  title: "DevOps Engineer",
  company: "StartupXYZ",
  companyLogo: "/abstract-startup-logo.png",
  category: "Engineering",
  location: "New York, NY",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salaryRange: "$110k - $150k",
  description: "Manage infrastructure and deployment pipelines. Ensure high availability and performance.",
  skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
 },
 {
  title: "UI Designer",
  company: "Design Studio",
  companyLogo: "/design-studio-logo.png",
  category: "Design",
  location: "Remote",
  employmentType: "Part-time",
  experienceLevel: "Entry",
  salaryRange: "$50k - $70k",
  description: "Create beautiful user interfaces and design systems. Work with design tools and collaborate with developers.",
  skills: ["Figma", "Adobe Creative Suite", "Design systems", "Prototyping"],
 },
 {
  title: "Sales Representative",
  company: "BrandBuilder",
  companyLogo: "/marketing-agency-logo.png",
  category: "Sales",
  location: "Chicago, IL",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$60k - $90k",
  description: "Drive sales growth and build relationships with clients. Meet sales targets and expand market reach.",
  skills: ["Sales strategy", "CRM", "Client relations", "Negotiation"],
 },
 {
  title: "Operations Manager",
  company: "DataDriven LLC",
  companyLogo: "/data-science-company-logo.jpg",
  category: "Operations",
  location: "Seattle, WA",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salaryRange: "$90k - $120k",
  description: "Oversee daily operations and improve efficiency. Manage teams and optimize business processes.",
  skills: ["Process optimization", "Team management", "Project management", "Analytics"],
 },
 {
  title: "Full Stack Developer",
  company: "GrowthCo",
  companyLogo: "/growth-company-logo.png",
  category: "Engineering",
  location: "Austin, TX",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$85k - $120k",
  description: "Develop end-to-end web applications. Work with modern frameworks and cloud technologies.",
  skills: ["React", "Node.js", "MongoDB", "AWS"],
 },
 {
  title: "Content Writer",
  company: "BrandBuilder",
  companyLogo: "/marketing-agency-logo.png",
  category: "Marketing",
  location: "Remote",
  employmentType: "Contract",
  experienceLevel: "Entry",
  salaryRange: "$40k - $60k",
  description: "Create engaging content for blogs, social media, and marketing campaigns. Research and write compelling copy.",
  skills: ["Content writing", "SEO", "Social media", "Research"],
 },
 {
  title: "Machine Learning Engineer",
  company: "DataDriven LLC",
  companyLogo: "/data-science-company-logo.jpg",
  category: "Data",
  location: "Seattle, WA",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salaryRange: "$140k - $180k",
  description: "Build and deploy machine learning models. Work with large datasets and cloud ML platforms.",
  skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
 },
 {
  title: "Customer Success Manager",
  company: "StartupXYZ",
  companyLogo: "/abstract-startup-logo.png",
  category: "Operations",
  location: "New York, NY",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$70k - $100k",
  description: "Ensure customer satisfaction and retention. Build relationships and drive product adoption.",
  skills: ["Customer relations", "Product knowledge", "Analytics", "Communication"],
 },
 {
  title: "QA Engineer",
  company: "TechCorp Inc.",
  companyLogo: "/tech-company-logo.jpg",
  category: "Engineering",
  location: "San Francisco, CA",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  salaryRange: "$80k - $110k",
  description: "Ensure software quality through testing and automation. Develop test strategies and maintain quality standards.",
  skills: ["Test automation", "Selenium", "API testing", "Quality assurance"],
 },
];

const seedCompanies = [
 {
  name: "TechCorp Inc.",
  email: "hr@techcorp.com",
  password: "password123",
  location: "San Francisco, CA",
  description: "Leading technology company focused on innovation",
  website: "https://techcorp.com",
  industry: "Technology",
  size: "large",
  isVerified: true
 },
 {
  name: "StartupXYZ",
  email: "jobs@startupxyz.com",
  password: "password123",
  location: "New York, NY",
  description: "Fast-growing startup in the fintech space",
  website: "https://startupxyz.com",
  industry: "Fintech",
  size: "startup",
  isVerified: true
 },
 {
  name: "Design Studio",
  email: "careers@designstudio.com",
  password: "password123",
  location: "Remote",
  description: "Creative design agency specializing in UX/UI",
  website: "https://designstudio.com",
  industry: "Design",
  size: "small",
  isVerified: true
 },
 {
  name: "GrowthCo",
  email: "careers@growthco.com",
  password: "password123",
  location: "Austin, TX",
  description: "Growing tech company focused on scaling solutions",
  website: "https://growthco.com",
  industry: "Technology",
  size: "medium",
  isVerified: true
 },
 {
  name: "BrandBuilder",
  email: "jobs@brandbuilder.com",
  password: "password123",
  location: "Chicago, IL",
  description: "Marketing agency helping brands grow and succeed",
  website: "https://brandbuilder.com",
  industry: "Marketing",
  size: "small",
  isVerified: true
 },
 {
  name: "DataDriven LLC",
  email: "careers@datadriven.com",
  password: "password123",
  location: "Seattle, WA",
  description: "Data science company providing analytics solutions",
  website: "https://datadriven.com",
  industry: "Data Science",
  size: "medium",
  isVerified: true
 }
];

const seedDatabase = async () => {
 try {
  // Clear existing data
  await Job.deleteMany({});
  await Company.deleteMany({});

  // Create companies
  const companies = await Company.insertMany(seedCompanies);
  console.log('Companies seeded successfully');

  // Add company IDs to jobs
  const jobsWithCompanies = seedJobs.map((job, index) => ({
   ...job,
   companyId: companies[index % companies.length]._id
  }));

  // Create jobs
  const jobs = await Job.insertMany(jobsWithCompanies);
  console.log('Jobs seeded successfully');

  console.log('Database seeded successfully!');
  console.log(`Created ${companies.length} companies and ${jobs.length} jobs`);
 } catch (error) {
  console.error('Error seeding database:', error);
 }
};

module.exports = seedDatabase;

