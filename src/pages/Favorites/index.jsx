import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import FakeCard from '../../components/FakeCard';

export default function Favorites({ onAddItemCart, items }) {
  const fakeCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const isLoadingFavorites = false;

  return (
    <div className="content p-45">
      <div className="d-flex align-center mb-40">
        <Link to="/">
          <img width={35} height={35} src="/img/btn-back.svg" alt="Back" />
        </Link>
        <h1 className="ml-20">Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {isLoadingFavorites
          ? fakeCards.map((card) => <FakeCard key={card} />)
          : items.map((card) => (
              <Card
                title={card.title}
                price={card.price}
                imageURL={card.imageURL}
                onAddItemCart={onAddItemCart}
                key={card.id}
              />
            ))}
      </div>
    </div>
  );
}
