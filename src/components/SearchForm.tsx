import type { Note } from "../data-dummy";

interface SearchFormProp {
	querySearch: string;
	onQuerySearch: (value: string) => void;
	filteredNotes: Note[];
}

export default function SearchForm({ querySearch, onQuerySearch, filteredNotes }: SearchFormProp) {
	return (
		<div className="w-full max-w-xl flex gap-4 items-center mb-6">
			<input
				type="text"
				className="flex-1 bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 "
				placeholder="Cari catatan..."
				value={querySearch}
				onChange={(e) => onQuerySearch(e.target.value)}
			/>
			<p className="text-stone-700 text-xs">
				total catatan: <span className="text-amber-400">{filteredNotes.length}</span>
			</p>
		</div>
	);
}
