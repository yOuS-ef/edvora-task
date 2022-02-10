import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({product}) {

    const tempDate = new Date(product.date);
    const month = tempDate.getMonth() + 1;
    const productDate = tempDate.getDate() + ':' + month + ':' + tempDate.getFullYear();
    // console.log("productDate", productDate);
    // change size of card when hover on it 
    return (
        <div className={styles.product_card}>
            <div className={styles.product_image_name_brand_price}>
                <img className={styles.product_img} src={product.image} alt='productImg'/>
                <div className={styles.product_name_brand_price}>
                    <p className='font15PX'>{product.product_name}</p>
                    <p  className={`${styles.dark_gray_color} font13PX`}>{product.brand_name}</p>
                    <p className='font13PX'><span className='font16PX'>$</span> {product.price}</p>
                </div> 
            </div>
            <div className={styles.product_state_city_date}>
                <p className={`${styles.dark_gray_color} font13PX ${styles.address}`}>{product.address.state} / {product.address.city}</p>
                <p className={`${styles.dark_gray_color} font13PX ` }><span className={`${styles.dark_gray_color} font12PX`}>Date:</span> {productDate}</p>
            </div>
            
            <p className={`${styles.dark_gray_color} font11PX`}>{product.discription}</p>
        </div>
    );
}

export default ProductCard;
