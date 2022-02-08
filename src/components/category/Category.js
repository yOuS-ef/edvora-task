import React from 'react';
import styles from './Category.module.css';

function Category({title, product}) {

  return (
    <div className={styles.category}>
        <h3 className={`${styles.category_title} font20PX`}>Product Name</h3>
        <span className='line_seperated'></span>
        <div className={styles.product_list}>
            {/* list of cards */}
        </div>


    </div>
  );
}

export default Category;
