
import { Button } from '@/components/ui/button';
import { User, LogOut, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
  cartItemCount: number;
}

export const Header = ({ isAuthenticated, onAuthClick, onLogout, cartItemCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EcomBot</h1>
              <p className="text-sm text-gray-600">Your AI Shopping Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {cartItemCount > 0 && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <ShoppingCart className="h-4 w-4" />
                <span>{cartItemCount} items</span>
              </div>
            )}
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button onClick={onAuthClick} className="flex items-center space-x-2">
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
