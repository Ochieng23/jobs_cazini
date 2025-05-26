
"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Link } from "@/components/Link";
import { useSession } from "@/contexts/SessionContext";
import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import {
  ArrowRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  Square2StackIcon,
} from "@heroicons/react/20/solid";
import { Logo } from "../logo";

// Dummy data — replace with API data when ready
const JOBS = [
  {
    id: 1,
    title: "Physical & Functional Rehabilitation Project Manager – Sudan",
    company: "Handicap International",
    logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462923/Equity_Group_Logo_dkhhwx.png",
    location: "Nairobi, Nairobi County, Kenya",
    mode: "On-site",
    department: "Rehabilitation",
    posted: 3,
    employmentType: "Full-time",
  },
  {
    id: 2,
    title: "International Humanitarian Law & Protection of Civilians Advisor",
    company: "ARK Group",
    logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462859/SAF-MAIN-LOGO_tgxefr.png",
    location: "Nairobi, Nairobi County, Kenya",
    mode: "On-site",
    department: "Legal",
    posted: 3,
    employmentType: "Full-time",
  },
  {
    id: 3,
    title: "Junior Paid Media Manager",
    company: "Welcome Tomorrow",
    logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462924/LOreal-Logo_eezhos.png",
    location: "Nairobi, Nairobi County, Kenya",
    mode: "Hybrid",
    department: "Performance",
    posted: 4,
    employmentType: "Full-time",
  },
  {
    id: 4,
    title: "Global People & Culture Partner",
    company: "Trócaire",
    logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742463030/Gucci-Logo.wine_dt8kzk.png",
    location: "Nairobi, Nairobi County, Kenya",
    mode: "Hybrid",
    department: "HR",
    posted: 5,
    employmentType: "Full-time",
  },
];

function JobCard({ title, company, logo, location, mode, department, posted, employmentType }) {
  return (
    <div className="flex px-4 gap-4 border-b border-gray-100 py-4 sm:py-6 last:border-none hover:bg-gray-50 transition-colors">
      <Image src={logo} alt={`${company} logo`} width={40} height={40} className="rounded object-contain sm:w-12 sm:h-12" />
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-emerald-700 hover:underline cursor-pointer line-clamp-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1">
          {company} • {mode} • {location} • {department}
        </p>
        <p className="text-xs text-gray-500 mt-1">Posted {posted} days ago • {employmentType}</p>
      </div>
    </div>
  );
}

function AccountDropdownMenu({ anchor }) {
  const { logout } = useSession();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu className="w-64 min-w-[16rem] max-w-[90vw]" anchor={anchor}>
      <DropdownItem href="/profile">
        <HomeIcon />
        <DropdownLabel>My Profile</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="/applications">
        <Square2StackIcon />
        <DropdownLabel>Applications</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="/settings">
        <Cog6ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleLogout}>
        <ArrowRightIcon />
        <DropdownLabel>Logout</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export default function JobHome() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Nairobi, Kenya");
  const { session } = useSession();

  const filtered = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return term ? JOBS.filter((j) => j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term)) : JOBS;
  }, [keyword]);

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cyan-950 px-4 py-12 text-white sm:px-6 md:px-12 sm:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dhz4c0oae/image/upload/v1745921616/iStock-1298224689_dyhvni.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            quality={75}
            priority
          />
          <div className="absolute inset-0 bg-cyan-950/70" />
        </div>
        <div className="absolute top-8 left-3/4 w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-48">
          <Image
            src="https://res.cloudinary.com/dhz4c0oae/image/upload/v1745921521/iStock-693280570_gsruqr.jpg"
            alt="Overlay image 1"
            fill
            className="object-cover rounded-full border-4 border-emerald-600/50 shadow-lg"
            quality={75}
          />
        </div>
        <div className="absolute bottom-8 right-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36">
          <Image
            src="https://res.cloudinary.com/dhz4c0oae/image/upload/v1745921618/iStock-1459061852_xdmn1v.jpg"
            alt="Overlay image 2"
            fill
            className="object-cover rounded-full border-4 border-amber-400/50 shadow-lg"
            quality={75}
          />
        </div>
        <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28">
          <Image
            src="https://res.cloudinary.com/dhz4c0oae/image/upload/v1745921624/iStock-1412652081_zcotrt.jpg"
            alt="Overlay image 3"
            fill
            className="object-cover rounded-full border-4 border-cyan-500/50 shadow-lg"
            quality={75}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8 md:grid md:grid-cols-2 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <Logo
                alt="Cazini"
                
                className="sm:w-10 sm:h-10"
              />
              <span className="text-lg sm:text-xl font-bold tracking-wide">
                JOBS <span className="font-normal">BY</span> CAZINI
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Find a job with Cazini</h1>
            <p className="text-base sm:text-lg text-slate-200">
              Search thousands of job openings from global companies hiring now. Remote or office-based, your perfect job
              could be waiting.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:px-4 sm:py-3"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:px-4 sm:py-3"
              />
              <button className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors sm:px-4 sm:py-3 sm:text-base">
                Search jobs
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-300">
              <span className="text-slate-400">Popular searches:</span>
              {["Finance", "Accounting", "Data", "Accountant", "Customer Service"].map((term) => (
                <button
                  key={term}
                  onClick={() => setKeyword(term)}
                  className="text-emerald-300 hover:underline"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Account/Login Button */}
        <div className="absolute top-3  right-3 z-20 sm:top-4 sm:right-4">
          {session?.user?.id ? (
            <Dropdown>
              <DropdownButton className="p-0">
                <Avatar
                  initials={`${session.user.firstname?.[0] || ''}${session.user.lastname?.[0] || ''}`}
                  className="size-8 bg-emerald-600 text-white rounded-full"
                />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors sm:px-4 sm:py-2 sm:text-sm"
              aria-label="Go to login"
            >
              Login
            </Link>
          )}
        </div>
      </section>

      {/* Jobs Section */}
      <section className="mx-auto flex-1 w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <h2 className="mb-4 text-lg sm:text-xl md:text-2xl font-semibold text-black">
          Latest jobs <span className="text-emerald-700">near you</span>
        </h2>
        <div className="divide-y divide-gray-100 rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
          {filtered.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
          <div className="flex flex-col sm:flex-row items-start gap-4 bg-violet-50 px-4 py-4 sm:px-6 sm:py-6">
            <div className="rounded-md bg-white p-2 ring-1 ring-violet-200">
              <span className="text-lg sm:text-xl text-violet-600">✨</span>
            </div>
            <div className="flex-1">
              <h3 className="mb-1 flex items-center gap-1 font-semibold text-violet-700 text-sm sm:text-base">
                Job recommendations <span className="ml-1 rounded bg-violet-100 px-2 py-0.5 text-xs">For you</span>
              </h3>
              <p className="text-xs sm:text-sm text-violet-900/90">
                Fill in your profile to get suggestions based on your skills and experience.
              </p>
            </div>
            <button className="shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium text-violet-700 hover:underline">
              Add your experience or education
            </button>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button className="rounded-md border border-emerald-700 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-700 hover:text-white transition-colors sm:px-6 sm:py-3 sm:text-base">
            Show more jobs
          </button>
        </div>
      </section>

      {/* Employer Section */}
      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 md:px-12 sm:py-20">
        <span className="absolute left-1/4 top-8 h-12 w-12 rounded-full bg-amber-400 opacity-70 sm:h-16 sm:w-16" />
        <span className="absolute right-1/3 bottom-4 h-8 w-8 rounded-full bg-cyan-500 opacity-70 sm:h-10 sm:w-10" />
        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Are you an employer?</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-600">
            Cazini has helped thousands of companies hire more than 1.5 million people with its world-leading software.
            Discover how Cazini can help your business.
          </p>
          <Link
            href="https://cazini.ai/"
            className="inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors sm:px-6 sm:py-3 sm:text-base"
          >
            Post a Job
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-950 px-4 py-8 text-white sm:px-6 md:px-12 sm:py-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Logo
              alt="Cazini logo"
             
              className="sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold tracking-wide">
              JOBS <span className="font-normal">BY</span> CAZINI
            </span>
          </div>
          <hr className="border-cyan-800" />
          <div className="flex flex-col gap-4 text-cyan-300 text-xs sm:text-sm md:flex-row md:justify-between">
            <p>© Cazini Technology Limited 2025</p>
            <nav className="flex flex-wrap gap-3 sm:gap-4">
              {["Terms & Conditions", "Privacy Policy", "Cookie Settings", "Need Help?"].map((link) => (
                <a key={link} href="#" className="hover:text-white whitespace-nowrap">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* Feedback Button */}
      <button className="fixed right-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right bg-cyan-700 px-2 py-1 text-xs text-white rounded-t-md shadow-lg hover:bg-cyan-800 focus:outline-none sm:px-3 sm:py-2 sm:text-sm">
        Feedback
      </button>
    </main>
  );
}
