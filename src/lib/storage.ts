import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  BookRecord,
  EventRecord,
  MemberInviteRecord,
  MemberSignupRecord
} from "@/lib/types";

const dataDir = path.resolve(process.cwd(), "data");

const files = {
  books: path.join(dataDir, "books.json"),
  events: path.join(dataDir, "events.json"),
  memberSignups: path.join(dataDir, "memberSignups.json"),
  memberInvites: path.join(dataDir, "memberInvites.json")
};

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureDataDir();
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
}

export async function getEvents() {
  const events = await readJsonFile<EventRecord[]>(files.events);
  return events.sort((a, b) =>
    `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`)
  );
}

export async function getBooks() {
  return readJsonFile<BookRecord[]>(files.books);
}

export async function getCurrentBook() {
  const books = await getBooks();
  return books.find((book) => book.isCurrent) ?? books[0] ?? null;
}

export async function getUpcomingEvents(limit?: number) {
  const now = new Date();
  const upcoming = (await getEvents()).filter(
    (event) => new Date(`${event.date}T${event.startTime}:00`) >= now
  );
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export async function getNextBookClubMeeting() {
  const upcoming = await getUpcomingEvents();
  return upcoming.find((event) => event.category === "Book Club meeting") ?? null;
}

export async function createEvent(input: Omit<EventRecord, "id" | "createdAt">) {
  const events = await getEvents();
  const record: EventRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
    bookTitle:
      input.category === "Book Club meeting" && input.bookTitle ? input.bookTitle : undefined,
    endTime: input.endTime || undefined
  };
  events.push(record);
  await writeJsonFile(files.events, events);
  return record;
}

export async function createBook(input: Omit<BookRecord, "id" | "coverImageUrl">) {
  const books = await getBooks();
  const record: BookRecord = {
    id: randomUUID(),
    title: input.title,
    pickedBy: input.pickedBy,
    amazonUrl: input.amazonUrl,
    bookClubMonthOrDate: input.bookClubMonthOrDate,
    isCurrent: input.isCurrent,
    coverImageUrl: ""
  };
  const nextBooks = record.isCurrent
    ? books.map((book) => ({ ...book, isCurrent: false })).concat(record)
    : books.concat(record);
  await writeJsonFile(files.books, nextBooks);
  return record;
}

export async function createMemberSignup(input: Omit<MemberSignupRecord, "id" | "createdAt">) {
  const signups = await readJsonFile<MemberSignupRecord[]>(files.memberSignups);
  const record: MemberSignupRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input
  };
  signups.push(record);
  await writeJsonFile(files.memberSignups, signups);
  return record;
}

export async function createMemberInvite(input: Omit<MemberInviteRecord, "id" | "createdAt">) {
  const invites = await readJsonFile<MemberInviteRecord[]>(files.memberInvites);
  const record: MemberInviteRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input
  };
  invites.push(record);
  await writeJsonFile(files.memberInvites, invites);
  return record;
}
