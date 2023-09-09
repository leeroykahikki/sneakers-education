import styles from './ButtonGreen.module.scss';

export default function ButtonGreen({ title, isReverse }) {
  return (
    <button className={styles.greenButton}>
      {isReverse && <img className={styles.arrowReverse} src="/img/arrow.svg" alt="arrow" />}
      {title}
      {!isReverse && <img className={styles.arrow} src="/img/arrow.svg" alt="arrow" />}
    </button>
  );
}
