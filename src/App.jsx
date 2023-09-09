import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Alert from './components/Alert';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

export default function App() {
  const [cartOpened, setCartOpened] = useState(false); // Состояние корзины
  const [searchValue, setSearchValue] = useState(''); // Поиск
  const [cartItems, setCartItems] = useState([]); // Товары в корзине
  const [items, setItems] = useState([]); // Товары
  const [isLoadingItems, setIsLoadingItems] = useState(true); // Состояние изначальной загрузки карточек из БД
  const [favoriteList, setFavoriteList] = useState([]);

  const drawerRef = useRef(null); // Анимация корзины

  // Изначальный запрос к БД
  useEffect(() => {
    axios
      .get('https://60da8c89801dcb00172909d9.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(`Ошибка подключения к БД\n${error}`);
      })
      .then(() => {
        setIsLoadingItems(false);
      });

    axios
      .get('https://60da8c89801dcb00172909d9.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log(`Ошибка подключения к БД\n${error}`);
      });

    axios.get(`https://60da8c89801dcb00172909d9.mockapi.io/favorites?accountId=0`).then((res) => {
      let { favoriteList } = res.data[0];
      setFavoriteList(favoriteList);
    });
  }, []);

  // Добавление товаров в корзину
  const handleOnAddItemCart = (items, setIsLoading) => {
    axios
      .post('https://60da8c89801dcb00172909d9.mockapi.io/cart', items)
      .then((res) => {
        setCartItems((prev) => [...prev, res.data]);
      })
      .catch((error) => {
        console.log(`Ошибка подключения к БД\n${error}`);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  // Удаление товаров из корзины
  const handleOnRemoveItemCart = (id) => {
    axios.delete(`https://60da8c89801dcb00172909d9.mockapi.io/cart/${id}`).catch((error) => {
      console.log(`Ошибка подключения к БД\n${error}`);
    });
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Обработка поиска
  const handleOnChangeSearchInput = (event) => {
    event.target.value.trim() ? setSearchValue(event.target.value.trimStart()) : setSearchValue('');
  };

  // Обработка лайка
  const handleOnClickFavorite = () => {
    console.log(favoriteList);
  };

  return (
    <div className="wrapper clear">
      <button onClick={handleOnClickFavorite}>Кликни</button>
      <Alert />
      <TransitionGroup>
        {cartOpened && (
          <CSSTransition nodeRef={drawerRef} timeout={300} classNames="overlay">
            <div ref={drawerRef} className="overlay">
              <Drawer
                onRemove={handleOnRemoveItemCart}
                setCartOpened={setCartOpened}
                items={cartItems}
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>

      <Header onClickCart={() => setCartOpened(true)} />

      <Route
        render={({ location }) => (
          // Багует, когда мало favorites айтемов, почекать анимацию
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="page-animation">
              <Switch location={location}>
                <Route path="/" exact>
                  <Home
                    searchValue={searchValue}
                    onChangeSearchInput={handleOnChangeSearchInput}
                    onAddItemCart={handleOnAddItemCart}
                    isLoadingItems={isLoadingItems}
                    items={items}
                  />
                </Route>

                <Route path="/favorites" exact>
                  <Favorites
                    onAddItemCart={handleOnAddItemCart}
                    items={items.filter((item) => favoriteList.indexOf(Number(item.id)) !== -1)}
                  />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}
