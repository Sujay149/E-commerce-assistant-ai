
import { productService } from './productService';

interface ChatResponse {
  message: string;
  products?: any[];
}

export const chatService = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    const lowercaseMessage = message.toLowerCase();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Product search queries
    if (lowercaseMessage.includes('search') || lowercaseMessage.includes('find') || lowercaseMessage.includes('looking for')) {
      const searchTerms = ['headphones', 'laptop', 'phone', 'shoes', 'jacket', 'book', 'coffee', 'camera'];
      const foundTerm = searchTerms.find(term => lowercaseMessage.includes(term));
      
      if (foundTerm) {
        const products = productService.searchProducts(foundTerm);
        return {
          message: `I found ${products.length} products related to "${foundTerm}". Here are some top recommendations:`,
          products: products.slice(0, 4)
        };
      }
    }

    // Category-based queries
    const categories = ['electronics', 'fashion', 'home', 'garden', 'books', 'sports', 'outdoors'];
    const foundCategory = categories.find(cat => lowercaseMessage.includes(cat));
    
    if (foundCategory) {
      let categoryName = foundCategory;
      if (foundCategory === 'home' || foundCategory === 'garden') {
        categoryName = 'Home & Garden';
      } else if (foundCategory === 'sports' || foundCategory === 'outdoors') {
        categoryName = 'Sports & Outdoors';
      } else {
        categoryName = foundCategory.charAt(0).toUpperCase() + foundCategory.slice(1);
      }
      
      const products = productService.getProductsByCategory(categoryName);
      return {
        message: `Here are some popular ${categoryName.toLowerCase()} products:`,
        products: products.slice(0, 4)
      };
    }

    // Price range queries
    if (lowercaseMessage.includes('cheap') || lowercaseMessage.includes('budget') || lowercaseMessage.includes('under')) {
      const allProducts = productService.getAllProducts();
      const budgetProducts = allProducts.filter(p => p.price < 50).slice(0, 4);
      return {
        message: "Here are some great budget-friendly options under $50:",
        products: budgetProducts
      };
    }

    if (lowercaseMessage.includes('expensive') || lowercaseMessage.includes('premium') || lowercaseMessage.includes('luxury')) {
      const allProducts = productService.getAllProducts();
      const premiumProducts = allProducts.filter(p => p.price > 200).slice(0, 4);
      return {
        message: "Here are some premium products for you:",
        products: premiumProducts
      };
    }

    // Recommendations
    if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggest') || lowercaseMessage.includes('popular')) {
      const featured = productService.getFeaturedProducts(4);
      return {
        message: "Here are our most popular and highly-rated products:",
        products: featured
      };
    }

    // Greetings and general responses
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return {
        message: "Hello! I'm here to help you find the perfect products. You can ask me to search for specific items, browse categories, or get recommendations. What are you looking for today?"
      };
    }

    if (lowercaseMessage.includes('help')) {
      return {
        message: "I can help you with:\n• Finding specific products (e.g., 'find headphones')\n• Browsing categories (e.g., 'show me electronics')\n• Price-based searches (e.g., 'budget items under $50')\n• Getting recommendations (e.g., 'what's popular?')\n\nWhat would you like to do?"
      };
    }

    if (lowercaseMessage.includes('thank')) {
      return {
        message: "You're welcome! Is there anything else I can help you find today?"
      };
    }

    // Default response with featured products
    const featured = productService.getFeaturedProducts(4);
    return {
      message: "I'm not sure I understand that request, but here are some popular products you might like. You can also try asking me to 'search for [item]' or 'show me [category]' for more specific results.",
      products: featured
    };
  }
};
