import OrderCard from './_components/OrderCard';
import styles from './page.module.scss';

export default function ViewOrderCards() {
  const dateTime = new Date('2024-03-01T10:36:01.516Z');
  const progressList: [string, Date, number, string, number][] = [
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      3,
      '/sample-product/puffer.png',
      0,
    ],
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      1,
      '/sample-product/watch.png',
      2,
    ],
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      1,
      '/sample-product/sneaker.png',
      1,
    ],
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      1,
      '/sample-product/plant.png',
      0,
    ],
  ];
  const deliveredList: [string, Date, number, string, number][] = [
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      4,
      '/sample-product/cap.png',
      3,
    ],
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      4,
      '/sample-product/bear.png',
      3,
    ],
    [
      'Lightweight Water-Resistant Hooded Puffer Coat',
      dateTime,
      4,
      '/sample-product/hydro.png',
      3,
    ],
  ];

  return (
    <div className={styles.page_container}>
      <div className={styles.orders}>
        <h4>Orders</h4>
        <form className={styles.order_form}>
          <div className={styles.searchbar}>
            <input
              className={styles.search}
              type="text"
              placeholder="Search"
              name="search"
            />
            <button className={styles.search_submit} type="submit">
              Search
            </button>
          </div>
          <div className={styles.filter}>
            <select id="filter" name="filter">
              <option value="filter">Filter</option>
            </select>
          </div>
        </form>
      </div>
      <div className={styles.progress}>
        <h4>Progress</h4>
        <div className={styles.order_cards}>
          {progressList.map((item, index) => (
            <div key={index}>
              <OrderCard
                title={item[0]}
                date={item[1]}
                status={item[2]}
                image={item[3]}
                icon={item[4]}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.past_orders}>
        <h4>Past Orders</h4>
        <div className={styles.order_cards}>
          {deliveredList.map((item, index) => (
            <div key={index}>
              <OrderCard
                title={item[0]}
                date={item[1]}
                status={item[2]}
                image={item[3]}
                icon={item[4]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
