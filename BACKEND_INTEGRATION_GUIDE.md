## Backend Integration Guide for SEO-Friendly URLs & Database

This guide explains how to implement your backend API to support the SSR + SEO structure with slug-based URLs.

### 1. Database Schema (MongoDB Example)

```javascript
// Product Model
const productSchema = {
  _id: ObjectId,
  id: Number,  // Unique product ID
  name: String,
  slug: String,  // e.g., "elegant-evening-maxi-dress-1"
  categorySlug: String,  // e.g., "evening-dresses"
  category: String,
  description: String,
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviews: Number,
  image: String,
  stock: Number,
  colors: [String],
  sizes: [String],
  material: String,
  care: String,
  features: [String],
  // SEO Fields
  metaTitle: String,  // Optional: Override default title
  metaDescription: String,  // Optional: Override default description
  seoKeywords: [String],  // Additional keywords for SEO
  createdAt: Date,
  updatedAt: Date
};
```

### 2. API Endpoints

#### A. Get All Products (for SSR on Products Page)
```
GET /api/products
Query Params:
  - category: string (optional)
  - search: string (optional)
  - sort: string (optional) - "price-asc", "price-desc", "rating", "newest"
  - limit: number (optional, default: 50)

Response:
{
  success: true,
  data: [
    {
      id: 1,
      name: "Elegant Evening Maxi Dress",
      slug: "elegant-evening-maxi-dress-1",
      categorySlug: "evening-dresses",
      price: 2499,
      ...
    }
  ],
  total: 12
}
```

#### B. Get Single Product by Slug (for SSR on Product Detail Page)
```
GET /api/products/:slug
URL Format: /api/products/elegant-evening-maxi-dress-1

Response:
{
  success: true,
  data: {
    id: 1,
    name: "Elegant Evening Maxi Dress",
    slug: "elegant-evening-maxi-dress-1",
    categorySlug: "evening-dresses",
    category: "Evening Dresses",
    price: 2499,
    originalPrice: 4999,
    description: "...",
    rating: 4.5,
    reviews: 328,
    image: "...",
    stock: 45,
    colors: ["Black", "Navy", "Maroon"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "95% Polyester, 5% Elastane",
    care: "Hand wash recommended",
    features: ["Floor Length", "Zip Closure", "Breathable", "Comfortable Fit"],
    metaTitle: "Elegant Evening Maxi Dress | Buy Online",
    metaDescription: "Stunning black maxi dress perfect for evening events..."
  }
}
```

#### C. Get Related Products (for Product Detail Page)
```
GET /api/products/:slug/related
Query Params:
  - limit: number (optional, default: 4)

Response:
{
  success: true,
  data: [
    { id: 5, name: "Party Sequin Dress", ... },
    { id: 8, name: "Mini Bodycon Dress", ... }
  ]
}
```

### 3. Example Express.js Backend Implementation

```javascript
// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products (SSR endpoint)
router.get('/api/products', async (req, res) => {
  try {
    const { category, search, sort, limit = 50 } = req.query;
    
    let filter = {};
    
    // Category filter
    if (category && category !== 'All Products') {
      filter.category = category;
    }
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    let query = Product.find(filter).limit(parseInt(limit));
    
    // Sorting
    if (sort === 'price-asc') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      query = query.sort({ price: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    }
    
    const products = await query.exec();
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      data: products,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product by slug (SSR endpoint)
router.get('/api/products/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // If slug contains hyphenated ID at end, extract it
    // e.g., "elegant-evening-maxi-dress-1" -> productId = 1
    const parts = slug.split('-');
    const productId = parseInt(parts[parts.length - 1]);
    
    const product = await Product.findOne({
      $or: [
        { slug: slug },
        { id: productId }
      ]
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get related products by category
router.get('/api/products/:slug/related', async (req, res) => {
  try {
    const { slug } = req.params;
    const { limit = 4 } = req.query;
    
    // Get the main product
    const parts = slug.split('-');
    const productId = parseInt(parts[parts.length - 1]);
    
    const mainProduct = await Product.findOne({
      $or: [
        { slug: slug },
        { id: productId }
      ]
    });
    
    if (!mainProduct) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    // Get related products (same category, exclude current)
    const related = await Product.find({
      category: mainProduct.category,
      _id: { $ne: mainProduct._id }
    }).limit(parseInt(limit));
    
    res.json({
      success: true,
      data: related
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

### 4. Update Frontend API Utility ([utils/api.js](utils/api.js))

```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Get all products
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get single product by slug
  getProductBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  // Get related products
  getRelatedProducts: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/related`);
    if (!response.ok) throw new Error('Failed to fetch related products');
    return response.json();
  },
};
```

### 5. Update Page Components to Fetch from Backend

#### Example: Update [src/app/products/page.js](src/app/products/page.js)

```javascript
import { api } from '@/utils/api';
import ProductsPageContent from '@/components/ProductsPageContent';

export async function generateMetadata() {
  return {
    title: 'Shop Women\'s Dresses Online | All Products | Murgan Store',
    description: 'Browse our complete collection of women\'s dresses with fast shipping...',
  };
}

export default async function ProductsPage() {
  try {
    const response = await api.getProducts();
    const initialProducts = response.data;
    
    return (
      <ProductsPageContent initialProducts={initialProducts} />
    );
  } catch (error) {
    console.error('Failed to load products:', error);
    return (
      <div className="container-custom py-12 text-center">
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }
}
```

#### Example: Update Product Detail Page

```javascript
import { api } from '@/utils/api';
import { extractIdFromSlug } from '@/utils/slugHelpers';
import ProductDetailsContent from '@/components/ProductDetailsContent';

export async function generateMetadata({ params }) {
  try {
    const response = await api.getProductBySlug(params.slug);
    const product = response.data;

    return {
      title: product.metaTitle || `${product.name} | Buy Online at Murgan Store`,
      description: product.metaDescription || product.description,
      keywords: product.seoKeywords?.join(', ') || `${product.name}, ${product.category}`,
      openGraph: {
        title: product.name,
        description: product.description,
        image: product.image,
        type: 'product',
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await api.getProducts({ limit: 1000 });
    return response.data.map((product) => ({
      categorySlug: product.categorySlug,
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  try {
    const response = await api.getProductBySlug(params.slug);
    const product = response.data;

    return (
      <ProductDetailsContent 
        product={product} 
        categorySlug={params.categorySlug} 
        slug={params.slug} 
      />
    );
  } catch (error) {
    return (
      <div className="container-custom py-12 text-center">
        <p>Product not found.</p>
      </div>
    );
  }
}
```

### 6. Environment Variables (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 7. Key Points for SEO

1. **URL Structure**: Use categorySlug + productSlug
   - ✅ `https://yourshop.com/women-kurtis/floral-cotton-kurti-123456`
   - ❌ `https://yourshop.com/products/123456`

2. **Server-Side Rendering (SSR)**: 
   - All product pages are now rendered server-side
   - Google bots get fully rendered HTML with metadata
   - Better performance and SEO

3. **Meta Tags**:
   - Dynamic `title` and `description` from database
   - Open Graph tags for social sharing
   - Structured data (JSON-LD) can be added for rich snippets

4. **Static Generation (ISR)**:
   - Use `generateStaticParams()` to pre-render popular products
   - Use revalidation to update pages periodically
   ```javascript
   export const revalidate = 3600; // Revalidate every hour
   ```

5. **Sitemap Generation** (optional, for better SEO):
   ```
   Create: src/app/sitemap.js
   
   export default async function sitemap() {
     const response = await api.getProducts({ limit: 1000 });
     return response.data.map(product => ({
       url: `https://yourshop.com/products/${product.categorySlug}/${product.slug}`,
       lastModified: product.updatedAt,
       changeFrequency: 'weekly',
       priority: 0.8,
     }));
   }
   ```

6. **Robots.txt** (for search engines):
   ```
   Create: public/robots.txt
   
   User-agent: *
   Allow: /
   Disallow: /admin
   Disallow: /api
   
   Sitemap: https://yourshop.com/sitemap.xml
   ```

### 8. Testing

1. **SSR Check**: View page source in browser, verify products are in HTML
2. **URL Structure**: Verify URLs follow slug format
3. **Metadata**: Use SEO checker tools or browser console to verify meta tags
4. **Google Search Console**: Submit sitemap and monitor indexing

This setup makes your e-commerce store fully SEO-optimized and production-ready!
