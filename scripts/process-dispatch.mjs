import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const payloadRaw = process.env.DISPATCH_PAYLOAD;

if (!payloadRaw) {
  throw new Error("DISPATCH_PAYLOAD is required.");
}

const dispatchSchema = z.object({
  formType: z.enum(["event", "book", "signup", "invite"]),
  sharedSecret: z.string().optional(),
  data: z.record(z.string(), z.string())
});

const eventSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(5).max(1200),
  category: z.enum(["Book Club meeting", "Discussion", "Social", "Planning", "Community", "Other"]),
  bookTitle: z.string().trim().max(160).optional(),
  hostMemberId: z.string().trim().max(120).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  location: z.string().trim().min(2).max(160)
}).superRefine((value, ctx) => {
  if (value.category === "Book Club meeting" && !value.hostMemberId) {
    ctx.addIssue({ code: "custom", path: ["hostMemberId"], message: "Host is required." });
  }
});

const bookSchema = z.object({
  title: z.string().trim().min(2).max(160),
  pickedBy: z.string().trim().min(2).max(120),
  amazonUrl: z.url().max(600),
  bookClubMonthOrDate: z.string().trim().min(2).max(80),
  isCurrent: z.enum(["true", "false"]).default("false")
});

const signupSchema = z.object({
  memberName: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  notes: z.string().trim().max(500).optional()
});

const inviteSchema = z.object({
  inviterName: z.string().trim().min(2).max(120),
  inviterEmail: z.email().max(200),
  inviteeName: z.string().trim().min(2).max(120),
  inviteeEmail: z.email().max(200),
  message: z.string().trim().max(500).optional()
});

const dispatch = dispatchSchema.parse(JSON.parse(payloadRaw));
const expectedSecret = process.env.DISPATCH_SHARED_SECRET;

if (expectedSecret && dispatch.sharedSecret !== expectedSecret) {
  throw new Error("Shared secret mismatch.");
}

switch (dispatch.formType) {
  case "event":
    await handleEvent(dispatch.data);
    break;
  case "book":
    await handleBook(dispatch.data);
    break;
  case "signup":
    await handleSignup(dispatch.data);
    break;
  case "invite":
    await handleInvite(dispatch.data);
    break;
}

async function handleEvent(raw) {
  const parsed = eventSchema.parse(cleanObject(raw));
  const members = await readJson("members.json");
  const host = members.find((member) => member.id === parsed.hostMemberId);

  if (parsed.category === "Book Club meeting" && (!host || !host.active)) {
    throw new Error("Book Club meeting host must be an active member.");
  }

  const events = await readJson("events.json");
  events.push({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed,
    bookTitle: parsed.category === "Book Club meeting" ? parsed.bookTitle || undefined : undefined,
    hostMemberId: parsed.category === "Book Club meeting" ? parsed.hostMemberId || undefined : undefined,
    endTime: parsed.endTime || undefined
  });
  await writeJson("events.json", events);
}

async function handleBook(raw) {
  const parsed = bookSchema.parse(cleanObject(raw));
  const books = await readJson("books.json");
  const nextBook = {
    id: randomUUID(),
    title: parsed.title,
    pickedBy: parsed.pickedBy,
    amazonUrl: parsed.amazonUrl,
    bookClubMonthOrDate: parsed.bookClubMonthOrDate,
    isCurrent: parsed.isCurrent === "true",
    coverImageUrl: ""
  };

  const nextBooks = nextBook.isCurrent
    ? books.map((book) => ({ ...book, isCurrent: false })).concat(nextBook)
    : books.concat(nextBook);

  await writeJson("books.json", nextBooks);
}

async function handleSignup(raw) {
  const parsed = signupSchema.parse(cleanObject(raw));
  const signups = await readJson("memberSignups.json");
  signups.push({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed,
    notes: parsed.notes || ""
  });
  await writeJson("memberSignups.json", signups);
}

async function handleInvite(raw) {
  const parsed = inviteSchema.parse(cleanObject(raw));
  const invites = await readJson("memberInvites.json");
  invites.push({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed,
    message: parsed.message || ""
  });
  await writeJson("memberInvites.json", invites);

  const members = await readJson("members.json");
  const email = parsed.inviteeEmail.toLowerCase();
  const existing = members.find((member) => member.email.toLowerCase() === email);

  if (!existing) {
    members.push({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name: parsed.inviteeName,
      permissions: "Member",
      active: false,
      address: "",
      email: parsed.inviteeEmail,
      spouse: "",
      phone: ""
    });
    await writeJson("members.json", members);
  }
}

async function readJson(fileName) {
  const filePath = path.join(dataDir, fileName);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeJson(fileName, value) {
  const filePath = path.join(dataDir, fileName);
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function cleanObject(input) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
  );
}
