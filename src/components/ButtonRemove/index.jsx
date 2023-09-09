import styles from './ButtonRemove.module.css';

export default function ButtonRemove({ onClick }) {
  return (
    <img onClick={onClick} className={styles.btnRemove} src="/img/btn-remove.svg" alt="Remove" />
  );
}
