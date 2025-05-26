import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { Heading } from "@/components/heading";
import { Input, InputGroup } from "@/components/input";
import { Link } from "@/components/link";
import { Select } from "@/components/select";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

// Simulated data fetch for jobs (replace with actual API call)
const getJobs = async () => {
  return [
    {
      id: 1,
      title: "Lead Full Stack Engineer",
      company: "SWATX",
      location: "Nairobi, Kenya",
      postedAt: "2025-03-25",
      status: "Applied",
      appliedDate: "2025-05-25", // Today
      url: "/jobs/1",
      logoUrl: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1745674275/Logo_Icon_Colored_qrttig.jpg",
    },
    {
      id: 2,
      title: "Junior Frontend Developer",
      company: "Cazini Ai",
      location: "Nairobi, Kenya",
      postedAt: "2025-04-15",
      status: "Interview",
      appliedDate: "2025-05-20",
      url: "/jobs/2",
      logoUrl: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1745674275/Logo_Icon_Colored_qrttig.jpg",
    },
  ];
};

export const metadata = {
  title: "Jobs",
};

export default async function Jobs() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="w-full md:w-auto">
          <Heading className="text-3xl font-bold text-gray-900">Job Applications</Heading>
          <p className="text-sm text-gray-600 mt-1">Manage and track your job applications.</p>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <InputGroup className="w-full">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <Input
                name="search"
                placeholder="Search jobs…"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </InputGroup>
          </div>
          <Select
            name="sort_by"
            className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="title">Sort by title</option>
            <option value="date">Sort by application date</option>
            <option value="status">Sort by status</option>
          </Select>
          <Button className="w-full md:w-auto bg-emerald-600 text-white hover:bg-emerald-700">
            Apply to Job
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="grid gap-6">
        {jobs.map((job) => {
          const isAppliedToday = new Date(job.appliedDate).toISOString().split("T")[0] === "2025-05-25";
          const postedDate = new Date(job.postedAt);
          const now = new Date();
          const monthsAgo = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24 * 30));

          return (
            <div
              key={job.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 shrink-0">
                  <Link href={job.url} aria-label={`${job.title} at ${job.company}`}>
                    <img
                      className="w-full h-full object-contain rounded-md"
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                    />
                  </Link>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-gray-900">
                    <Link href={job.url} className="hover:text-emerald-600">
                      {job.title}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600">
                    {job.company} · {job.location}
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted {monthsAgo === 0 ? "less than a month" : `${monthsAgo} month${monthsAgo > 1 ? "s" : ""}`} ago
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                <Badge
                  className="text-xs px-2 py-1"
                  color={job.status === "Applied" ? "lime" : job.status === "Interview" ? "blue" : "gray"}
                >
                  {job.status}
                </Badge>
                {isAppliedToday && (
                  <Badge color="green" className="text-xs px-2 py-1">
                    Applied today
                  </Badge>
                )}
                <Dropdown>
                  <DropdownButton
                    plain
                    aria-label={`More options for ${job.title}`}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={job.url}>View</DropdownItem>
                    <DropdownItem>Withdraw</DropdownItem>
                    <DropdownItem className="text-red-600">Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}