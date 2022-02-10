import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_REQUEST_URL, STATUS_FAILED, STATUS_LOADING, STATUS_SUCCEEDED } from '../../constants';
import styles from './Search.module.css';

function Search({setCategories, status, setStatus, setErrorMessage}) {
  
    const [products, setProducts] = useState([]);
    const [categoriesDict, setCategoriesDict] = useState({});
    const [statesDict, setStatesDict] = useState({});
    const [citiesDict, setCitiesDict] = useState({});

    const [categoriesMenu, setCategoriesMenu] = useState([]);
    const [statesMenu, setStatesMenu] = useState([]);
    const [citiesMenu, setCitiesMenu] = useState([]);
    
    const [selections, setSelections] = useState({category: '', state: '', city: ''});

    // console.log("states",statesMenu);
    // console.log("statesKeys",Object.keys(statesMenu));
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

    // useEffect(() => {

    //     if(products.length !== 0){
    //       const categoriesTemp = {};
    //       const statesTemp = {};
    //       const citiesTemp = {};

    //       products.forEach(product => {
    //         const categoryKey = product.product_name.split(' ').join('-');
    //         const stateKey = product.address.state.split(' ').join('-');
    //         const cityKey = product.address.city.split(' ').join('-');
 
    //         if (categoriesTemp[categoryKey] === undefined) 
    //           categoriesTemp[categoryKey] = [product];
    //         else
    //           categoriesTemp[categoryKey].push(product);
            
    //         if (statesTemp[stateKey] === undefined) 
    //           statesTemp[stateKey] = [product];
    //         else
    //           statesTemp[stateKey].push(product);

    //         if (citiesTemp[cityKey] === undefined) 
    //           citiesTemp[cityKey] = [product];
    //         else
    //           citiesTemp[cityKey].push(product);    
  
    //       })
    //       setStatus(STATUS_SUCCEEDED);
    //       setCategories(categoriesTemp);
    //       setCategoriesMenu(categoriesTemp);
    //       setStatesMenu(statesTemp);
    //       setCitiesMenu(citiesTemp);
    //     }
    // },[products]);

    useEffect(() => {
      updateMenues();
    }, [selections, products]);

    const instersectTwoLists = (list1, list2) => {

      if(list1 && list2) {
        return list1.filter(product => list2.includes(product));;
      }
      else if(list1){
        return list1;
      }
      else if(list2){
        return list2;
      }
      return null;
    }

    const updateMenues = () => {

      // const key = selectValue.split(' ').join('-');

      const productListFromCategory = categoriesDict[selections.category];
      const productListFromState = statesDict[selections.state];
      const productListFromCity = citiesDict[selections.city];

      console.log("productListFromCategory = ", productListFromCategory);
      console.log("productListFromState = ", productListFromState);
      console.log("productListFromCity = ", productListFromCity);

      let productList = [];
      productList = instersectTwoLists(productListFromCategory, productListFromState);
      productList = instersectTwoLists(productList, productListFromCity);
      console.log("productList = ", productList); 
      if(!productList){
        productList = products;
      }

      const categoriesTemp = {};
      const statesTemp = {};
      const citiesTemp = {};

      // const categoriesKeys = [];
      // const statesKeys = [];
      // const citiesKeys = [];

      if(productList.length !== 0){
        productList.forEach(product => {
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
          
          // categoriesKeys.push(categoryKey);  
          // statesKeys.push(stateKey);  
          // citiesKeys.push(cityKey);  
  
        })
        if(status === STATUS_LOADING){
          setStatus(STATUS_SUCCEEDED);
          setCategories(categoriesTemp);
          setCategoriesDict(categoriesTemp);
          setStatesDict(statesTemp);
          setCitiesDict(citiesTemp);
          // setCategoriesMenu(categoriesKeys);
          setCategoriesMenu(Object.keys(categoriesTemp));
        }
        else {
          setCategories(categoriesTemp);
        }
        // setCategoriesMenu(categoriesTemp);
        
        setStatesMenu(Object.keys(statesTemp));
        setCitiesMenu(Object.keys(citiesTemp));
      } else {
        setCategories({});
      }
      

    }

    const handleCategoriesMenu = (e) => {

      const key = e.target.value.split(' ').join('-');
      setSelections({...selections, category: key});
      // updateMenues('categories', e.target.value);
      console.log('category', key);
    }

    const handleStatesMenu = (e) => {
      const key = e.target.value.split(' ').join('-');
      setSelections({...selections, state: key});
      // updateMenues('states', e.target.value);
      console.log('state', key);
    }

    const handleCitiesMenu = (e) => {
      const key = e.target.value.split(' ').join('-');
      setSelections({...selections, city: key});
      // updateMenues('cities', e.target.value);
      console.log('city', e.target.value);
    }

    return (
      <div className={styles.search}>
        <h3  className='font20PX'>Filters</h3>
        <span className='line_seperated'></span>
        <div className={styles.drop_down}>
          <select className={`${styles.select} font17PX`} onChange={handleCategoriesMenu}>
            <option value=''>Products</option>
            {categoriesMenu && (
              categoriesMenu.map(cateogryKey => {
                // const cateogryKey = categoriesMenu[category][0].product_name;
                return <option key={cateogryKey} value={cateogryKey}>{cateogryKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`} onChange={handleStatesMenu}>
            <option value=''>States</option>
            {statesMenu && (
              statesMenu.map(stateKey => {
                // const stateKey = statesMenu[state][0].address.state;
                return <option key={stateKey} value={stateKey}>{stateKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`}  onChange={handleCitiesMenu}
          >
            <option value=''>Cities</option>
            {citiesMenu && (
              citiesMenu.map(cityKey => {
                // const cityKey = citiesMenu[city][0].address.city;
                return <option key={cityKey} value={cityKey}>{cityKey}</option>
              })
            )}
          </select>

        </div>
        
      </div>
    );
}
export default Search;