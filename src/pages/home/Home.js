import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Search from '../../components/search/Search';
import { GET_REQUEST_URL, STATUS_FAILED, STATUS_LOADING, STATUS_SUCCEEDED } from '../../constants';
import styles from './Home.module.css';
import Category from '../../components/category/Category';

function Home() {
    
    const [status, setStatus] = useState(STATUS_LOADING);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState({});
    
    return (
        <div className='app'>
            <Search setCategories={setCategories} status={status} setStatus={setStatus} setErrorMessage={setErrorMessage}/>
            <div className='main'>
                <h1 className={`${styles.header} font35PX`}>Edvora</h1>
                <h2 className={`${styles.header2} font25PX`}>Products</h2>
                {status === STATUS_LOADING && <p className='font20PX'>loading</p>}
                {status === STATUS_FAILED && <p style={{color: 'red'}} className='font20PX'>{errorMessage}</p>}
                {(status === STATUS_SUCCEEDED && Object.keys(categories).length !== 0)  && (
                    Object.keys(categories).map((category) => (
                        <Category key={category} products={categories[category]} />
                    ))
                )}
                {(status === STATUS_SUCCEEDED && Object.keys(categories).length === 0) && <p style={{marginTop:'20px'}} className='font20PX'> No products Found</p>}
            </div>
        </div>
    );
}

export default Home;