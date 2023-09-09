import { Link } from 'react-router-dom';
import './Header.module.css';

export default function Header({ onClickCart, userCash }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <Link to="/">
          <img className="mr-15" width={40} height={40} src="/img/icon.svg" alt="Icon" />
        </Link>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>

      <ul className="d-flex">
        <li className="d-flex mr-30 cu-p" onClick={onClickCart}>
          <img className="mr-10" width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>{`${userCash} руб.`}</span> {/* Добавить сюда toLocaleString() */}
        </li>
        <li className="mr-30">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="Heart" />
          </Link>
        </li>
        <li className="cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  );
}
