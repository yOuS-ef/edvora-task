import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Search from '../../components/search/Search';
import { GET_REQUEST_URL, STATUS_FAILED, STATUS_LOADING, STATUS_SUCCEEDED } from '../../constants';
import styles from './Home.module.css';
import Category from '../../components/category/Category';

function Home() {
    // const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(STATUS_LOADING);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState({});
    // get products
    // each distinct product name will be key so it will convert to pattern of the key -
    // each key will put inside it value 
    // console.log(products);
    console.log(status);
    console.log(errorMessage);
    console.log('categories', categories);
    console.log('Object.keys(categories)', Object.keys(categories));

    // useEffect(() => {

    //     axios.get(GET_REQUEST_URL).then(result => {
    //         console.log(result);
    //         if(result.status === 200){
    //             setStatus(STATUS_SUCCEEDED);
    //             setProducts(result.data);
    //         }
    //         else {
    //             setStatus(STATUS_FAILED);
    //             setErrorMessage(result.data);
    //         }
    //     }).catch(err => {
    //         setStatus(STATUS_FAILED);
    //         setErrorMessage(err);
    //     })
    //     // fetch(GET_REQUEST_URL)
    //     // .then(response => response.json())
    //     // .then(data => console.log(data)); 
    // }, []);

    // useEffect(() => {

    //     if(products.length !== 0 && status === STATUS_SUCCEEDED){
    //         const categoriesTemp = {}
    //         products.forEach(product => {
    //             const categoryKey = product.product_name.split(' ').join('-');
    //             if (categoriesTemp[categoryKey] === undefined) {
    //                 categoriesTemp[categoryKey] = [product];
    //             }
    //             else{
    //                 categoriesTemp[categoryKey].push(product);
    //             }  
    //         })
    //         setCategories(categoriesTemp);
    //     }
    // },[products])
    
    return (
        <div className='app'>
            <Search setCategories={setCategories} status={status} setStatus={setStatus} setErrorMessage={setErrorMessage}/>
            <div className='main'>
                <h1 className={`${styles.header} font35PX`}>Edvora</h1>
                <h2 className={`${styles.header2} font25PX`}>Products</h2>
                {status === STATUS_LOADING && <p className='font20PX'>loading</p>}
                {status === STATUS_FAILED && <p className='font20PX'>Failed to fetch</p>}
                {(status === STATUS_SUCCEEDED && categories !== {})  && (
                    Object.keys(categories).map((category) => (
                        <Category key={category} products={categories[category]} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;