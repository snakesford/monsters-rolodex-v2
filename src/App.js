import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [cars, setcars] = useState([]);
  const [filteredcars, setFiltercars] = useState(cars);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((users) => setcars(users));
  }, []);
  const flattencar = (car) => {
    return `
      ${car.name}
      ${car.zerotosixtey}
      ${car.category}
      ${car.country}
      ${car.model}
      ${car.price}
      ${car.year}
    `.toLocaleLowerCase();
  };
//   json.sort(function(a, b){
//     return a.id - b.id;
// });
  useEffect(() => {
    const newFilteredcars = cars.filter((car) => {
      const carData = flattencar(car);
      return carData.includes(searchField);
    });
    setFiltercars(newFilteredcars.sort(function(a,b) {
      return a.name.localeCompare(b.name), a.model.localeCompare(b.model)
    }));
  }, [cars, searchField]);
  
  const sort = () => {
    cars.filter(car => car.price === 10000);
    // setFiltercars("Acura")
    //Price == 1000
    // function sortCars() {
    //   // Filter the cars priced at $10,000
      
      
    //   // Sort alphabetically by name
    //   filteredCars.sort((a, b) => a.name.localeCompare(b.name));
    //   }
  }
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };


  return (
    <div className='App'>
      <h1 className='app-title'>Cars Rolodex</h1>
      <button onClick={sort}>Sort</button>

      <SearchBox
        className='cars-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search cars'
      />
      <CardList cars={filteredcars} />
    </div>
  );
};

export default App;
