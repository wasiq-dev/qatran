# API Contracts: E-Commerce Towel Store

**Date**: 2025-01-27  
**Feature**: 001-towel-store  
**Status**: Future API Integration (Initial implementation uses JSON files)

## Overview

This document defines API contracts for future backend integration. The frontend is designed to work with these contracts, allowing seamless migration from JSON files to API endpoints.

## Base URL

```
Production: https://api.towelstore.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All API requests (except public endpoints) require authentication:

```
Authorization: Bearer <token>
```

## Products API

### GET /products

Get list of products with optional filtering.

**Query Parameters:**
- `category` (string, optional): Filter by category ID
- `search` (string, optional): Search by product name/description
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `size` (string, optional): Filter by size variant
- `color` (string, optional): Filter by color variant
- `featured` (boolean, optional): Show only featured products
- `trending` (boolean, optional): Show only trending products
- `bestSeller` (boolean, optional): Show only best sellers
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20, max: 100)

**Response:**
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
      "images": ["/images/products/towel-001-main.jpg"],
      "specifications": {
        "size": "27\" × 54\"",
        "fabric": "100% Cotton"
      },
      "variants": [
        {
          "id": "var_001",
          "type": "color",
          "name": "White",
          "value": "#FFFFFF",
          "priceAdjustment": 0,
          "inventory": {
            "available": 48
          },
          "status": "active"
        }
      ],
      "inventory": {
        "available": 48
      },
      "status": "active",
      "featured": true,
      "trending": false,
      "bestSeller": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid query parameters
- `500 Internal Server Error`: Server error

### GET /products/:id

Get single product by ID.

**Path Parameters:**
- `id` (string, required): Product ID

**Response:**
```json
{
  "id": "prod_001",
  "name": "Premium Cotton Bath Towel",
  "slug": "premium-cotton-bath-towel",
  "description": "Full product description...",
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
  "relatedProducts": ["prod_002", "prod_003"],
  "createdAt": "2025-01-27T00:00:00Z",
  "updatedAt": "2025-01-27T00:00:00Z"
}
```

**Status Codes:**
- `200 OK`: Success
- `404 Not Found`: Product not found
- `500 Internal Server Error`: Server error

## Categories API

### GET /categories

Get list of all categories.

**Response:**
```json
{
  "categories": [
    {
      "id": "towels",
      "name": "Towels",
      "slug": "towels",
      "description": "Premium quality towels",
      "image": "/images/categories/towels.jpg",
      "order": 1
    },
    {
      "id": "bathrobe",
      "name": "Bathrobe",
      "slug": "bathrobe",
      "description": "Comfortable bathrobes",
      "image": "/images/categories/bathrobe.jpg",
      "order": 2
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Success
- `500 Internal Server Error`: Server error

## Cart API

### POST /cart

Create or update shopping cart.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod_001",
      "variantId": "var_001",
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "id": "cart_abc123",
  "items": [
    {
      "id": "item_001",
      "productId": "prod_001",
      "variantId": "var_001",
      "productName": "Premium Cotton Bath Towel",
      "variantName": "White",
      "image": "/images/products/towel-001-main.jpg",
      "quantity": 2,
      "unitPrice": 99900,
      "subtotal": 199800,
      "available": true
    }
  ],
  "subtotal": 199800,
  "shippingCost": 0,
  "tax": 0,
  "total": 199800,
  "currency": "PKR"
}
```

**Status Codes:**
- `200 OK`: Cart updated
- `201 Created`: Cart created
- `400 Bad Request`: Invalid cart data
- `404 Not Found`: Product or variant not found
- `422 Unprocessable Entity`: Insufficient inventory
- `500 Internal Server Error`: Server error

### GET /cart/:id

Get cart by ID.

**Path Parameters:**
- `id` (string, required): Cart ID

**Response:** Same as POST /cart

**Status Codes:**
- `200 OK`: Success
- `404 Not Found`: Cart not found
- `500 Internal Server Error`: Server error

### DELETE /cart/:id/item/:itemId

Remove item from cart.

**Path Parameters:**
- `id` (string, required): Cart ID
- `itemId` (string, required): Cart item ID

**Response:**
```json
{
  "id": "cart_abc123",
  "items": [],
  "subtotal": 0,
  "shippingCost": 0,
  "tax": 0,
  "total": 0,
  "currency": "PKR"
}
```

**Status Codes:**
- `200 OK`: Item removed
- `404 Not Found`: Cart or item not found
- `500 Internal Server Error`: Server error

## Orders API

### POST /orders

Create a new order from cart.

**Request Body:**
```json
{
  "cartId": "cart_abc123",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Lahore",
      "state": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan"
    }
  },
  "paymentMethod": "stripe"
}
```

**Response:**
```json
{
  "id": "ord_001",
  "orderNumber": "ORD-20250127-001",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Lahore",
      "state": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan"
    }
  },
  "items": [
    {
      "id": "item_001",
      "productId": "prod_001",
      "variantId": "var_001",
      "productName": "Premium Cotton Bath Towel",
      "variantName": "White",
      "quantity": 2,
      "unitPrice": 99900,
      "subtotal": 199800
    }
  ],
  "subtotal": 199800,
  "shippingCost": 50000,
  "tax": 24975,
  "total": 274775,
  "currency": "PKR",
  "payment": {
    "method": "stripe",
    "intentId": "pi_abc123",
    "status": "pending",
    "clientSecret": "pi_abc123_secret_xyz"
  },
  "status": "pending",
  "createdAt": "2025-01-27T12:00:00Z"
}
```

**Status Codes:**
- `201 Created`: Order created
- `400 Bad Request`: Invalid order data
- `404 Not Found`: Cart not found
- `422 Unprocessable Entity`: Insufficient inventory or invalid cart
- `500 Internal Server Error`: Server error

### GET /orders/:id

Get order by ID.

**Path Parameters:**
- `id` (string, required): Order ID

**Response:** Same structure as POST /orders response

**Status Codes:**
- `200 OK`: Success
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server error

## Payment API

### POST /payments/intent

Create payment intent for order.

**Request Body:**
```json
{
  "orderId": "ord_001",
  "paymentMethod": "stripe"
}
```

**Response:**
```json
{
  "intentId": "pi_abc123",
  "clientSecret": "pi_abc123_secret_xyz",
  "amount": 274775,
  "currency": "PKR",
  "status": "requires_payment_method"
}
```

**Status Codes:**
- `201 Created`: Payment intent created
- `400 Bad Request`: Invalid request
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server error

### POST /payments/confirm

Confirm payment completion.

**Request Body:**
```json
{
  "orderId": "ord_001",
  "paymentIntentId": "pi_abc123",
  "paymentMethod": "stripe"
}
```

**Response:**
```json
{
  "orderId": "ord_001",
  "orderNumber": "ORD-20250127-001",
  "payment": {
    "method": "stripe",
    "transactionId": "ch_abc123",
    "status": "completed",
    "processedAt": "2025-01-27T12:05:00Z"
  },
  "status": "confirmed"
}
```

**Status Codes:**
- `200 OK`: Payment confirmed
- `400 Bad Request`: Invalid payment data
- `402 Payment Required`: Payment failed
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server error

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `INSUFFICIENT_INVENTORY`: Not enough stock available
- `PAYMENT_FAILED`: Payment processing failed
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API rate limits:
- Public endpoints: 100 requests per minute per IP
- Authenticated endpoints: 1000 requests per minute per user
- Payment endpoints: 10 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```



