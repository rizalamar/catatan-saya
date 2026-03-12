import { useEffect, useState } from "react";
import type { Note } from "../data-dummy";

export function useNotes() {
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

	return {
		title,
		setTitle,
		body,
		setBody,
		querySearch,
		setQuerySearch,
		filteredNotes,
		handleAddNote,
		handleDeleteNote,
	};
}
