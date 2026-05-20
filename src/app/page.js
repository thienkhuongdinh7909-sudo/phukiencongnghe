import styles from "./page.module.css";
import { products } from "./data/products";
import Header from "./compoment/header/header";
import Footer from "./compoment/footer/footer";
import Link from "next/link";
export default function Home() {
 
  return (
    <div className={styles.container}>
      
<Header/>

      <div className={styles.item2}>
        <div className={styles.mainContent}>
          {products.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.mainProduct}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} referrerPolicy="no-referrer" />
                </div>
                <div className={styles.productName}>
                  <h5>{product.name}</h5>
                </div>
                <div className={styles.productPrice}>
                  <strong className={styles.price}>{product.price}</strong>
                  <span className={styles.discount}>
                    <label className={styles.oldPrice}>{product.oldPrice}</label>
                    <small className={styles.percent}>{product.discount}</small>
                  </span>
                </div>
                <div className={styles.productRemain}>{product.remain}</div>
              </div>

             <Link href={`/product/${product.id}`} className={styles.buyButton}>
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    <Footer/>
    </div>
  );
}
