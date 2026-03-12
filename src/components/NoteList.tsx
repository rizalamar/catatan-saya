import type { Note } from "../data-dummy";

interface ListNoteProp {
	filteredNotes: Note[];
	onDeleteNote: (value: number) => void;
}

export default function NoteList({ filteredNotes, onDeleteNote }: ListNoteProp) {
	return (
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
						onClick={() => onDeleteNote(note.id)}
						className="mt-4 bg-red-400/50 text-stone-100 font-bold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer hover:bg-red-400"
					>
						Hapus
					</button>
				</div>
			))}
		</div>
	);
}
