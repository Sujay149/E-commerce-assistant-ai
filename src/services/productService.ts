
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}

// Mock product database with 100+ products
const mockProducts: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "4K Smart TV 55-inch",
    price: 649.99,
    description: "Ultra HD Smart TV with HDR, built-in streaming apps, and voice control.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    rating: 4.3,
    category: "Electronics",
    inStock: true
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with blue switches, perfect for gaming.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.7,
    category: "Electronics",
    inStock: true
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    price: 59.99,
    description: "High-precision wireless gaming mouse with customizable RGB lighting.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    rating: 4.4,
    category: "Electronics",
    inStock: true
  },
  {
    id: 5,
    name: "Smartphone 128GB",
    price: 699.99,
    description: "Latest smartphone with triple camera system and 5G connectivity.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    rating: 4.6,
    category: "Electronics",
    inStock: false
  },

  // Fashion
  {
    id: 6,
    name: "Classic Denim Jacket",
    price: 89.99,
    description: "Timeless denim jacket perfect for casual and semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
    rating: 4.2,
    category: "Fashion",
    inStock: true
  },
  {
    id: 7,
    name: "Running Sneakers",
    price: 119.99,
    description: "Comfortable running shoes with excellent cushioning and breathable material.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.5,
    category: "Fashion",
    inStock: true
  },
  {
    id: 8,
    name: "Leather Handbag",
    price: 159.99,
    description: "Elegant leather handbag with multiple compartments and adjustable strap.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.3,
    category: "Fashion",
    inStock: true
  },
  {
    id: 9,
    name: "Cotton T-Shirt Pack (3)",
    price: 34.99,
    description: "Pack of 3 premium cotton t-shirts in different colors.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.1,
    category: "Fashion",
    inStock: true
  },
  {
    id: 10,
    name: "Winter Wool Coat",
    price: 199.99,
    description: "Warm and stylish wool coat perfect for cold weather.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
    rating: 4.4,
    category: "Fashion",
    inStock: true
  },

  // Home & Garden
  {
    id: 11,
    name: "Robot Vacuum Cleaner",
    price: 299.99,
    description: "Smart robot vacuum with mapping technology and app control.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
    rating: 4.6,
    category: "Home & Garden",
    inStock: true
  },
  {
    id: 12,
    name: "Air Purifier HEPA Filter",
    price: 179.99,
    description: "Advanced air purifier with HEPA filter for clean, fresh air.",
    image: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=500",
    rating: 4.5,
    category: "Home & Garden",
    inStock: true
  },
  {
    id: 13,
    name: "Coffee Maker with Grinder",
    price: 149.99,
    description: "All-in-one coffee maker with built-in grinder and programmable settings.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    rating: 4.3,
    category: "Home & Garden",
    inStock: true
  },
  {
    id: 14,
    name: "Garden Tool Set",
    price: 79.99,
    description: "Complete 15-piece garden tool set with storage case.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    rating: 4.2,
    category: "Home & Garden",
    inStock: true
  },
  {
    id: 15,
    name: "Smart Thermostat",
    price: 199.99,
    description: "Wi-Fi enabled smart thermostat with energy-saving features.",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500",
    rating: 4.7,
    category: "Home & Garden",
    inStock: false
  },

  // Books
  {
    id: 16,
    name: "The Art of Programming",
    price: 49.99,
    description: "Comprehensive guide to modern programming practices and algorithms.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    rating: 4.8,
    category: "Books",
    inStock: true
  },
  {
    id: 17,
    name: "Mystery Novel Collection",
    price: 29.99,
    description: "Set of 5 bestselling mystery novels from acclaimed authors.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    rating: 4.4,
    category: "Books",
    inStock: true
  },
  {
    id: 18,
    name: "Cookbook: World Cuisines",
    price: 39.99,
    description: "Explore 200+ recipes from different cultures around the world.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500",
    rating: 4.6,
    category: "Books",
    inStock: true
  },

  // Sports & Outdoors
  {
    id: 19,
    name: "Yoga Mat Premium",
    price: 49.99,
    description: "Non-slip premium yoga mat with alignment lines and carrying strap.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    rating: 4.5,
    category: "Sports & Outdoors",
    inStock: true
  },
  {
    id: 20,
    name: "Camping Tent 4-Person",
    price: 199.99,
    description: "Waterproof 4-person camping tent with easy setup system.",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=500",
    rating: 4.3,
    category: "Sports & Outdoors",
    inStock: true
  }
];

// Generate more products to reach 100+
const generateMoreProducts = (): Product[] => {
  const categories = ["Electronics", "Fashion", "Home & Garden", "Books", "Sports & Outdoors"];
  const adjectives = ["Premium", "Deluxe", "Professional", "Essential", "Advanced", "Compact", "Wireless", "Smart"];
  const products = ["Device", "Tool", "Accessory", "Kit", "Set", "System", "Solution", "Collection"];
  
  const additionalProducts: Product[] = [];
  
  for (let i = 21; i <= 120; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    additionalProducts.push({
      id: i,
      name: `${adjective} ${product} ${i}`,
      price: Math.floor(Math.random() * 500) + 19.99,
      description: `High-quality ${adjective.toLowerCase()} ${product.toLowerCase()} designed for optimal performance and durability.`,
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
      category,
      inStock: Math.random() > 0.1 // 90% in stock
    });
  }
  
  return additionalProducts;
};

const allProducts = [...mockProducts, ...generateMoreProducts()];

export const productService = {
  getAllProducts: (): Product[] => {
    return allProducts;
  },

  getProductById: (id: number): Product | undefined => {
    return allProducts.find(product => product.id === id);
  },

  searchProducts: (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  },

  getProductsByCategory: (category: string): Product[] => {
    return allProducts.filter(product => product.category === category);
  },

  getFeaturedProducts: (limit = 8): Product[] => {
    return allProducts
      .filter(product => product.rating >= 4.3)
      .slice(0, limit);
  }
};
