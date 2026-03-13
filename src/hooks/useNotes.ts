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
	const [editId, setEditId] = useState<number | null>(null);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(querySearch.toLowerCase()));

	function handleAddNote() {
		if (title.trim() === "") return;

		if (editId) {
			setNotes(notes.map((note) => (note.id === editId ? { ...note, title, body } : note)));
			setEditId(null);
			setTitle("");
			setBody("");
		} else {
			const newNote: Note = {
				id: Date.now(),
				title: title,
				body: body,
			};

			setNotes([...notes, newNote]);
			setTitle("");
			setBody("");
		}
	}

	function handleEdit(id: number) {
		const existing = notes.find((note) => note.id === id);

		if (!existing) return;

		setEditId(id);
		setTitle(existing.title);
		setBody(existing.body);
	}

	function handleDeleteNote(id: number) {
		const note = notes.filter((note) => note.id !== id);
		setNotes(note);
	}

	function handleCancel() {
		setEditId(null);
		setTitle("");
		setBody("");
	}

	return {
		title,
		setTitle,
		body,
		setBody,
		editId,
		querySearch,
		setQuerySearch,
		filteredNotes,
		handleAddNote,
		handleDeleteNote,
		handleEdit,
		handleCancel,
	};
}
