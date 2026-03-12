import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import SearchForm from "./components/SearchForm";
import NoteList from "./components/NoteList";
import { useNotes } from "./hooks/useNotes";

function NoteApp() {
	const {
		title,
		setTitle,
		body,
		setBody,
		querySearch,
		setQuerySearch,
		filteredNotes,
		handleAddNote,
		handleDeleteNote,
	} = useNotes();
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
