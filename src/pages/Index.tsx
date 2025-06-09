
import { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ProductCatalog } from '../components/ProductCatalog';
import { ShoppingCart } from '../components/ShoppingCart';
import { AuthDialog } from '../components/AuthDialog';
import { Header } from '../components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingBag, Menu, Sparkles, Zap, TrendingUp } from 'lucide-react';

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

  const navigationItems = [
    {
      id: 'chat',
      label: 'AI Assistant',
      icon: MessageCircle,
      badge: 'Smart',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'products',
      label: 'Browse Products',
      icon: ShoppingBag,
      badge: 'New',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'cart',
      label: `Cart (${cartItems.length})`,
      icon: ShoppingBag,
      badge: cartItems.length > 0 ? 'Hot' : null,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full justify-start bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90"
          >
            <Menu className="h-4 w-4 mr-2" />
            Navigation Menu
            <Sparkles className="h-4 w-4 ml-auto text-purple-500" />
          </Button>
          
          {isMobileMenuOpen && (
            <div className="mt-2 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 animate-fade-in">
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      setActiveView(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start ${
                      activeView === item.id 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-3 border border-gray-100">
            <div className="flex space-x-3">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveView(item.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                    activeView === item.id 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl` 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={activeView === item.id ? "secondary" : "outline"} 
                      className={activeView === item.id ? "bg-white/20 text-white border-white/30" : ""}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>1,234 products available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>AI-powered recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>Personalized shopping experience</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {activeView === 'chat' && (
            <div className="animate-fade-in">
              <ChatInterface 
                isAuthenticated={isAuthenticated}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            </div>
          )}
          {activeView === 'products' && (
            <div className="animate-fade-in">
              <ProductCatalog 
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
          {activeView === 'cart' && (
            <div className="animate-fade-in">
              <ShoppingCart 
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                isAuthenticated={isAuthenticated}
                onAuthRequired={() => setIsAuthOpen(true)}
              />
            </div>
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
