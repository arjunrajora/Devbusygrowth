import fs from "fs";
import path from "path";

export interface SystemEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  interest: string;
  message: string;
  createdAt: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "enquiries.json");

export function getAllEnquiries(): SystemEnquiry[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(content) as SystemEnquiry[];
  } catch (error) {
    console.error("Error reading enquiries data:", error);
    return [];
  }
}

export function saveEnquiry(newEntry: Omit<SystemEnquiry, "id" | "createdAt">): SystemEnquiry {
  const currentEnquiries = getAllEnquiries();
  const nextIdNumber = 1000 + currentEnquiries.length + 1;
  const createdRecord: SystemEnquiry = {
    ...newEntry,
    id: `ENQ-${nextIdNumber}`,
    createdAt: new Date().toISOString(),
  };

  const updatedList = [createdRecord, ...currentEnquiries];

  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing enquiry data:", error);
  }

  return createdRecord;
}

export interface MonthlyChartPoint {
  month: string; // "Jan", "Feb", etc.
  shortName: string;
  count: number;
}

export function getMonthlyEnquiriesChartData(): MonthlyChartPoint[] {
  const enquiries = getAllEnquiries();
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Initialize counts for months Jan to Dec
  const monthCounts: Record<number, number> = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0
  };

  enquiries.forEach((item) => {
    if (item.createdAt) {
      const dateObj = new Date(item.createdAt);
      if (!isNaN(dateObj.getTime())) {
        const monthIndex = dateObj.getMonth();
        monthCounts[monthIndex] = (monthCounts[monthIndex] || 0) + 1;
      }
    }
  });

  // Current year month list (up to current month or full year)
  const currentMonthIndex = new Date().getMonth(); // 7 for Aug

  return monthNames.map((name, idx) => ({
    month: name,
    shortName: name,
    count: monthCounts[idx] || 0,
  }));
}
