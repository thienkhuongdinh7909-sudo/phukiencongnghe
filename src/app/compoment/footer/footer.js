"use client";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Cột 1: Brand */}
        <div className={styles.footerSection}>
          <h4 className={styles.logoText}>ACCESSORY<span>HUB</span></h4>
          <p className={styles.brandDesc}>
            Cung cấp phụ kiện máy tính cao cấp và giải pháp công nghệ hiện đại. 
            Chất lượng khẳng định vị thế.
          </p>
          <div className={styles.socialTextLinks}>
            <a href="#">FACEBOOK</a>
            <a href="#">YOUTUBE</a>
            <a href="#">DISCORD</a>
          </div>
        </div>

        {/* Cột 2: Customer Service */}
        <div className={styles.footerSection}>
          <h4>HỖ TRỢ</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Chính sách vận chuyển</a></li>
            <li><a href="#">Đổi trả & Hoàn tiền</a></li>
            <li><a href="#">Chính sách bảo hành</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li className={styles.contactInfo}>
              <span>HOTLINE:</span> 1900 xxxx <br />
              <span>EMAIL:</span> support@accessoryhub.vn
            </li>
          </ul>
        </div>

        {/* Cột 3: Quick Links */}
        <div className={styles.footerSection}>
          <h4>SẢN PHẨM</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Bàn phím cơ</a></li>
            <li><a href="#">Chuột Gaming</a></li>
            <li><a href="#">Linh kiện PC</a></li>
            <li><a href="#">Tản nhiệt & Case</a></li>
          </ul>
        </div>

        {/* Cột 4: Newsletter */}
        <div className={styles.footerSection}>
          <h4>BẢN TIN</h4>
          <p>Đăng ký để nhận ưu đãi sớm nhất.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>
              GỬI
            </button>
          </form>
          <div className={styles.secureTag}>
            <span>●</span> THANH TOÁN BẢO MẬT
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          &copy; 2026 ACCESSORYHUB. ALL RIGHTS RESERVED.
        </div>
        <div className={styles.footerBottomLinks}>
          <a href="#">BẢO MẬT</a>
          <a href="#">ĐIỀU KHOẢN</a>
          <a href="#">COOKIES</a>
        </div>
      </div>
    </footer>
  );
}