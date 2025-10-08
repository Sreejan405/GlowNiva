

"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Loader, ArrowLeft, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import { products as mockProducts, Product } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReviewStars from '@/components/products/review-stars';
import ProductCard from '@/components/products/product-card';
import { useToast } from '@/hooks/use-toast';

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'product'
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<{id: string, name: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize data
  useEffect(() => {
    loadData();
  }, []);

  // Load mock data
  const loadData = async () => {
    setLoading(true);
    
    const mockCategories = [
      {
        id: 'face-masks',
        name: 'Face Masks',
        subcategories: [
          { id: 'clay-masks', name: 'Clay Masks' },
          { id: 'sheet-masks', name: 'Sheet Masks' },
          { id: 'gel-masks', name: 'Gel Masks' },
          { id: 'cream-masks', name: 'Cream Masks' }
        ]
      },
      {
        id: 'face-wash',
        name: 'Face Wash',
        subcategories: [
          { id: 'foaming-cleansers', name: 'Foaming Cleansers' },
          { id: 'gel-cleansers', name: 'Gel Cleansers' },
          { id: 'oil-cleansers', name: 'Oil Cleansers' },
          { id: 'exfoliating-wash', name: 'Exfoliating Wash' }
        ]
      },
      {
        id: 'serums',
        name: 'Serums',
        subcategories: [
          { id: 'hydrating-serums', name: 'Hydrating Serums' },
          { id: 'anti-aging-serums', name: 'Anti-Aging Serums' },
          { id: 'brightening-serums', name: 'Brightening Serums' },
          { id: 'acne-treatment', name: 'Acne Treatment' }
        ]
      },
      {
        id: 'moisturizers',
        name: 'Moisturizers',
        subcategories: [
          { id: 'day-creams', name: 'Day Creams' },
          { id: 'night-creams', name: 'Night Creams' },
          { id: 'gel-moisturizers', name: 'Gel Moisturizers' },
          { id: 'spf-moisturizers', name: 'SPF Moisturizers' }
        ]
      },
      {
        id: 'treatments',
        name: 'Treatments',
        subcategories: [
          { id: 'eye-creams', name: 'Eye Creams' },
          { id: 'spot-treatments', name: 'Spot Treatments' },
          { id: 'face-oils', name: 'Face Oils' },
          { id: 'toners', name: 'Toners' }
        ]
      }
    ];

    setCategories(mockCategories);
    setProducts(mockProducts);
    setFilteredProducts(mockProducts.filter(p => p.tags.includes('hydrating'))); // Bestsellers as default
    setLoading(false);
  };

  // Handle subcategory click
  const handleSubcategoryClick = (categoryId: string, subcategoryId: string, subcategoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory({ id: subcategoryId, name: subcategoryName });
    
    // This is a simplified filter. In a real app with the proposed db, this would query subcategoryId
    const filtered = products.filter(p => p.skinTypes.includes(subcategoryId.split('-')[0] as any) || p.title.toLowerCase().includes(subcategoryName.split(" ")[0].toLowerCase()));
    setFilteredProducts(filtered.length > 0 ? filtered : products.slice(0,4));
    
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    
    const recommended = products
      .filter(p => 
        p.id !== product.id && 
        (p.skinTypes.some(st => product.skinTypes.includes(st)) || p.tags.some(t => product.tags.includes(t)))
      )
      .slice(0, 4);
    
    setRecommendedProducts(recommended);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    toast({
        title: "Coming Soon!",
        description: `${product.title} will be added to your cart soon.`,
    });
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setFilteredProducts(products.filter(p => p.tags.includes('hydrating')));
  };

  const goBack = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' ? (
        <main className="container mx-auto px-4 py-12">
          {selectedSubcategory && (
            <div className="bg-muted border-l-4 border-primary px-4 py-3 mb-8 rounded">
              <p className="text-foreground">
                Now viewing: <span className="font-semibold">{selectedSubcategory.name}</span>
                <span className="mx-2">•</span>
                <span className="text-sm">{filteredProducts.length} products found</span>
                <button 
                  onClick={clearFilter}
                  className="ml-4 text-sm underline hover:text-primary font-medium"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}

          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-4 border-b-2 border-border pb-2">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.subcategories.map((sub: any) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(category.id, sub.id, sub.name)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer ${
                        selectedSubcategory?.id === sub.id
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:text-primary hover:bg-accent'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div id="products-section">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              {selectedSubcategory ? selectedSubcategory.name : 'Our Bestsellers'}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
                <Button 
                  onClick={clearFilter}
                  className="mt-4"
                  variant="outline"
                >
                  View Bestsellers
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                        <ProductCard product={product} />
                    </div>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        selectedProduct && 
        <main className="container mx-auto px-4 py-12">
           <Button onClick={goBack} variant="outline" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
            </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-muted rounded-2xl p-12 flex items-center justify-center">
              {selectedProduct.images[0] && (
                <Image src={PlaceHolderImages.find(p => p.id === selectedProduct.images[0])!.imageUrl} alt={selectedProduct.title} width={400} height={400} className="rounded-full shadow-2xl"/>
              )}
            </div>

            <div>
               <div className="flex items-center space-x-3 mb-4">
                  {selectedProduct.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
               </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">{selectedProduct.title}</h1>
              
              <div className="flex items-center mb-6">
                <ReviewStars rating={selectedProduct.rating} />
                <span className="ml-3 text-muted-foreground">{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
              </div>

              <p className="text-3xl font-bold text-primary mb-6">₹{(selectedProduct.price / 100).toFixed(2)}</p>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{selectedProduct.longDescription}</p>

              <div className="flex space-x-4 mb-8">
                <Button 
                  onClick={() => addToCart(selectedProduct)}
                  size="lg"
                  className="flex-1"
                >
                  <ShoppingCart className="mr-2 h-5 w-5"/>
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-6 h-6" />
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  {selectedProduct.benefits.map(b => <li key={b}>{b}</li>)}
                  <li>Cruelty-free & dermatologist tested</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                 <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                    <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ShopPage;
