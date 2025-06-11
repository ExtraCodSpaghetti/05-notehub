import { useState } from 'react';
import css from './App.module.css';

export default function App() {





  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {/* Пагінація */}
          <button className={css.button}>Create note +</button>
        </header>
        <ul className={css.list}>
          {/* Набір елементів списку нотатків */}
          <li className={css.listItem}>
            <h2 className={css.title}>Note title</h2>
            <p className={css.content}>Note content</p>
            <div className={css.footer}>
              <span className={css.tag}>Note tag</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
