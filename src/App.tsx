import { useState } from "react";
import { dummyNotes } from "./data-dummy";
import type { Note } from "./data-dummy";

function NoteApp() {
	const [notes, setNotes] = useState<Note[]>(dummyNotes);
	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [querySearch, setQuerySearch] = useState<string>("");

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(querySearch.toLowerCase()));

	function handleAddNote() {
		if (title.trim() === "") return;

		const newNote: Note = {
			id: Date.now(),
			title: title,
			body: body,
		};

		setNotes([...notes, newNote]);
		setTitle("");
		setBody("");
	}

	function handleDeleteNote(id: number) {
		const note = notes.filter((note) => note.id !== id);
		setNotes(note);
	}

	return (
		<div className="min-h-screen bg-stone-950 text-stone-100 font-mono p-8 flex flex-col items-center">
			{/* Header */}
			<header className="mb-10 text-center">
				<h1 className="text-4xl font-bold tracking-tighter text-amber-400">catatan saya</h1>
				<p className="mt-1 text-sm text-stone-500">react-ts + tailwind</p>
			</header>

			{/* Form input */}
			<div className="bg-stone-900 border border-stone-700 rounded-xl p-6 mb-10 max-w-xl">
				<p className="text-sm text-stone-500 text-center tracking-widest mb-4">Tambah catatan baru</p>
				<input
					id="judul"
					type="text"
					placeholder="Judul catatan..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 mb-4"
				/>
				<textarea
					placeholder="Catat apa hari ini..."
					value={body}
					onChange={(e) => setBody(e.target.value)}
					className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 mb-3"
				/>

				<button
					onClick={handleAddNote}
					className="mt-4 bg-amber-300 text-stone-950 font-bold text-sm px-5 py-2 rounded-lg transition-colors hover:bg-amber-400 cursor-pointer"
				>
					+ Tambah
				</button>
			</div>

			{/* Search notes */}
			<div className="w-full max-w-xl flex gap-4 items-center mb-6">
				<input
					type="text"
					className="flex-1 bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 "
					placeholder="Cari catatan..."
					value={querySearch}
					onChange={(e) => setQuerySearch(e.target.value)}
				/>
				<p className="text-stone-700 text-xs">
					total catatan: <span className="text-amber-400">{filteredNotes.length}</span>
				</p>
			</div>

			{/* List notes */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
				{filteredNotes.length === 0 && (
					<p className="text-stone-600 text-sm col-span-3">Belum ada catatan. Coba tambah satu.</p>
				)}

				{filteredNotes.map((note) => (
					<div
						className="bg-stone-900 border border-stone-700 hover:border-amber-400/50 rounded-xl p-5 transition-colors group"
						key={note.id}
					>
						<h2 className="text-amber-400 font-bold text-base mb-2 truncate">{note.title}</h2>
						<p className="text-stone-400 text-sm leading-relaxed line-clamp-3">{note.body}</p>

						<button
							onClick={() => handleDeleteNote(note.id)}
							className="mt-4 bg-red-400/50 text-stone-100 font-bold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer hover:bg-red-400"
						>
							Hapus
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default NoteApp;
