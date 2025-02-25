import { formatRupee } from "@/utils/customText";
import React, { useState } from "react";
import { DateRangeSelector } from "../DateRangeSelector";
import {
  Legend,
  XAxis,
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { FaChartArea, FaChartBar, FaChartPie } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import { FaShareAlt } from "react-icons/fa";
import { Button } from "../Button";
import { BsSendFill } from "react-icons/bs";
import { color, color2 } from "@/data/wrapperData";

export default function Dashboard() {
  const [monthTab, setMonthTab] = useState("daily");

  return (
    <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* col-span-1  */}
      <div className="col-span-1 gap-3 rounded-lg text-sm md:col-span-1">
        {/* row 1  */}
        <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3 text-center md:grid-cols-2">
          <div className="col-span-1 rounded-lg bg-gray-200 p-2 text-blue-800">
            <p>CURRENT BALANCE</p>
            <p className="text-2xl font-bold">INR {formatRupee(1500)}</p>
          </div>
          <div className="col-span-1 rounded-lg bg-blue-900 p-2 text-white">
            <p>TOTAL EARNED</p>
            <p className="text-2xl font-bold">INR {formatRupee(2500)}</p>
          </div>
        </div>
        {/* row 2  */}
        <div className="rounded-lg bg-white p-3">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-lg font-semibold">Return</h2>
            <DateRangeSelector />
          </div>
          <div>
            <ReturnBarChart data={chartData} />
          </div>
        </div>
        {/* row 3  */}
        <div className="rounded-lg bg-white p-3">
          <h2 className="text-lg font-semibold">Today&apos;s Sales</h2>
          <p className="text-zinc-500">Sales Summery</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <SaleCard
              icon={<FaChartArea />}
              text="Total Sales"
              value={2500}
              color="bg-red-500"
            />
            <SaleCard
              icon={<FaChartBar />}
              text="Total Order"
              value={5}
              color="bg-orange-500"
            />
            <SaleCard
              icon={<FaChartPie />}
              text="Product Sold"
              value={2}
              color="bg-green-500"
            />
            <SaleCard
              icon={<IoBarChart />}
              text="New Customers"
              value={8}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
      {/* col-span-2  */}
      <div className="col-span-1 space-y-5 rounded-lg text-sm md:col-span-2">
        {/* row 1 */}
        <div className="rounded-lg bg-white p-3">
          <h2 className="mb-2 text-lg font-semibold">Your referral link</h2>
          <ReferralLink referralLink="https://talentkaksha.com/referral?code=XYZ123" />
        </div>
        {/* row 2 */}
        <div className="space-y-3 rounded-lg bg-white p-3">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="mb-2 text-lg font-semibold">Sales Analytics</h2>
            <ul className="flex text-lg">
              {["daily", "weekly", "monthly", "yearly"].map((item, index) => (
                <li
                  key={index}
                  onClick={() => setMonthTab(item)}
                  className={`cursor-pointer rounded-lg px-3 py-1 capitalize ${monthTab === item && "bg-blue-900 text-white"}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <SalesAnalytics data={chartData} />
          </div>
        </div>
        {/* row 3 */}
        <div className="space-y-3 rounded-lg bg-white p-3">
          <h2 className="mb-2 text-lg font-semibold">Top Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-zinc-500">
                  <th className="p-2 md:p-4">#</th>
                  <th className="p-2 md:p-4">Name</th>
                  <th className="p-2 md:p-4">Popularity</th>
                  <th className="p-2 md:p-4">Sales</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 md:p-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="p-2 md:p-4">{course.name}</td>
                    <td className="p-2 md:p-4">
                      <div className="h-1.5 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-1.5 rounded-full ${color2[index % color.length]}`}
                          style={{ width: `${course.popularity}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 md:p-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${color[index % color.length]}`}
                      >
                        {course.sales}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* row 4  */}
        <div className="space-y-3 rounded-lg bg-white p-3">
          <h2 className="mb-2 text-lg font-semibold">Invite people</h2>
          <InvitePeopleForm />
        </div>
      </div>
    </div>
  );
}

function ReturnBarChart({ data }: any) {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={480}
          height={300}
          data={data}
          className="rounded-2xl"
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}`} />
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
          <Bar dataKey="Return" stackId="a" fill="#f26925" />
          {/* <Bar dataKey="Exams" stackId="a" fill="#cbe9ff" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

function SaleCard({ icon, text, value, color }: any) {
  return (
    <div className={`rounded-xl ${color} bg-opacity-20 p-3`}>
      <div
        className={`rounded-full p-3 text-white ${color} mb-3 h-min w-min text-2xl`}
      >
        {icon}
      </div>
      <h1 className="text-xl font-bold">INR {formatRupee(value)}</h1>
      <p className="capitalize text-zinc-500">{text}</p>
    </div>
  );
}

const ReferralLink = ({ referralLink }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Talent Kaksha Referral",
          text: "Join Talent Kaksha using my referral link!",
          url: referralLink,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      handleCopy(); // Fallback to copying if Web Share is unavailable
    }
  };

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="w-full bg-transparent text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="ml-4 text-gray-600 hover:scale-90 hover:text-gray-800 focus:outline-none"
          >
            <FiCopy className="text-xl" />
          </button>
        </div>
        <Button variant="blue" onClick={handleShare} className="!px-2">
          <FaShareAlt />
        </Button>
      </div>
      {copied && <p className="mt-2 text-green-500">Copied to clipboard!</p>}
    </>
  );
};

function SalesAnalytics({ data }: any) {
  const formatYAxis = (tick: any) => {
    if (tick >= 1000000) {
      return `${tick / 1000000}M`;
    } else if (tick >= 1000) {
      return `${tick / 1000}K`;
    }
    return tick;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C86CEA" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#D17AF2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45} // Rotate X-axis labels to an angle
          textAnchor="end" // Anchor X-axis labels at the end
          interval={0} // Display all labels without skipping
          tick={{ fontSize: 12 }} // Adjust font size of X-axis labels
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={formatYAxis}
          // label={{
          //   value: "Student Joined",
          //   angle: -90,
          //   position: "insideCenter",
          //   className: "custom-y-axis-label",
          // }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Return"
          stroke="#7A4D8B"
          strokeWidth="2"
          fill="url(#colorUv)"
          yAxisId="right"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const InvitePeopleForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Inviting:", email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Address"
        className="flex-grow rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <Button variant="blue" type="submit" className="flex text-nowrap !px-2">
        <span>Send</span>
        <BsSendFill />
      </Button>
    </form>
  );
};

const chartData = [
  { name: "Jan", Return: 24 },
  { name: "Feb", Return: 14 },
  { name: "Mar", Return: 98 },
  { name: "Apr", Return: 39 },
  { name: "May", Return: 48 },
  { name: "Jun", Return: 38 },
  { name: "July", Return: 43 },
  { name: "Aug", Return: 30 },
  { name: "Sep", Return: 43 },
  { name: "Oct", Return: 20 },
  { name: "Nov", Return: 43 },
  { name: "Dec", Return: 10 },
];

const courses = [
  { id: "01", name: "Web development", popularity: 90, sales: 45 },
  { id: "02", name: "UI/UX Complete course", popularity: 85, sales: 29 },
  { id: "03", name: "Graphic design", popularity: 80, sales: 18 },
  { id: "04", name: "React crash course", popularity: 60, sales: 25 },
];
