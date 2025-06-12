import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>⚠️{message}</p>
    </div>
  );
}