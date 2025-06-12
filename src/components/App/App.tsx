import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import { NoteModal } from '../NoteModal/NoteModal';
import type { FetchNotesResponse } from '../../services/noteService';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearchTerm],
    queryFn: () => fetchNotes(page, 12, debouncedSearchTerm),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <header className={css.toolbar}>
        <div className={css.content}> {/* Small cosmetic changes */}
          <SearchBox value={searchTerm} onSearch={handleSearchChange} />
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>
      </header>
    <div className={css.app}>

      {isModalOpen && (
        <NoteModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Something went wrong. Please try again." />}
      {isSuccess && data.notes.length === 0 && <ErrorMessage message="Nothing found. Try again." />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
      </>
  );
}
