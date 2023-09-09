import styles from './Alert.module.css';

export default function Alert({ alerts = [] }) {
  return (
    <div className={`${styles.aletTray} d-flex`}>
      {alerts.map((alert, index) => (
        <div
          className={`${styles.alert} d-flex align-center justify-center`}
          key={`${alert}_${index}`}>
          <p>{alert}</p>
        </div>
      ))}
    </div>
  );
}
