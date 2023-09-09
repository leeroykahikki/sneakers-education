import { useEffect, useState } from 'react';
import Loader from '../Loader';
import styles from './Card.module.css';

export default function Card({ title, price, imageURL, onAddItemCart, likeStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likeStatus);
  }, []);

  const handleOnAddItemCart = () => {
    setIsLoading(true);
    onAddItemCart({ title, price, imageURL }, setIsLoading);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="7.5"
            fill="transparent"
            strokeWidth="1.4"
            stroke="#dbdbdb"
            strokeOpacity="0.5"
          />
          <path
            d="M22.5849 12.2231C22.3615 11.7098 22.0394 11.2446 21.6365 10.8537C21.2333 10.4615 20.758 10.1499 20.2363 9.93576C19.6954 9.7128 19.1152 9.59868 18.5295 9.60002C17.7077 9.60002 16.906 9.82329 16.2092 10.245C16.0425 10.3459 15.8842 10.4567 15.7342 10.5775C15.5841 10.4567 15.4258 10.3459 15.2591 10.245C14.5624 9.82329 13.7606 9.60002 12.9388 9.60002C12.3471 9.60002 11.7737 9.71248 11.232 9.93576C10.7086 10.1508 10.2369 10.46 9.83181 10.8537C9.42843 11.2442 9.10619 11.7095 8.88337 12.2231C8.65168 12.7573 8.53333 13.3246 8.53333 13.9084C8.53333 14.4592 8.64668 15.0331 8.8717 15.6169C9.06006 16.1048 9.33009 16.6109 9.67513 17.122C10.2219 17.9307 10.9736 18.7742 11.9071 19.6293C13.4539 21.0467 14.9857 22.0258 15.0507 22.0655L15.4458 22.3169C15.6208 22.4277 15.8458 22.4277 16.0209 22.3169L16.4159 22.0655C16.4809 22.0242 18.0111 21.0467 19.5596 19.6293C20.493 18.7742 21.2448 17.9307 21.7915 17.122C22.1366 16.6109 22.4083 16.1048 22.5949 15.6169C22.82 15.0331 22.9333 14.4592 22.9333 13.9084C22.935 13.3246 22.8166 12.7573 22.5849 12.2231Z"
            fill="transparent"
            strokeWidth="1.4"
            stroke="#dbdbdb"
            strokeOpacity="0.5"
          />
        </svg>
      </div>
      <img width={133} height={112} src={imageURL} alt="" />
      <h5 title={title}>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price.toLocaleString()} руб.</b>
        </div>
        <div
          className={`${styles.btnAdd} ${
            isLoading ? styles.progress : ''
          } d-flex align-center justify-center`}>
          {isLoading ? (
            <Loader />
          ) : (
            <img
              className={styles.plus}
              onClick={handleOnAddItemCart}
              src="/img/btn-plus.svg"
              alt="btn"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// module.exports = {
//   Card,
//   FakeCard,
// }
