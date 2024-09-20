import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [cars, setcars] = useState([]);
  const [filteredCars, setFiltercars] = useState(cars);
  const [sortedCars, setSortedCars] = useState(false);
  const [value, setValue] = useState();

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
  
  useEffect(() => {
    const newfilteredCars = cars.filter((car) => {
      const carData = flattencar(car);
      const isViperMatch = !sortedCars || carData.includes(value);
      return isViperMatch && carData.includes(searchField);
    });

    setFiltercars(newfilteredCars.sort(function(a,b) {
      return a.name.localeCompare(b.name), a.model.localeCompare(b.model)
    }));
    
  }, [cars, searchField, sortedCars]);
  
  const sort = (param) => {
    setSortedCars(true);
    setValue(param)
    console.log(param + ' filter');
  }

  const clearFilters = () => {
    setSortedCars(false);
    console.log('Cleared filters');
  }

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };


  return (
    <div className='App'>
      <h1 className='app-title'>Cars Rolodex</h1>
      <button onClick={() => sort("viper")}>Filter by Viper</button>
      <button onClick={clearFilters}>Clear filters</button>
      <button onClick={() => sort(10000)}>Price</button>
      

      <SearchBox
        className='cars-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search cars'
      />
      <CardList cars={filteredCars} />
    </div>
  );
};

export default App;
