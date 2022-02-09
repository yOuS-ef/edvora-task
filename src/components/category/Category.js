import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../card/ProductCard';

import styles from './Category.module.css';

function Category({products}) {
    //console.log("list of products", products);

    const [scrollX, setScrollX] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);
    //sort products on date
    // container contains list and buttons left and right
        // button left disappear when position start from left and the same for right
        // or no buttons there when small content
    const scrllRef = useRef(null);

    const scroll = (shift) => {

        const element = scrllRef.current;
        element.scrollLeft +=  shift;
        setScrollX(element.scrollLeft);

        if(Math.floor(element.scrollWidth - element.scrollLeft) <= element.offsetWidth ) {
            setScrollEnd(true);
        }
        else {
            setScrollEnd(false);
        }
    }

    const handleScrollEvent = () => {

        const element = scrllRef.current;

        setScrollX(element.scrollLeft);
        if(Math.floor(element.scrollWidth - element.scrollLeft) <= element.offsetWidth ) {
            setScrollEnd(true);
        }
        else {
            setScrollEnd(false);
        }
    }

    useEffect(() => {

        products.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('list of sorted products', products);
        
        if (scrllRef.current && scrllRef?.current?.scrollWidth === scrllRef?.current?.offsetWidth) 
        {
            setScrollEnd(true);
        } 
        else {
            setScrollEnd(false);
        }
        return () => {};
      }, [products]);

    return (
        <div className={styles.category}>
            <h3 className={`${styles.category_title} font20PX`}>{products[0].product_name}</h3>
            <span className='line_seperated'></span>
            <div className={styles.product_list_with_buttons}>

                {scrollX !== 0 && <button className={styles.prev} onClick={() => scroll(-400)} >
                                    <i className="arrow left"></i>
                                  </button>
                }

                <div className={styles.product_list} ref={scrllRef} onScroll={handleScrollEvent}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
                {!scrollEnd && <button className={styles.next} onClick={() => scroll(400)} >
                                    <i className="arrow right"></i>
                               </button>
                }
            </div>

        </div>
    );
}

export default Category;