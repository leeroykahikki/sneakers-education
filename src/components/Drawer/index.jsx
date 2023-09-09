import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ButtonGreen from '../ButtonGreen';
import ButtonRemove from '../ButtonRemove';
import styles from './Drawer.module.css';

export default function Drawer({ onRemove, setCartOpened, items = [], userCash }) {
  const [overlayRender, setOverlayRender] = useState(false);
  const nodeRef = useRef(null);

  // Таймер на изначальное включение анимации Корзины
  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayRender(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Проверка выключения корзины для запуска таймера анимации
  useEffect(() => {
    if (!overlayRender) {
      const timer = setTimeout(() => {
        setCartOpened(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [overlayRender, setCartOpened]);

  const getFullPrice = () => {
    let fullPrice = 0;
    items.map(({ price }) => (fullPrice += price));
    return fullPrice;
  };

  return (
    <TransitionGroup>
      {overlayRender && (
        <CSSTransition timeout={300} nodeRef={nodeRef} classNames={{ ...styles }}>
          <div ref={nodeRef} className={`${styles.drawer} d-flex flex-column`}>
            <h2 className="d-flex justify-between mb-30">
              Корзина
              <ButtonRemove onClick={() => setOverlayRender(false)} />
            </h2>

            <div className={`${styles.items} flex`}>
              {items.map(({ title, price, imageURL, id }, index) => (
                <div
                  className={`${styles.cartItem} d-flex align-center mb-20`}
                  key={`${title}_${id}_${index}`}>
                  <div
                    className={`${styles.cartItemImg} mr-20`}
                    style={{ backgroundImage: `url(${imageURL})` }}></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{title}</p>
                    <b>{price.toLocaleString()} руб.</b>
                  </div>

                  <ButtonRemove onClick={() => onRemove(id)} />
                </div>
              ))}
            </div>

            <div className={`${styles.cartTotalBlock}`}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{`${getFullPrice()} руб.`}</b>
                </li>
              </ul>

              <ButtonGreen
                title="Оформить заказ"
                isReverse={false}
                onClick={
                  items.length === 0
                    ? () => toast.error('Корзина пуста')
                    : getFullPrice() <= userCash
                    ? () => toast.success('Заказ успешно оформлен')
                    : () => toast.error('Недостаточно средств')
                }
              />
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}
