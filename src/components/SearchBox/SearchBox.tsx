import css from './NoteForm.module.css';

export default function NoteForm() {
  return (
<input
	className={css.input}
  type="text"
  placeholder="Search notes"
 />
  );
}