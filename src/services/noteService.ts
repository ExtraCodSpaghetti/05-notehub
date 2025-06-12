import axios from 'axios';
import type { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ""
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (typeof search === 'string' && search.trim()) {
    params.search = search.trim();
  }

  const response = await api.get("/notes", { params });

  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};