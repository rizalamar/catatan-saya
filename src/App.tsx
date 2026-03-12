import { useEffect, useState } from "react";
import type { Note } from "./data-dummy";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import SearchForm from "./components/SearchForm";
import NoteList from "./components/NoteList";

function NoteApp() {
	const [notes, setNotes] = useState<Note[]>(() => {
		const saved = localStorage.getItem("notes");
		return saved ? JSON.parse(saved) : [];
	});
	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [querySearch, setQuerySearch] = useState<string>("");

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

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
			<Header />
			{/* Form input */}
			<NoteForm
				title={title}
				body={body}
				onTitleChange={setTitle}
				onBodyChange={setBody}
				onAddNote={handleAddNote}
			/>

			{/* Search notes */}
			<SearchForm querySearch={querySearch} onQuerySearch={setQuerySearch} filteredNotes={filteredNotes} />

			{/* List notes */}
			<NoteList filteredNotes={filteredNotes} onDeleteNote={(id) => handleDeleteNote(id)} />
		</div>
	);
}

export default NoteApp;
