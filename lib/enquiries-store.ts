import clientPromise from "./mongodb";

export interface SystemEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  interest: string;
  message: string;
  createdAt: string;
  status?: string;
  updatedAt?: string;
}

export async function getAllEnquiries(): Promise<SystemEnquiry[]> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("enquiries");
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return docs.map((doc) => ({
      id: doc.id || doc._id.toString(),
      name: doc.name || "",
      email: doc.email || "",
      phone: doc.phone || "",
      businessType: doc.businessType || doc.company || "",
      interest: doc.interest || doc.service || "",
      message: doc.message || "",
      status: doc.status || "New",
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    })) as SystemEnquiry[];
  } catch (error) {
    console.error("Error reading enquiries data from MongoDB:", error);
    return [];
  }
}

export async function saveEnquiry(newEntry: Omit<SystemEnquiry, "id" | "createdAt">): Promise<SystemEnquiry> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("enquiries");

  // Get next sequential ID number based on document count in MongoDB
  const totalCount = await collection.countDocuments();
  const nextIdNumber = 1000 + totalCount + 1;
  const id = `ENQ-${nextIdNumber}`;
  const now = new Date();

  // Construct MongoDB document
  const document = {
    id,
    name: newEntry.name,
    email: newEntry.email,
    phone: newEntry.phone,
    businessType: newEntry.businessType,
    company: newEntry.businessType, // map to company
    interest: newEntry.interest,
    service: newEntry.interest, // map to service
    message: newEntry.message,
    status: "New",
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(document);

  return {
    ...newEntry,
    id,
    status: "New",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

export interface MonthlyChartPoint {
  month: string; // "Jan", "Feb", etc.
  shortName: string;
  count: number;
}

export async function getMonthlyEnquiriesChartData(): Promise<MonthlyChartPoint[]> {
  const enquiries = await getAllEnquiries();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

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

  return monthNames.map((name, idx) => ({
    month: name,
    shortName: name,
    count: monthCounts[idx] || 0,
  }));
}
