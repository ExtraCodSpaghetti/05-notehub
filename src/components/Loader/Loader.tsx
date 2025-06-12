import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Loading, please wait...</p>
    </div>
  );
}