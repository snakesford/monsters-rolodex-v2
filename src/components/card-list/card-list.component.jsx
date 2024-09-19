import Card from '../card/card.component';
import './card-list.styles.css';

const CardList = ({ cars }) => (
  <div className='card-list'>
    {cars.map((car) => {
      return <Card key={car.id} car={car} />;
    })}
  </div>
);

export default CardList;
