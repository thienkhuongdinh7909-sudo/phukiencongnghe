import styles from "./header.module.css";
export default function Header() {
    return (

          <div className={styles.header}>
            <nav className={styles.nav}>
              <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Categories</li>
                <li>About</li>
              </ul>
            </nav>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>AccessoryHub</div>
            </div>
          </div>

  );
}