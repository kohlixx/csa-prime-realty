/**
 * Mock leads data + typed helpers for the admin section.
 * Swap for real server functions once Lovable Cloud is enabled.
 */

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "site_visit"
  | "negotiation"
  | "won"
  | "lost";

export type LeadSource =
  | "website"
  | "whatsapp"
  | "facebook"
  | "google"
  | "referral"
  | "walk_in"
  | "magicbricks"
  | "99acres";

export type LeadPriority = "low" | "medium" | "high";

export interface LeadActivity {
  id: string;
  at: string; // ISO
  type: "note" | "call" | "email" | "whatsapp" | "status_change" | "assignment";
  by: string;
  message: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  locality?: string;
  interestedIn: string; // project or property
  budgetMin: number; // INR
  budgetMax: number;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  score: number; // 0-100
  createdAt: string; // ISO
  lastContactAt?: string;
  notes?: string;
  activity: LeadActivity[];
}

export const CITIES = ["Noida", "Greater Noida", "Gurugram", "Delhi", "Ghaziabad", "Faridabad"];

export const AGENTS = [
  { id: "u_arjun", name: "Arjun Sharma" },
  { id: "u_priya", name: "Priya Verma" },
  { id: "u_rahul", name: "Rahul Mehta" },
  { id: "u_sneha", name: "Sneha Kapoor" },
  { id: "u_vikas", name: "Vikas Rao" },
];

export const SOURCE_LABELS: Record<LeadSource, string> = {
  website: "Website",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  google: "Google Ads",
  referral: "Referral",
  walk_in: "Walk-in",
  magicbricks: "MagicBricks",
  "99acres": "99acres",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  site_visit: "Site Visit",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

/** Map lead status → StatusBadge preset from admin kit. */
export const STATUS_PRESET: Record<
  LeadStatus,
  "new" | "processing" | "approved" | "featured" | "pending" | "success" | "failed"
> = {
  new: "new",
  contacted: "processing",
  qualified: "approved",
  site_visit: "featured",
  negotiation: "pending",
  won: "success",
  lost: "failed",
};

const FIRST = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Kabir", "Ishaan", "Ananya", "Diya", "Aadhya", "Saanvi", "Myra", "Rohan", "Kavya", "Neha", "Rakesh", "Meera", "Karan"];
const LAST = ["Sharma", "Verma", "Gupta", "Kapoor", "Mehta", "Singh", "Agarwal", "Bansal", "Chopra", "Malhotra", "Reddy", "Nair", "Iyer", "Rao"];
const PROJECTS = ["M3M Golf Estate", "DLF The Camellias", "ATS Picturesque", "Godrej Woods", "Lodha Bellagio", "Prateek Canary", "Gaur Yamuna City", "Sobha City"];

function hash(seed: number, mod: number) {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * mod);
}

function makeLead(i: number): Lead {
  const first = FIRST[hash(i + 1, FIRST.length)];
  const last = LAST[hash(i + 7, LAST.length)];
  const city = CITIES[hash(i + 3, CITIES.length)];
  const sourceKeys = Object.keys(SOURCE_LABELS) as LeadSource[];
  const statusKeys = Object.keys(STATUS_LABELS) as LeadStatus[];
  const source = sourceKeys[hash(i + 5, sourceKeys.length)];
  const status = statusKeys[hash(i + 9, statusKeys.length)];
  const priority: LeadPriority = (["low", "medium", "high"] as const)[hash(i + 11, 3)];
  const assignChance = hash(i + 13, 10);
  const agent = assignChance > 2 ? AGENTS[hash(i + 17, AGENTS.length)].id : undefined;
  const budgetMin = (40 + hash(i + 19, 60)) * 100000;
  const budgetMax = budgetMin + (20 + hash(i + 23, 80)) * 100000;
  const createdDaysAgo = hash(i + 29, 45);
  const createdAt = new Date(Date.now() - createdDaysAgo * 86400000).toISOString();
  const lastContactDays = hash(i + 31, Math.max(1, createdDaysAgo));
  const lastContactAt =
    status !== "new"
      ? new Date(Date.now() - lastContactDays * 86400000).toISOString()
      : undefined;

  return {
    id: `LD-${(1000 + i).toString()}`,
    name: `${first} ${last}`,
    phone: `+91 9${(800000000 + hash(i + 37, 99999999)).toString().slice(0, 9)}`,
    email: `${first}.${last}`.toLowerCase() + `@example.com`,
    city,
    locality: ["Sector 150", "Sector 128", "Golf Course Ext.", "Sohna Road", "Sector 62"][hash(i + 41, 5)],
    interestedIn: PROJECTS[hash(i + 43, PROJECTS.length)],
    budgetMin,
    budgetMax,
    source,
    status,
    priority,
    assignedTo: agent,
    score: 30 + hash(i + 47, 70),
    createdAt,
    lastContactAt,
    notes:
      hash(i + 51, 2) === 0
        ? "Looking for 3BHK, ready-to-move preferred. Prefers weekend site visits."
        : undefined,
    activity: [
      {
        id: `${i}-a1`,
        at: createdAt,
        type: "note",
        by: "System",
        message: `Lead captured from ${SOURCE_LABELS[source]}.`,
      },
      ...(lastContactAt
        ? [
            {
              id: `${i}-a2`,
              at: lastContactAt,
              type: "call" as const,
              by: agent ? AGENTS.find((a) => a.id === agent)!.name : "Unassigned",
              message: "Initial discovery call. Shared brochure over WhatsApp.",
            },
          ]
        : []),
    ],
  };
}

export const MOCK_LEADS: Lead[] = Array.from({ length: 47 }, (_, i) => makeLead(i));

export function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function agentName(id?: string): string {
  if (!id) return "Unassigned";
  return AGENTS.find((a) => a.id === id)?.name ?? "Unassigned";
}

export function relativeTime(iso?: string): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
