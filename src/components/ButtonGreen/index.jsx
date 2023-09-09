import styles from './ButtonGreen.module.css';

export default function ButtonGreen({ title, isReverse, onClick }) {
  return (
    <button className={styles.greenButton} onClick={onClick}>
      {isReverse && <img className={styles.arrowReverse} src="/img/arrow.svg" alt="arrow" />}
      {title}
      {!isReverse && <img className={styles.arrow} src="/img/arrow.svg" alt="arrow" />}
    </button>
  );
}
