
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShoppingCartProps {
  items: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

export const ShoppingCart = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  isAuthenticated, 
  onAuthRequired 
}: ShoppingCartProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  const handleApplyPromo = () => {
    const validCodes = {
      'SAVE10': 0.1,
      'WELCOME20': 0.2,
      'FIRST15': 0.15
    };
    
    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes]);
      toast({
        title: "Promo code applied!",
        description: `You saved ${(validCodes[promoCode as keyof typeof validCodes] * 100)}%`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    });
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: `Your order total is $${total.toFixed(2)}`,
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart!</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping Cart ({items.length} items)</h2>
        
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <Badge variant="outline" className="mt-1">{item.category}</Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                <div className="text-gray-500 text-sm">${item.price.toFixed(2)} each</div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">Order Summary</h3>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Promo Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Promo Code</label>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                />
                <Button variant="outline" onClick={handleApplyPromo}>
                  Apply
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Try: SAVE10, WELCOME20, FIRST15
              </p>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({(discount * 100).toFixed(0)}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleCheckout}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
