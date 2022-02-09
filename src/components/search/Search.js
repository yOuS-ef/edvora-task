import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_REQUEST_URL, STATUS_FAILED, STATUS_SUCCEEDED } from '../../constants';
import styles from './Search.module.css';

function Search({setCategories, status, setStatus, setErrorMessage}) {
  
    const [products, setProducts] = useState([]);
    const [categoriesMenu, setCategoriesMenu] = useState({});
    const [statesMenu, setStatesMenu] = useState({});
    const [citiesMenu, setCitiesMenu] = useState({});

    console.log("states",statesMenu);
    console.log("statesKeys",Object.keys(statesMenu));
    useEffect(() => {

      axios.get(GET_REQUEST_URL).then(result => {
        console.log(result);
        if(result.status === 200){
            
          setProducts(result.data);
        }
        else {
          setStatus(STATUS_FAILED);
          setErrorMessage(result.data);
        }
      }).catch(err => {
        setStatus(STATUS_FAILED);
        setErrorMessage(err);
      })
      // fetch(GET_REQUEST_URL)
      // .then(response => response.json())
      // .then(data => console.log(data)); 
    }, []);

    useEffect(() => {

        if(products.length !== 0){
          const categoriesTemp = {};
          const statesTemp = {};
          const citiesTemp = {};

          products.forEach(product => {
            const categoryKey = product.product_name.split(' ').join('-');
            const stateKey = product.address.state.split(' ').join('-');
            const cityKey = product.address.city.split(' ').join('-');

            if (categoriesTemp[categoryKey] === undefined) 
              categoriesTemp[categoryKey] = [product];
            else
              categoriesTemp[categoryKey].push(product);
            
            if (statesTemp[stateKey] === undefined) 
              statesTemp[stateKey] = [product];
            else
              statesTemp[stateKey].push(product);

            if (citiesTemp[cityKey] === undefined) 
              citiesTemp[cityKey] = [product];
            else
              citiesTemp[cityKey].push(product);    
  
          })
          setStatus(STATUS_SUCCEEDED);
          setCategories(categoriesTemp);
          setCategoriesMenu(categoriesTemp);
          setStatesMenu(statesTemp);
          setCitiesMenu(citiesTemp);
        }
    },[products]);

    const updateMenues = () => {


    }

    const handleCategoriesMenu = (e) => {
      console.log('category', e.target.value);
    }

    const handleStatesMenu = (e) => {
      console.log('state', e.target.value);
    }

    const handleCitiesMenu = (e) => {
      console.log('city', e.target.value);
    }

    return (
      <div className={styles.search}>
        <h3  className='font20PX'>Filters</h3>
        <span className='line_seperated'></span>
        <div className={styles.drop_down}>
          <select className={`${styles.select} font17PX`} onChange={handleCategoriesMenu}>
            <option value=''>Products</option>
            {Object.keys(categoriesMenu) && (
              Object.keys(categoriesMenu).map(category => {
                const cateogryKey = categoriesMenu[category][0].product_name;
                return <option key={cateogryKey} value={cateogryKey}>{cateogryKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`} onChange={handleStatesMenu}>
            <option value=''>States</option>
            {Object.keys(statesMenu) && (
              Object.keys(statesMenu).map(state => {
                const stateKey = statesMenu[state][0].address.state;
                return <option key={stateKey} value={stateKey}>{stateKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`} onChange={handleCitiesMenu}>
            <option value=''>Cities</option>
            {Object.keys(citiesMenu) && (
              Object.keys(citiesMenu).map(city => {
                const cityKey = citiesMenu[city][0].address.city;
                return <option key={cityKey} value={cityKey}>{cityKey}</option>
              })
            )}
          </select>

        </div>
        
      </div>
    );
}
export default Search;