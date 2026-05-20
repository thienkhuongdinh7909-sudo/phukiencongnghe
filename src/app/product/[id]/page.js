"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "../../data/products";
import styles from "./page.module.css";
import Header from "../../compoment/header/header";
import Footer from "../../compoment/footer/footer";
export default function ProductDetailPage({ params }) {
  // Unwraps params nếu là Promise (ở một số phiên bản Next.js mới)
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    if (params) {
      // Vì params có thể là Promise trong Next.js 14-15
      Promise.resolve(params).then((res) => {
        setResolvedParams(res);
      });
    }
  }, [params]);

  // Khởi tạo các state để xử lý tương tác của người dùng
  const [activeTab, setActiveTab] = useState("specs");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  if (!resolvedParams) {
    return <div className={styles.loading}>Đang tải trang...</div>;
  }

  const { id } = resolvedParams;
  const productId = parseInt(id) || 1;

  // Tìm sản phẩm khớp với ID, nếu không thấy lấy sản phẩm đầu tiên làm mặc định
  const product = products.find((p) => p.id === productId) || products[0];

  // Set các tùy chọn mặc định ban đầu cho màu sắc và phiên bản sản phẩm
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  if (!selectedVersion && product.versions && product.versions.length > 0) {
    setSelectedVersion(product.versions[0]);
  }

  // Lọc ra các sản phẩm liên quan khác sản phẩm đang xem để đề xuất
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  // Xử lý tăng giảm số lượng sản phẩm mua
  const changeQuantity = (type) => {
    if (type === "decrease") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  // Hiển thị thông báo Toast đẹp đẽ khi khách hàng nhấn mua
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Danh sách các đánh giá khách hàng giả lập
  const mockReviews = [
    { name: "Nguyễn Văn Anh", rating: 5, date: "2 ngày trước", comment: "Sản phẩm dùng cực kỳ thích, đóng gói cẩn thận và giao siêu nhanh. Vote 5 sao!" },
    { name: "Trần Thị Mai", rating: 4, date: "1 tuần trước", comment: "Tông màu hồng của shop quá dễ thương, sản phẩm chất lượng ổn áp, nhân viên tư vấn nhiệt tình." },
    { name: "Lê Minh Tuấn", rating: 5, date: "2 tuần trước", comment: "Đã mua lần 2 ở đây, cực kỳ an tâm về uy tín chất lượng dịch vụ của cửa hàng." }
  ];

  return (
  <div><Header/>
    <div className={styles.detailContainer}>
        
      {/* Toast Alert Thông Báo */}
      {toastMessage && (
        <div className={styles.toastAlert}>
          <div className={styles.toastContent}>
            <svg className={styles.toastIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Đường dẫn điều hướng Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Trang chủ</Link>
        <span className={styles.divider}>/</span>
        <span className={styles.activeBreadcrumb}>{product.name}</span>
      </div>

      <div className={styles.productMainLayout}>
        {/* Phần 1: Bộ sưu tập hình ảnh tương tác */}
        <div className={styles.gallerySection}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={product.images ? product.images[activeImgIndex] : product.image} 
              alt={product.name} 
              className={styles.mainImg}
              referrerPolicy="no-referrer"
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnailList}>
              {product.images.map((imgUrl, index) => (
                <div 
                  key={index} 
                  className={`${styles.thumbnailItem} ${activeImgIndex === index ? styles.activeThumbnail : ""}`}
                  onClick={() => setActiveImgIndex(index)}
                >
                  <img src={imgUrl} alt={`${product.name} - ảnh ${index + 1}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phần 2: Nội dung thông tin, tùy chọn và mua hàng */}
        <div className={styles.infoSection}>
          <span className={styles.badgeSale}>ƯU ĐÃI ĐỘC QUYỀN</span>
          <h1 className={styles.detailName}>{product.name}</h1>
          <div className={styles.stockStatus}>
            <span className={styles.remainLabel}>{product.remain}</span>
            <span className={styles.soldLabel}>| Đã bán 238+</span>
          </div>

          <div className={styles.priceCard}>
            <span className={styles.detailPrice}>{product.price}</span>
            <span className={styles.detailOldPrice}>{product.oldPrice}</span>
            <span className={styles.detailDiscount}>{product.discount}</span>
          </div>

          {/* Bộ chọn màu sắc sản phẩm */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Màu sắc: <strong>{selectedColor}</strong></span>
              <div className={styles.optionButtons}>
                {product.colors.map((color) => (
                  <button 
                    key={color} 
                    className={`${styles.optBtn} ${selectedColor === color ? styles.selectedOptBtn : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bộ chọn phiên bản/cấu hình sản phẩm */}
          {product.versions && product.versions.length > 0 && (
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Phiên bản: <strong>{selectedVersion}</strong></span>
              <div className={styles.optionButtons}>
                {product.versions.map((ver) => (
                  <button 
                    key={ver} 
                    className={`${styles.optBtn} ${selectedVersion === ver ? styles.selectedOptBtn : ""}`}
                    onClick={() => setSelectedVersion(ver)}
                  >
                    {ver}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chọn số lượng mua */}
          <div className={styles.quantitySection}>
            <span className={styles.optionLabel}>Số lượng:</span>
            <div className={styles.quantityController}>
              <button onClick={() => changeQuantity("decrease")} className={styles.qtyBtn}>-</button>
              <span className={styles.qtyVal}>{quantity}</span>
              <button onClick={() => changeQuantity("increase")} className={styles.qtyBtn}>+</button>
            </div>
          </div>

          {/* Cụm nút kêu gọi hành động (Call To Action) */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.cartButton}
              onClick={() => triggerToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`)}
            >
              Thêm Vào Giỏ Hàng
            </button>
            <button 
              className={styles.checkoutButton}
              onClick={() => triggerToast(`Chuyển hướng đến cổng thanh toán cho ${quantity} sản phẩm!`)}
            >
              Mua Ngay - Giao Tận Nhà
            </button>
          </div>

          {/* Chính sách cam kết bán hàng */}
          <div className={styles.trustPolicy}>
            <div className={styles.policyItem}>
              <svg className={styles.policyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Chính Hãng</span>
            </div>
            <div className={styles.policyItem}>
              <svg className={styles.policyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
              </svg>
              <span>Đổi trả 7 ngày miễn phí</span>
            </div>
            <div className={styles.policyItem}>
              <svg className={styles.policyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Giao siêu tốc 2H toàn quốc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Thông Tin Chi Tiết / Thông số kỹ thuật / Đánh Giá */}
      <div className={styles.tabsSection}>
        <div className={styles.tabHeaders}>
          <button 
            className={`${styles.tabBtn} ${activeTab === "specs" ? styles.activeTabBtn : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Thông số kỹ thuật
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === "desc" ? styles.activeTabBtn : ""}`}
            onClick={() => setActiveTab("desc")}
          >
            Mô tả chi tiết
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTabBtn : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá từ khách hàng
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "specs" && (
            <div className={styles.specsTable}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className={styles.specsRow}>
                  <div className={styles.specName}>{key}</div>
                  <div className={styles.specValue}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "desc" && (
            <div className={styles.descriptionText}>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.reviewsList}>
              {mockReviews.map((rev, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewerName}>{rev.name}</span>
                    <span className={styles.reviewDate}>{rev.date}</span>
                  </div>
                  <div className={styles.ratingStars}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mục Sản Phẩm Đề Xuất Liên Quan */}
      <div className={styles.relatedSection}>
        <h2 className={styles.sectionTitle}>Sản Phẩm Bạn Sẽ Thích</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map((relProduct) => (
            <Link key={relProduct.id} href={`/product/${relProduct.id}`} className={styles.relatedCard}>
              <div className={styles.relatedImageWrapper}>
                <img src={relProduct.image} alt={relProduct.name} referrerPolicy="no-referrer" />
              </div>
              <div className={styles.relatedInfo}>
                <h3 className={styles.relatedName}>{relProduct.name}</h3>
                <div className={styles.relatedPriceGroup}>
                  <span className={styles.relPrice}>{relProduct.price}</span>
                  <span className={styles.relDiscount}>{relProduct.discount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}