import styles from './FakeCard.module.scss';

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.text1} />
      <div className={styles.text2} />
      <div className="d-flex justify-between align-end">
        <div className={styles.price}></div>
        <div className={styles.button}></div>
      </div>
    </div>
  );
}
