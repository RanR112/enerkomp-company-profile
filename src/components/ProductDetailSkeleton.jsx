import React from 'react';
import { motion } from 'framer-motion';

const ProductDetailSkeleton = () => {
    return (
        <div className="product-detail-page">
            {/* Breadcrumb Skeleton */}
            <motion.div
                className="breadcrumb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="skeleton skeleton-text" style={{ width: '60px' }}></div>
                <span>/</span>
                <div className="skeleton skeleton-text" style={{ width: '80px' }}></div>
                <span>/</span>
                <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
            </motion.div>

            {/* Product Detail Container Skeleton */}
            <motion.div
                className="product-detail-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Product Images Skeleton */}
                <div className="product-images-section">
                    <div className="main-image-container">
                        <div className="skeleton skeleton-image main-product-image"></div>
                    </div>

                    {/* Thumbnails Skeleton */}
                    <div className="image-thumbnails">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="thumbnail">
                                <div className="skeleton skeleton-image"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="product-info-section">
                    {/* Brand Logo Skeleton */}
                    <div className="brand-header">
                        <div className="skeleton skeleton-logo"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="skeleton skeleton-text" style={{ width: '70%', height: '36px', marginBottom: '12px' }}></div>
                    
                    {/* Subtitle Skeleton */}
                    <div className="skeleton skeleton-text" style={{ width: '50%', height: '20px', marginBottom: '24px' }}></div>

                    {/* Description Skeleton */}
                    <div className="product-description">
                        <div className="skeleton skeleton-text" style={{ width: '100%', marginBottom: '8px' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '95%', marginBottom: '8px' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '90%', marginBottom: '8px' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '85%' }}></div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="product-actions">
                        <div className="skeleton skeleton-button"></div>
                    </div>
                </div>
            </motion.div>

            {/* Specifications Skeleton */}
            <motion.div
                className="product-specifications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className="skeleton skeleton-text" style={{ width: '150px', height: '28px', marginBottom: '20px' }}></div>
                <div className="specs-grid">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className="spec-item">
                            <div className="skeleton skeleton-text" style={{ width: '100px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Features Skeleton */}
            <motion.div
                className="product-features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="skeleton skeleton-text" style={{ width: '100px', height: '28px', marginBottom: '20px' }}></div>
                <div className="features-grid">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="feature-item">
                            <div className="skeleton skeleton-icon"></div>
                            <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Related Products Skeleton */}
            <motion.div
                className="related-products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <div className="skeleton skeleton-text" style={{ width: '150px', height: '28px', marginBottom: '20px' }}></div>
                <div className="related-products-grid">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="product-card-skeleton">
                            <div className="skeleton skeleton-image" style={{ height: '250px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '80%', margin: '12px auto 8px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '60%', margin: '0 auto' }}></div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// CSS for skeleton loading
const style = document.createElement('style');
style.textContent = `
.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.skeleton-text {
    height: 16px;
    margin: 8px 0;
}

.skeleton-image {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
}

.skeleton-logo {
    width: 120px;
    height: 40px;
    margin-bottom: 16px;
}

.skeleton-button {
    width: 180px;
    height: 48px;
    border-radius: 8px;
}

.skeleton-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
}

.product-card-skeleton {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    background: #fff;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .skeleton {
        background: linear-gradient(
            90deg,
            #2a2a2a 25%,
            #3a3a3a 50%,
            #2a2a2a 75%
        );
        background-size: 200% 100%;
    }
    
    .product-card-skeleton {
        border-color: #3a3a3a;
        background: #1a1a1a;
    }
}
`;
document.head.appendChild(style);

export default ProductDetailSkeleton;