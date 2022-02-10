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
    const [selectionsBollean, setSelectionsBollean] = useState({categoryIsSelected: false, stateIsSelected: false});
    const [dataIsFetched, setDataIsFetched] = useState(false);

    useEffect(() => {

      axios.get(GET_REQUEST_URL).then(result => {
        console.log(result);
        if(result.status === 200){
            
          setProducts(result.data);
          setDataIsFetched(true);
        }
        else {
          setDataIsFetched(false);
          setStatus(STATUS_FAILED);
          setErrorMessage(result.data);
        }
      }).catch(err => {
        setStatus(STATUS_FAILED);
        setErrorMessage(err);
        setDataIsFetched(false);
      })

    }, []);

    const fullDicsWithData = (productList) => {

      const categoriesTemp = {};
      const statesTemp = {};
      const citiesTemp = {};

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

      })   

      return {categoriesTemp, statesTemp, citiesTemp};
    }

    useEffect(() => {

      if(dataIsFetched && products.length !== 0) {

        const {categoriesTemp, statesTemp, citiesTemp} = fullDicsWithData(products);
  
        setCategories(categoriesTemp);
        setStatus(STATUS_SUCCEEDED);
        setCategoriesDict(categoriesTemp);
        setStatesDict(statesTemp);
        setCitiesDict(citiesTemp);
        setCategoriesMenu(Object.keys(categoriesTemp));
        setStatesMenu(Object.keys(statesTemp));
        setCitiesMenu(Object.keys(citiesTemp));
      }
      else if (status === STATUS_LOADING && dataIsFetched && products.length === 0){
        setStatus(STATUS_SUCCEEDED);
        setCategories({});
      }
      
    }, [products, dataIsFetched]);

    useEffect(() => {
      updateMenues();
    }, [selections, dataIsFetched]);

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

      if(Object.keys(categoriesDict).length !== 0 && Object.keys(statesDict).length !== 0 && Object.keys(citiesDict).length !== 0) {

        const productListFromCategory = categoriesDict[selections.category];
        const productListFromState = statesDict[selections.state];
        const productListFromCity = citiesDict[selections.city];
 
        let productList = [];
        productList = instersectTwoLists(productListFromCategory, productListFromState);
        productList = instersectTwoLists(productList, productListFromCity);

        if(!productList) {
          productList = products;
        }
        if(productList.length !== 0) {

          const {categoriesTemp, statesTemp, citiesTemp}= fullDicsWithData(productList);

          setCategories(categoriesTemp);

          if(selectionsBollean.categoryIsSelected)
            setStatesMenu(Object.keys(statesTemp));
          if(selectionsBollean.stateIsSelected)  
            setCitiesMenu(Object.keys(citiesTemp));
        }
        else {
          setCategories({});
        }

      }
      

      // console.log("productListFromCategory = ", productListFromCategory);
      // console.log("productListFromState = ", productListFromState);
      // console.log("productListFromCity = ", productListFromCity);

      // let productList = [];
      // productList = instersectTwoLists(productListFromCategory, productListFromState);
      // productList = instersectTwoLists(productList, productListFromCity);
      // console.log("productList = ", productList); 
      // if(!productList){
      //   productList = products;
      // }

      // const categoriesTemp = {};
      // const statesTemp = {};
      // const citiesTemp = {};

      // if(productList.length !== 0){
      //   productList.forEach(product => {
      //     const categoryKey = product.product_name.split(' ').join('-');
      //     const stateKey = product.address.state.split(' ').join('-');
      //     const cityKey = product.address.city.split(' ').join('-');
  
      //     if (categoriesTemp[categoryKey] === undefined)
      //       categoriesTemp[categoryKey] = [product];
      //     else 
      //       categoriesTemp[categoryKey].push(product);
          
      //     if (statesTemp[stateKey] === undefined) 
      //       statesTemp[stateKey] = [product];
      //     else
      //       statesTemp[stateKey].push(product);
  
      //     if (citiesTemp[cityKey] === undefined) 
      //       citiesTemp[cityKey] = [product];
      //     else
      //       citiesTemp[cityKey].push(product);
  
      //   })
      //   if(status === STATUS_LOADING){
      //     setStatus(STATUS_SUCCEEDED);
      //     setCategories(categoriesTemp);
      //     setCategoriesDict(categoriesTemp);
      //     setStatesDict(statesTemp);
      //     setCitiesDict(citiesTemp);
      //     setCategoriesMenu(Object.keys(categoriesTemp));
      //   }
      //   else {
      //     setCategories(categoriesTemp);
      //   }

      //   if(selectionsBollean.categoryIsSelected)
      //     setStatesMenu(Object.keys(statesTemp));
      //   if(selectionsBollean.stateIsSelected)  
      //     setCitiesMenu(Object.keys(citiesTemp));
      // } else {
      //   if(status === STATUS_LOADING && dataIsFetched){
      //     setStatus(STATUS_SUCCEEDED);
      //   }
      //   setCategories({});
      // }
    }

    const handleCategoriesMenu = (e) => {

      const key = e.target.value.split(' ').join('-');
      setSelectionsBollean({categoryIsSelected: true, stateIsSelected: false});
      setSelections({...selections, category: key});

    }

    const handleStatesMenu = (e) => {
      const key = e.target.value.split(' ').join('-');
      setSelectionsBollean({categoryIsSelected: false, stateIsSelected: true});
      setSelections({...selections, state: key});
    }

    const handleCitiesMenu = (e) => {
      const key = e.target.value.split(' ').join('-');
      setSelectionsBollean({categoryIsSelected: false, stateIsSelected: false});
      setSelections({...selections, city: key});

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
               
                return <option key={cateogryKey} value={cateogryKey}>{cateogryKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`} onChange={handleStatesMenu}>
            <option value=''>States</option>
            {statesMenu && (
              statesMenu.map(stateKey => {
      
                return <option key={stateKey} value={stateKey}>{stateKey}</option>
              })
            )}
          </select>

          <select className={`${styles.select} font17PX`}  onChange={handleCitiesMenu}
          >
            <option value=''>Cities</option>
            {citiesMenu && (
              citiesMenu.map(cityKey => {

                return <option key={cityKey} value={cityKey}>{cityKey}</option>
              })
            )}
          </select>

        </div>
        
      </div>
    );
}
export default Search;