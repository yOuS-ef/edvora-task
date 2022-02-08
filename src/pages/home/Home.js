import React, { useEffect, useState } from 'react';
import Search from '../../components/search/Search';
import styles from './Home.module.css';

function Home() {
    const [products, setProducts] = useState([]);
    // https://assessment-edvora.herokuapp.com
    useEffect(() => {
        
    }, []);
    return (
        <div className='app'>
            <Search />
            <div className='main'>
                <h1 className={`${styles.header} font35PX`}>Edvora</h1>
                <h2 className={`${styles.header2} font25PX`}>Products</h2>
                {/* list of categories */}
            </div>
        </div>
    );
}

export default Home;