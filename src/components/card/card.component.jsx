import './card.styles.css';

const Card = ({ car }) => {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 10,
  });

  let newModel = 0;
  const { id, name, zerotosixtey, model, price, year } = car;
  if (model.includes('#')) {
    newModel = model.replace('#', '%23');
  } else {
    newModel = model
  }
//
//
//
//json.sort(function(a, b){
// return a.id - b.id;
// });
//
  return (
    <div className='card-container'>
      <h2>{name}</h2>
      <div>

        <h3><a href={`https://www.google.com/search?q=${year}+${name}+${newModel}`} target="_blank">{model}</a></h3>
      </div>
      <h4>{USDollar.format(price)}</h4>
    </div>
  );
};

export default Card;
// https://www.google.com/search?client=safari&rls=en&q=dodge+viper&ie=UTF-8&oe=UTF-8&safe=active
// https://www.google.com/search?q=Acura+&safe=active#15%20Lowe's%20Fernandez%20ARX-01B&ie=UTF-8&oe=UTF-8&safe=active
// https://www.google.com/search?q=Acura