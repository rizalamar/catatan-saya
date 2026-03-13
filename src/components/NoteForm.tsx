interface NoteFormProps {
	title: string;
	body: string;
	onTitleChange: (value: string) => void;
	onBodyChange: (value: string) => void;
	onAddNote: () => void;
	isEditing: boolean;
	onCancel: () => void;
}

export default function NoteForm({
	title,
	body,
	onTitleChange,
	onBodyChange,
	onAddNote,
	isEditing,
	onCancel,
}: NoteFormProps) {
	return (
		<div className="bg-stone-900 border border-stone-700 rounded-xl p-6 mb-10 max-w-xl">
			<p className="text-sm text-stone-500 text-center tracking-widest mb-4">Tambah catatan baru</p>
			<input
				id="judul"
				type="text"
				placeholder="Judul catatan..."
				value={title}
				onChange={(e) => onTitleChange(e.target.value)}
				className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 mb-3"
			/>
			<textarea
				placeholder="Catat apa hari ini..."
				value={body}
				onChange={(e) => onBodyChange(e.target.value)}
				className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 mb-3 h-30"
			/>

			<button
				onClick={onAddNote}
				className="mt-4 bg-amber-300 text-stone-950 font-bold text-sm px-5 py-2 rounded-lg transition-colors hover:bg-amber-400 cursor-pointer"
			>
				{isEditing ? "Simpan" : "+ Tambah"}
			</button>
			{isEditing && (
				<button
					onClick={onCancel}
					className="mt-4 bg-red-400 text-stone-950 font-bold text-sm px-5 py-2 rounded-lg transition-colors hover:bg-red-500 cursor-pointer ml-3"
				>
					Batal
				</button>
			)}
		</div>
	);
}
