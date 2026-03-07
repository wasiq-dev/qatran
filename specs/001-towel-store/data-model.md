# Data Model: E-Commerce Towel Store

**Date**: 2025-01-27  
**Feature**: 001-towel-store

## Overview

This document defines the data structures for the e-commerce towel store. The model supports products with variants, shopping cart, orders, and customer information. Data is initially stored in JSON format but structured to support future API migration.

## Core Entities

### Product

Represents a towel or related product available for sale.

```typescript
{
  id: string                    // Unique product identifier (e.g., "prod_001")
  name: string                 // Product name (e.g., "Premium Cotton Bath Towel")
  slug: string                  // URL-friendly identifier (e.g., "premium-cotton-bath-towel")
  description: string           // Full product description
  shortDescription?: string     // Brief description for listings
  category: string             // Category ID (e.g., "towels", "bathrobe", "bed-essential", "kids")
  basePrice: number            // Base price in smallest currency unit (e.g., cents, paise)
  currency: string             // Currency code (e.g., "PKR", "USD")
  images: string[]             // Array of image URLs (primary image first)
  specifications: {
    size?: string              // Product size (e.g., "27\" × 54\"")
    fabric?: string            // Fabric type (e.g., "100% Cotton", "Cotton Terry")
    gsm?: number              // GSM (Grams per Square Meter) if applicable
    careInstructions?: string  // Care instructions
    [key: string]: any         // Additional specifications
  }
  variants: ProductVariant[]   // Available variants (sizes, colors)
  inventory: {
    total: number             // Total available inventory
    reserved: number          // Reserved inventory (in carts)
    available: number         // Available = total - reserved
  }
  status: "active" | "inactive" | "out_of_stock"
  featured: boolean            // Show on homepage/featured section
  trending: boolean           // Show in trending section
  bestSeller: boolean         // Show in best sellers section
  relatedProducts?: string[]  // Array of related product IDs
  createdAt: string           // ISO 8601 timestamp
  updatedAt: string            // ISO 8601 timestamp
}
```

### ProductVariant

Represents a specific configuration of a product (size, color, etc.).

```typescript
{
  id: string                   // Unique variant identifier (e.g., "var_001")
  productId: string            // Parent product ID
  type: "size" | "color" | "other"  // Variant type
  name: string                 // Variant name (e.g., "Large", "Blue", "27\" × 54\"")
  value: string                // Variant value (e.g., "L", "#0066CC")
  priceAdjustment: number      // Price difference from base price (can be negative)
  sku?: string                 // Stock Keeping Unit
  inventory: {
    total: number
    reserved: number
    available: number
  }
  image?: string               // Variant-specific image URL (optional)
  status: "active" | "inactive" | "out_of_stock"
}
```

### Cart

Represents a customer's shopping cart (session-based).

```typescript
{
  id: string                   // Session-based cart ID (stored in localStorage)
  items: CartItem[]            // Array of cart items
  subtotal: number             // Sum of all item subtotals
  shippingCost: number         // Calculated shipping cost
  tax: number                  // Calculated tax
  total: number                // Total amount (subtotal + shipping + tax)
  currency: string             // Currency code
  createdAt: string            // ISO 8601 timestamp
  updatedAt: string            // ISO 8601 timestamp
}
```

### CartItem

Represents a single product variant in the shopping cart.

```typescript
{
  id: string                   // Unique cart item ID
  productId: string            // Product ID
  variantId: string            // Selected variant ID
  productName: string          // Snapshot of product name (for display)
  variantName: string          // Snapshot of variant name (for display)
  image: string                // Product/variant image URL
  quantity: number             // Quantity (must be > 0)
  unitPrice: number           // Price per unit at time of addition
  subtotal: number            // quantity * unitPrice
  available: boolean          // Whether variant is still available
}
```

### Order

Represents a completed purchase.

```typescript
{
  id: string                   // Unique order identifier (e.g., "ORD-20250127-001")
  orderNumber: string          // Human-readable order number
  customer: {
    name: string
    email: string
    phone: string
    shippingAddress: {
      street: string
      city: string
      state?: string
      postalCode: string
      country: string
    }
  }
  items: OrderItem[]           // Array of ordered items
  subtotal: number             // Sum of item subtotals
  shippingCost: number
  tax: number
  total: number                // Total amount charged
  currency: string
  payment: {
    method: "stripe" | "paypal" | "other"
    transactionId: string     // Payment gateway transaction ID
    status: "pending" | "completed" | "failed" | "refunded"
    processedAt?: string       // ISO 8601 timestamp
  }
  shipping: {
    status: "pending" | "processing" | "shipped" | "delivered"
    trackingNumber?: string
    estimatedDelivery?: string // ISO 8601 date
  }
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: string            // ISO 8601 timestamp
  updatedAt: string            // ISO 8601 timestamp
}
```

### OrderItem

Represents a product variant in an order (snapshot at time of purchase).

```typescript
{
  id: string                   // Unique order item ID
  productId: string
  variantId: string
  productName: string          // Snapshot at purchase time
  variantName: string          // Snapshot at purchase time
  quantity: number
  unitPrice: number            // Price at time of purchase
  subtotal: number             // quantity * unitPrice
}
```

## Category Structure

```typescript
{
  id: string                   // Category ID (e.g., "towels")
  name: string                 // Display name (e.g., "Towels")
  slug: string                 // URL-friendly identifier
  description?: string         // Category description
  image?: string               // Category image URL
  parentId?: string            // For nested categories (optional)
  order: number                // Display order
}
```

## Data Relationships

```
Product
  ├── has many ProductVariant
  ├── belongs to Category
  └── has many related Products (via relatedProducts array)

ProductVariant
  └── belongs to Product

Cart
  └── has many CartItem

CartItem
  ├── references Product
  └── references ProductVariant

Order
  ├── has many OrderItem
  └── references Payment (via payment.transactionId)

OrderItem
  ├── references Product (snapshot)
  └── references ProductVariant (snapshot)
```

## Validation Rules

### Product
- `id` must be unique and non-empty
- `name` must be non-empty, max 200 characters
- `basePrice` must be >= 0
- `images` must contain at least one image URL
- `category` must reference a valid category
- `status` must be one of: "active", "inactive", "out_of_stock"

### ProductVariant
- `id` must be unique and non-empty
- `productId` must reference an existing product
- `priceAdjustment` can be negative (for discounts)
- `inventory.available` must be >= 0
- `inventory.available` = `inventory.total` - `inventory.reserved`

### CartItem
- `quantity` must be > 0
- `quantity` must not exceed `variant.inventory.available`
- `unitPrice` must be >= 0
- `subtotal` must equal `quantity * unitPrice`

### Order
- `orderNumber` must be unique and follow format: "ORD-YYYYMMDD-XXX"
- `customer.email` must be valid email format
- `customer.phone` must be non-empty
- `total` must equal `subtotal + shippingCost + tax`
- `payment.status` must be one of: "pending", "completed", "failed", "refunded"

## State Transitions

### Product Status
```
active → inactive (admin action)
active → out_of_stock (inventory depleted)
out_of_stock → active (inventory restocked)
```

### Order Status
```
pending → confirmed (payment completed)
confirmed → shipped (order shipped)
shipped → delivered (order delivered)
[any] → cancelled (order cancelled)
```

### Payment Status
```
pending → completed (payment successful)
pending → failed (payment failed)
completed → refunded (refund processed)
```

## Data Storage

### Initial Implementation (JSON)
- Products: `src/data/products.json` (array of Product objects)
- Categories: `src/data/categories.json` (array of Category objects)
- Cart: `localStorage` (Cart object, key: "towel-store-cart")
- Orders: Not stored locally (handled by payment gateway/backend)

### Future API Migration
- Products: `GET /api/products`, `GET /api/products/:id`
- Categories: `GET /api/categories`
- Cart: `POST /api/cart`, `PUT /api/cart/:id`, `DELETE /api/cart/:id`
- Orders: `POST /api/orders`, `GET /api/orders/:id`
- Payment: `POST /api/payments/intent`, `POST /api/payments/confirm`

## Sample Data Structure

```json
{
  "products": [
    {
      "id": "prod_001",
      "name": "Premium Cotton Bath Towel",
      "slug": "premium-cotton-bath-towel",
      "description": "Luxurious 100% cotton bath towel...",
      "category": "towels",
      "basePrice": 99900,
      "currency": "PKR",
      "images": [
        "/images/products/towel-001-main.jpg",
        "/images/products/towel-001-detail.jpg"
      ],
      "specifications": {
        "size": "27\" × 54\"",
        "fabric": "100% Cotton",
        "gsm": 600,
        "careInstructions": "Machine wash cold"
      },
      "variants": [
        {
          "id": "var_001",
          "productId": "prod_001",
          "type": "color",
          "name": "White",
          "value": "#FFFFFF",
          "priceAdjustment": 0,
          "inventory": {
            "total": 50,
            "reserved": 2,
            "available": 48
          },
          "status": "active"
        }
      ],
      "inventory": {
        "total": 50,
        "reserved": 2,
        "available": 48
      },
      "status": "active",
      "featured": true,
      "trending": false,
      "bestSeller": true,
      "createdAt": "2025-01-27T00:00:00Z",
      "updatedAt": "2025-01-27T00:00:00Z"
    }
  ],
  "categories": [
    {
      "id": "towels",
      "name": "Towels",
      "slug": "towels",
      "description": "Premium quality towels",
      "order": 1
    }
  ]
}
```



