
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Check, Heart, Eye, Zap } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    category: string;
    inStock: boolean;
  };
  onAddToCart: (product: any) => void;
  isInCart?: boolean;
}

export const ProductCard = ({ product, onAddToCart, isInCart = false }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className={`bg-white/90 hover:bg-white ${isWishlisted ? 'text-red-500' : ''}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          <Badge 
            variant={product.inStock ? "default" : "destructive"}
            className="shadow-md"
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
          {product.rating > 4.5 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 shadow-md">
              <Zap className="h-3 w-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>

        <Badge 
          variant="outline" 
          className="absolute top-3 right-3 bg-white/90 border-white/50 text-xs shadow-md"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
              />
            ))}
            <span className="text-sm font-medium ml-1">{product.rating}</span>
            <span className="text-sm text-muted-foreground">(2.1k)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground line-through">
            ${(product.price * 1.2).toFixed(2)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock || isInCart}
          className={`w-full transition-all duration-200 ${
            isInCart 
              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" 
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
          variant={isInCart ? "outline" : "default"}
        >
          {isInCart ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
