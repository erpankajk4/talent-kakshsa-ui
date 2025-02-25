import { headerLogo } from "@/assets";

export const jobPost = {
  id: "job1234",
  title: "Frontend Developer",
  company: {
    name: "Tech Innovators Ltd.",
    website: "https://www.techinnovators.com",
    logo: "https://www.techinnovators.com/logo.png",
    description:
      "Uniform Application is a web platform that simplifies the school admission process for parents and helps them in finding the right school for their children from the comfort of their homes. At Edunify, we are creating India's largest education marketing ecosystem. Our web platform, Uniform Application, is India's largest school discovery and admissions platform that helps lakhs of parents every month find verified information about 1.2 lakh schools across India. We provide expert guidance to parents about the right schools for their children and help them apply for admission. We work with some of the best and most premium schools in the country like La Martiniere College, The Asian School, Lucknow Public Schools, and many others. We are looking for highly passionate individuals who love their work and have been champions at what they do.",
  },
  location: {
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    isRemote: true,
  },
  employmentType: "Full-time",
  salaryRange: {
    min: 6, // Minimum salary in LPA
    max: 12, // Maximum salary in LPA
  },
  jobProfile: "Software Engineering",
  description:
    "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building responsive and high-performance web applications using modern technologies.",
  AboutJob: [
    "Working on live projects and state-of-the-art web products at the forefront of the education industry",
    "Working on database management and operations",
    " Develop and maintain web applications using React and Next.js.",
    "Collaborate with cross-functional teams to translate designs and wireframes into high-quality code.",
    "Optimize applications for maximum speed and scalability.",
    "Ensure the technical feasibility of UI/UX designs.",
  ],
  responsibilities: [
    "Develop and maintain web applications using React.js",
    "Collaborate with backend engineers to integrate APIs",
    "Write clean, maintainable, and efficient code",
    "Ensure the technical feasibility of UI/UX designs",
  ],
  requirements: {
    experience: 2, // Required years of experience
    skills: [
      "JavaScript",
      "React.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "TypeScript",
    ],
    qualifications: ["Bachelor's degree in Computer Science or related field"],
  },
  postedDate: "2024-09-10",
  applicationDeadline: "2024-09-30",
  contactInfo: {
    email: "hr@techinnovators.com",
    phone: "+91 9876543210",
  },
  additionalInfo:
    "We offer flexible working hours, health insurance, and opportunities for professional growth.",
  jobStatus: "open",
  isPartTime: false,
  isFullTime: true,
  isRemote: true,
  isHybrid: false,
  isOffice: true,
  isFeatured: true,
  startDate: "Immediately",
  jobPostDate: "2024-09-10",
  noOfOpening: 5,
  experienceRequired: {
    min: 2,
    max: 6,
  },
};

export const company = {
  id: 1,
  name: "Tech Innovators Pvt. Ltd.",
  logoUrl: headerLogo,
  industry: "Information Technology",
  companySize: "51-200 employees",
  website: "https://www.talentkaksha.com",
  establishedYear: 2012,
  headquarters: {
    city: "Bangalore",
    state: "Karnataka",
    country: "India"
  },
  noOfOpening:33,
  description:
    "Tech Innovators Pvt. Ltd. is a leading software development company specializing in AI and machine learning solutions. We are committed to delivering innovative technology solutions to businesses worldwide.",
  locations: [
    {
      city: "Bangalore",
      state: "Karnataka",
      country: "India"
    },
    {
      city: "Delhi",
      state: "Delhi",
      country: "India"
    }
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/company/tech-innovators",
    facebook: "https://facebook.com/techinnovators",
    twitter: "https://twitter.com/techinnovators"
  },
  employeeCount: 50,
  candidatesHired: 10,
  industryType: "IT/ Technology",
};
