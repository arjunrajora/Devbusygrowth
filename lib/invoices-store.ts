import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

export interface SystemInvoice {
  _id?: string;
  id: string;
  title?: string;
  invoiceNumber: string;
  userName: string;
  mobile: string;
  email: string;
  invoiceDate: string;
  dueDate?: string;
  description: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  status?: "active" | "disabled";
  pdfFile?: string;
  emailSent: boolean;
  emailSentAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAllInvoices(options?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ invoices: SystemInvoice[]; total: number; page: number; totalPages: number }> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    const search = options?.search?.trim() || "";
    const page = Math.max(1, options?.page || 1);
    const limit = Math.max(1, options?.limit || 50);
    const skip = (page - 1) * limit;

    let filter: any = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter = {
        $or: [
          { invoiceNumber: regex },
          { userName: regex },
          { mobile: regex },
          { email: regex },
          { description: regex },
          { title: regex },
          { status: regex },
        ],
      };
    }

    const total = await collection.countDocuments(filter);
    const docs = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const invoices: SystemInvoice[] = docs.map((doc) => {
      const idStr = doc._id ? doc._id.toString() : doc.id || "";
      return {
        _id: idStr,
        id: idStr,
        title: doc.title || doc.billTitle || doc.invoiceTitle || "TAX INVOICE",
        invoiceNumber: doc.invoiceNumber || "",
        userName: doc.userName || "",
        mobile: doc.mobile || "",
        email: doc.email || "",
        invoiceDate: doc.invoiceDate ? new Date(doc.invoiceDate).toISOString().split("T")[0] : "",
        dueDate: doc.dueDate ? new Date(doc.dueDate).toISOString().split("T")[0] : undefined,
        description: doc.description || "",
        totalAmount: typeof doc.totalAmount === "number" ? doc.totalAmount : parseFloat(doc.totalAmount || 0),
        advanceAmount: typeof doc.advanceAmount === "number" ? doc.advanceAmount : parseFloat(doc.advanceAmount || 0),
        remainingAmount: typeof doc.remainingAmount === "number" ? doc.remainingAmount : parseFloat(doc.remainingAmount || 0),
        status: doc.status === "disabled" ? "disabled" : "active",
        pdfFile: doc.pdfFile || undefined,
        emailSent: Boolean(doc.emailSent),
        emailSentAt: doc.emailSentAt ? new Date(doc.emailSentAt).toISOString() : undefined,
        createdBy: doc.createdBy || "Admin",
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
      };
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      invoices,
      total,
      page,
      totalPages,
    };
  } catch (error) {
    console.error("Error reading invoices from MongoDB:", error);
    return { invoices: [], total: 0, page: 1, totalPages: 1 };
  }
}

export async function getInvoiceById(id: string): Promise<SystemInvoice | null> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    let query: any = { invoiceNumber: id };

    if (ObjectId.isValid(id)) {
      query = {
        $or: [{ _id: new ObjectId(id) }, { invoiceNumber: id }, { id: id }],
      };
    }

    const doc = await collection.findOne(query);
    if (!doc) return null;

    const idStr = doc._id ? doc._id.toString() : doc.id || "";
    return {
      _id: idStr,
      id: idStr,
      title: doc.title || doc.billTitle || doc.invoiceTitle || "TAX INVOICE",
      invoiceNumber: doc.invoiceNumber || "",
      userName: doc.userName || "",
      mobile: doc.mobile || "",
      email: doc.email || "",
      invoiceDate: doc.invoiceDate ? new Date(doc.invoiceDate).toISOString().split("T")[0] : "",
      dueDate: doc.dueDate ? new Date(doc.dueDate).toISOString().split("T")[0] : undefined,
      description: doc.description || "",
      totalAmount: typeof doc.totalAmount === "number" ? doc.totalAmount : parseFloat(doc.totalAmount || 0),
      advanceAmount: typeof doc.advanceAmount === "number" ? doc.advanceAmount : parseFloat(doc.advanceAmount || 0),
      remainingAmount: typeof doc.remainingAmount === "number" ? doc.remainingAmount : parseFloat(doc.remainingAmount || 0),
      status: doc.status === "disabled" ? "disabled" : "active",
      pdfFile: doc.pdfFile || undefined,
      emailSent: Boolean(doc.emailSent),
      emailSentAt: doc.emailSentAt ? new Date(doc.emailSentAt).toISOString() : undefined,
      createdBy: doc.createdBy || "Admin",
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error reading invoice ${id} from MongoDB:`, error);
    return null;
  }
}

export async function generateNextInvoiceNumber(): Promise<string> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    const totalCount = await collection.countDocuments();
    const nextNumber = 1001 + totalCount;
    let candidate = `BG-INV-${nextNumber}`;

    // Ensure candidate is strictly unique
    let exists = await collection.findOne({ invoiceNumber: candidate });
    let counter = nextNumber;

    while (exists) {
      counter++;
      candidate = `BG-INV-${counter}`;
      exists = await collection.findOne({ invoiceNumber: candidate });
    }

    return candidate;
  } catch (error) {
    console.error("Error generating invoice number:", error);
    return `BG-INV-${Date.now().toString().slice(-4)}`;
  }
}

export async function isInvoiceNumberUnique(invoiceNumber: string, excludeId?: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    const query: any = { invoiceNumber: invoiceNumber.trim() };
    if (excludeId && ObjectId.isValid(excludeId)) {
      query._id = { $ne: new ObjectId(excludeId) };
    }

    const doc = await collection.findOne(query);
    return !doc;
  } catch (error) {
    console.error("Error checking invoice number uniqueness:", error);
    return true;
  }
}

export async function saveInvoice(data: {
  title?: string;
  invoiceNumber: string;
  userName: string;
  mobile: string;
  email: string;
  invoiceDate: string;
  dueDate?: string;
  description: string;
  totalAmount: number;
  advanceAmount: number;
  status?: "active" | "disabled";
  createdBy?: string;
}): Promise<SystemInvoice> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("invoices");

  const totalAmount = typeof data.totalAmount === "number" ? data.totalAmount : parseFloat(data.totalAmount);
  const advanceAmount = typeof data.advanceAmount === "number" ? data.advanceAmount : parseFloat(data.advanceAmount);
  const remainingAmount = totalAmount - advanceAmount;
  const title = data.title && data.title.trim() ? data.title.trim() : "TAX INVOICE";
  const status = data.status === "disabled" ? "disabled" : "active";

  const now = new Date();
  const doc = {
    title,
    invoiceNumber: data.invoiceNumber.trim(),
    userName: data.userName.trim(),
    mobile: data.mobile.trim(),
    email: data.email.trim().toLowerCase(),
    invoiceDate: new Date(data.invoiceDate),
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(data.invoiceDate),
    description: data.description.trim(),
    totalAmount,
    advanceAmount,
    remainingAmount,
    status,
    emailSent: false,
    emailSentAt: null,
    createdBy: data.createdBy || "Admin",
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(doc);
  const insertedId = result.insertedId.toString();

  return {
    _id: insertedId,
    id: insertedId,
    title: doc.title,
    invoiceNumber: doc.invoiceNumber,
    userName: doc.userName,
    mobile: doc.mobile,
    email: doc.email,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate || data.invoiceDate,
    description: doc.description,
    totalAmount,
    advanceAmount,
    remainingAmount,
    status,
    emailSent: false,
    createdBy: doc.createdBy,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

export async function updateInvoiceEmailStatus(
  id: string,
  emailSent: boolean,
  emailSentAt?: Date | string
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    let filter: any = { invoiceNumber: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: new ObjectId(id) }, { invoiceNumber: id }] };
    }

    const updateDoc = {
      $set: {
        emailSent,
        emailSentAt: emailSentAt ? new Date(emailSentAt) : new Date(),
        updatedAt: new Date(),
      },
    };

    const res = await collection.updateOne(filter, updateDoc);
    return res.modifiedCount > 0 || res.matchedCount > 0;
  } catch (error) {
    console.error(`Error updating email status for invoice ${id}:`, error);
    return false;
  }
}

export async function updateInvoiceStatus(
  id: string,
  status: "active" | "disabled"
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("invoices");

    let filter: any = { invoiceNumber: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: new ObjectId(id) }, { invoiceNumber: id }, { id: id }] };
    }

    const res = await collection.updateOne(filter, {
      $set: { status, updatedAt: new Date() },
    });
    return res.modifiedCount > 0 || res.matchedCount > 0;
  } catch (error) {
    console.error(`Error updating status for invoice ${id}:`, error);
    return false;
  }
}
