import { randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

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
async function readJsonFile(filePath) {
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}
async function writeJsonFile(filePath, value) {
  await ensureDataDir();
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}
`, "utf-8");
}
async function getEvents() {
  const events = await readJsonFile(files.events);
  return events.sort(
    (a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`)
  );
}
async function getBooks() {
  return readJsonFile(files.books);
}
async function getCurrentBook() {
  const books = await getBooks();
  return books.find((book) => book.isCurrent) ?? books[0] ?? null;
}
async function getUpcomingEvents(limit) {
  const now = /* @__PURE__ */ new Date();
  const upcoming = (await getEvents()).filter(
    (event) => /* @__PURE__ */ new Date(`${event.date}T${event.startTime}:00`) >= now
  );
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
async function getNextBookClubMeeting() {
  const upcoming = await getUpcomingEvents();
  return upcoming.find((event) => event.category === "Book Club meeting") ?? null;
}
async function createEvent(input) {
  const events = await getEvents();
  const record = {
    id: randomUUID(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    ...input,
    bookTitle: input.category === "Book Club meeting" && input.bookTitle ? input.bookTitle : void 0,
    endTime: input.endTime || void 0
  };
  events.push(record);
  await writeJsonFile(files.events, events);
  return record;
}
async function createBook(input) {
  const books = await getBooks();
  const record = {
    id: randomUUID(),
    title: input.title,
    pickedBy: input.pickedBy,
    amazonUrl: input.amazonUrl,
    bookClubMonthOrDate: input.bookClubMonthOrDate,
    isCurrent: input.isCurrent,
    coverImageUrl: ""
  };
  const nextBooks = record.isCurrent ? books.map((book) => ({ ...book, isCurrent: false })).concat(record) : books.concat(record);
  await writeJsonFile(files.books, nextBooks);
  return record;
}
async function createMemberSignup(input) {
  const signups = await readJsonFile(files.memberSignups);
  const record = {
    id: randomUUID(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    ...input
  };
  signups.push(record);
  await writeJsonFile(files.memberSignups, signups);
  return record;
}
async function createMemberInvite(input) {
  const invites = await readJsonFile(files.memberInvites);
  const record = {
    id: randomUUID(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    ...input
  };
  invites.push(record);
  await writeJsonFile(files.memberInvites, invites);
  return record;
}

export { createEvent as a, createMemberInvite as b, createBook as c, createMemberSignup as d, getBooks as e, getUpcomingEvents as f, getEvents as g, getCurrentBook as h, getNextBookClubMeeting as i };
