
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, ShoppingCart, Loader2, Sparkles, Mic, Image } from 'lucide-react';
import { chatService } from '../services/chatService';
import { ProductCard } from './ProductCard';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  products?: any[];
  type?: 'text' | 'product_suggestion' | 'quick_action';
}

interface ChatInterfaceProps {
  isAuthenticated: boolean;
  onAddToCart: (product: any) => void;
  cartItems: any[];
}

export const ChatInterface = ({ isAuthenticated, onAddToCart, cartItems }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI shopping assistant powered by advanced AI. I can help you find products, compare prices, get personalized recommendations, and even help with voice commands! What are you looking for today? ✨",
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "🔥 Show trending products",
    "💰 Budget-friendly items",
    "⭐ Top rated products",
    "🆕 What's new today?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(messageToSend);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          isBot: true,
          timestamp: new Date(),
          products: response.products,
          type: response.products ? 'product_suggestion' : 'text'
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again. 🔄",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Show me some wireless headphones");
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[700px] flex flex-col bg-gradient-to-br from-white to-blue-50/30 shadow-2xl border-0">
        {/* Enhanced Chat Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Bot className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  AI Shopping Assistant
                  <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                </h3>
                <p className="text-sm opacity-90">Powered by Advanced AI • Ready to help</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {isAuthenticated ? 'Premium' : 'Guest'}
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-gray-50/50">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(action)}
                className="text-xs hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                  message.isBot 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'
                }`}>
                  {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className={`rounded-2xl p-4 shadow-lg ${
                  message.isBot 
                    ? 'bg-white border border-gray-100' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.isBot ? 'text-muted-foreground' : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Product recommendations with enhanced styling */}
          {messages.some(m => m.products) && (
            <div className="mt-6">
              {messages.filter(m => m.products).slice(-1).map(message => (
                <div key={`products-${message.id}`} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">AI Recommended Products</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {message.products?.slice(0, 4).map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={onAddToCart}
                        isInCart={cartItems.some((item: any) => item.id === product.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">AI is analyzing your request...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input */}
        <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoiceInput}
              className={`${isListening ? 'bg-red-100 border-red-300 text-red-600' : 'hover:bg-blue-50'}`}
            >
              <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "🎤 Listening..." : "Ask me about products, compare prices, or get recommendations..."}
              className="flex-1 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              disabled={isTyping || isListening}
            />
            
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-50"
            >
              <Image className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {!isAuthenticated && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Login to save chat history and get personalized AI recommendations
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
