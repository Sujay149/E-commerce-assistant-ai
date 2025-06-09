
import { Button } from '@/components/ui/button';
import { User, LogOut, ShoppingCart, Bell, Heart, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
  cartItemCount: number;
}

export const Header = ({ isAuthenticated, onAuthClick, onLogout, cartItemCount }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EcomBot
              </h1>
              <p className="text-sm text-muted-foreground">Your AI Shopping Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Notifications Bell */}
            <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart with animation */}
            {cartItemCount > 0 && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground bg-blue-50 px-3 py-2 rounded-full animate-pulse">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-600">{cartItemCount} items</span>
              </div>
            )}
            
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={onLogout} 
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button 
                onClick={onAuthClick} 
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
