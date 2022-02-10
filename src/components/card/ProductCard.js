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
            <div style={{display:'flex', gap:'22px', marginBottom:'13px'}}>
                <img className={styles.product_img} src={product.image} alt='productImg'/>
                <div style={{display:'flex', flexDirection:'column', gap:'10px', wordBreak:'break-word'}}>
                    <p className='font15PX'>{product.product_name}</p>
                    <p  className={`${styles.dark_gray_color} font13PX`}>{product.brand_name}</p>
                    <p className='font13PX'><span className='font16PX'>$</span> {product.price}</p>
                </div> 
            </div>
            <div style={{display:'flex', gap:'4px', marginBottom:'13px', wordBreak:'break-word'}}>
                <p className={`${styles.dark_gray_color} font13PX`}>{product.address.state}/{product.address.city}</p>
                <p className={`${styles.dark_gray_color} font13PX`}><span className={`${styles.dark_gray_color} font12PX`}>Date:</span> {productDate}</p>
            </div>
            <p className={`${styles.dark_gray_color} font11PX`}>{product.discription}</p>
        </div>
    );
}

export default ProductCard;
