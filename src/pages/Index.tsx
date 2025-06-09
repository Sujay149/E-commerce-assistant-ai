
import { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ProductCatalog } from '../components/ProductCatalog';
import { ShoppingCart } from '../components/ShoppingCart';
import { AuthDialog } from '../components/AuthDialog';
import { Header } from '../components/Header';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingBag, Menu } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'products' | 'cart'>('chat');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find((item: any) => item.id === product.id);
      if (existing) {
        return prev.map((item: any) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter((item: any) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map((item: any) => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header 
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={() => {
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');
        }}
        cartItemCount={cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full justify-start"
          >
            <Menu className="h-4 w-4 mr-2" />
            Navigation Menu
          </Button>
          
          {isMobileMenuOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border">
              <div className="space-y-2">
                <Button
                  variant={activeView === 'chat' ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveView('chat');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Assistant
                </Button>
                <Button
                  variant={activeView === 'products' ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveView('products');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
                <Button
                  variant={activeView === 'cart' ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveView('cart');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shopping Cart ({cartItems.length})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 border">
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveView('chat')}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat Assistant</span>
              </Button>
              <Button
                variant={activeView === 'products' ? 'default' : 'ghost'}
                onClick={() => setActiveView('products')}
                className="flex items-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Products</span>
              </Button>
              <Button
                variant={activeView === 'cart' ? 'default' : 'ghost'}
                onClick={() => setActiveView('cart')}
                className="flex items-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Cart ({cartItems.length})</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {activeView === 'chat' && (
            <ChatInterface 
              isAuthenticated={isAuthenticated}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          )}
          {activeView === 'products' && (
            <ProductCatalog 
              onAddToCart={handleAddToCart}
            />
          )}
          {activeView === 'cart' && (
            <ShoppingCart 
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              isAuthenticated={isAuthenticated}
              onAuthRequired={() => setIsAuthOpen(true)}
            />
          )}
        </div>
      </div>

      <AuthDialog 
        open={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuth={() => {
          setIsAuthenticated(true);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
};

export default Index;
