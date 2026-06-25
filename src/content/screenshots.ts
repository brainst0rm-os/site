/**
 * The product carousel. Real captures of the current build — a small design
 * studio's vault, in the Rose theme — not mockups. Curated from the dogfood
 * Playwright harness; see ../../brainstorm/tests/dogfood/sessions.
 */

export interface Shot {
	src: string;
	app: string;
	title: string;
	caption: string;
}

export const screenshots: Shot[] = [
	{
		src: "/screenshots/desktop.webp",
		app: "The shell",
		title: "It opens to a desktop",
		caption:
			"Your apps sit in a launcher over a wallpaper you pick. The shell's whole job is to host them — it has no idea what a note or a task is. Those live inside the apps.",
	},
	{
		src: "/screenshots/database.webp",
		app: "Database",
		title: "One place, every kind of thing",
		caption:
			"Notes, tasks, people, projects and events share a single object space. Open any type as a grid, board, calendar or timeline — the sidebar is your whole vault.",
	},
	{
		src: "/screenshots/notes.webp",
		app: "Notes",
		title: "Notes that link to everything",
		caption:
			"A real block editor: drop in an image, embed a live card or another object, @-mention anything mid-sentence. The links are real — follow them anywhere.",
	},
	{
		src: "/screenshots/tasks.webp",
		app: "Tasks",
		title: "Projects, the way you work",
		caption:
			"Inbox, Today, Upcoming, Board and Timeline over the same tasks the Calendar and Graph read. Move work between apps without ever moving the data.",
	},
	{
		src: "/screenshots/calendar.webp",
		app: "Calendar",
		title: "Your week, from the same data",
		caption:
			"Due dates, scheduled work and events all land on one calendar on their own. Nothing gets re-entered — these are the same objects the other apps read.",
	},
	{
		src: "/screenshots/contacts.webp",
		app: "Contacts",
		title: "People, and how they connect",
		caption:
			"An address book that knows who works where and what they're attached to — roles, birthdays, and the projects each person is part of.",
	},
	{
		src: "/screenshots/graph.webp",
		app: "Graph",
		title: "See the shape of your work",
		caption:
			"Every object and every link, drawn live. Mentions and shared attributes become edges you can filter, focus on, and walk through.",
	},
	{
		src: "/screenshots/whiteboard.webp",
		app: "Whiteboard",
		title: "Think on an infinite canvas",
		caption:
			"Sticky notes, shapes and arrows — here, the directions for a client review. A real canvas, sitting next to the structured data, not off in another tool.",
	},
	{
		src: "/screenshots/bookmarks.webp",
		app: "Bookmarks",
		title: "Save the web, tag it, find it",
		caption:
			"A read-it-later inbox with tags and saved collections. Capture a page, file it, and pull it back when the project needs it.",
	},
	{
		src: "/screenshots/journal.webp",
		app: "Journal",
		title: "A daily habit, built in",
		caption:
			"Date-titled entries with mood, habit tracking and a streak. Your journal is just another kind of note — searchable, linkable, yours.",
	},
	{
		src: "/screenshots/agent.webp",
		app: "Agent",
		title: "AI that stays on your machine",
		caption:
			"Runs on a local model by default — your messages never leave the device. Ask it to read your notes and draft a document, and it hands one back, attached.",
	},
];
