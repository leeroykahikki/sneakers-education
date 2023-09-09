import { useRef, useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Drawer.module.scss';
import ButtonRemove from '../ButtonRemove';
import ButtonGreen from '../ButtonGreen';

export default function Drawer({ onRemove, setCartOpened, items = [] }) {
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
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>

              <ButtonGreen title="Оформить заказ" isReverse={false} />
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}
