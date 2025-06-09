
# API Documentation

## Overview

This document describes the mock API services used in the e-commerce chatbot platform. These services simulate real backend functionality for development and demonstration purposes.

## Services Architecture

### Chat Service (`/src/services/chatService.ts`)

Handles all chatbot interactions and AI response simulation.

#### `sendMessage(message: string)`

**Purpose**: Process user messages and generate AI responses with optional product recommendations.

**Parameters**:
- `message` (string): User input message

**Returns**:
```typescript
Promise<{
  message: string;
  products?: Product[];
}>
```

**Example Usage**:
```typescript
const response = await chatService.sendMessage("Show me wireless headphones");
console.log(response.message); // AI response text
console.log(response.products); // Array of recommended products
```

**Supported Query Types**:
- Product search queries
- Price range requests
- Category browsing
- Trending product requests
- Budget-friendly recommendations
- Top-rated products

### Product Service (`/src/services/productService.ts`)

Manages product data and catalog operations.

#### `getAllProducts()`

**Purpose**: Retrieve all available products from the mock database.

**Returns**:
```typescript
Product[]
```

**Product Interface**:
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}
```

#### `getProductsByCategory(category: string)`

**Purpose**: Filter products by specific category.

**Parameters**:
- `category` (string): Product category name

**Returns**:
```typescript
Product[]
```

#### `searchProducts(query: string)`

**Purpose**: Search products by name or description.

**Parameters**:
- `query` (string): Search term

**Returns**:
```typescript
Product[]
```

## Mock Data Structure

### Product Categories
- Electronics
- Clothing
- Home & Garden
- Sports & Outdoors
- Books
- Beauty & Personal Care

### Sample Product Data
```json
{
  "id": 1,
  "name": "Wireless Bluetooth Headphones",
  "price": 79.99,
  "description": "High-quality wireless headphones with noise cancellation",
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "rating": 4.5,
  "category": "Electronics",
  "inStock": true
}
```

## Response Patterns

### Chat Response Patterns

**Product Recommendation Response**:
```typescript
{
  message: "I found some great wireless headphones for you! Here are my top recommendations:",
  products: [Product, Product, Product, Product]
}
```

**General Information Response**:
```typescript
{
  message: "I'd be happy to help you find the perfect products! What are you looking for today?"
}
```

**Error Response**:
```typescript
{
  message: "I'm sorry, I'm having trouble processing your request right now. Please try again. 🔄"
}
```

## Integration Examples

### Component Integration

```typescript
// In a React component
const handleSendMessage = async (message: string) => {
  try {
    const response = await chatService.sendMessage(message);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: response.message,
      isBot: true,
      products: response.products
    }]);
  } catch (error) {
    console.error('Chat service error:', error);
  }
};
```

### Product Catalog Integration

```typescript
// Loading products in catalog
useEffect(() => {
  const products = productService.getAllProducts();
  setProducts(products);
}, []);

// Filtering products
const filteredProducts = useMemo(() => {
  return productService.searchProducts(searchTerm);
}, [searchTerm]);
```

## Error Handling

### Service Error Patterns

All services implement consistent error handling:

```typescript
try {
  const result = await service.method(params);
  return result;
} catch (error) {
  console.error('Service error:', error);
  throw new Error('Service unavailable');
}
```

### Client-Side Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

const handleServiceCall = async () => {
  try {
    setError(null);
    const result = await service.method();
    // Handle success
  } catch (err) {
    setError('Something went wrong. Please try again.');
  }
};
```

## Performance Considerations

### Response Timing

- Chat responses: 1-2 second delay to simulate AI processing
- Product searches: Immediate response
- Image loading: Lazy loading implementation

### Caching Strategy

```typescript
// Simple in-memory caching for product data
const productCache = new Map();

const getCachedProducts = (category: string) => {
  if (productCache.has(category)) {
    return productCache.get(category);
  }
  
  const products = getProductsByCategory(category);
  productCache.set(category, products);
  return products;
};
```

## Future Backend Integration

### Supabase Integration Points

When integrating with a real backend (like Supabase):

1. **Replace mock services** with actual API calls
2. **Update interfaces** to match backend schemas
3. **Implement authentication** with real user management
4. **Add data persistence** for cart and user preferences
5. **Integrate payment processing** for real transactions

### API Endpoint Mapping

```typescript
// Future real API endpoints
const API_ENDPOINTS = {
  CHAT: '/api/chat/message',
  PRODUCTS: '/api/products',
  CART: '/api/cart',
  AUTH: '/api/auth',
  ORDERS: '/api/orders'
};
```

This documentation provides a complete reference for the current mock API implementation and serves as a foundation for future backend integration.
