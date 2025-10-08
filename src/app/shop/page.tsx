
"use client"

import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
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

  const bestsellers = [
    { id: 1, name: 'Hydration Boost Serum', tag: 'hydrating', price: '₹4500' },
    { id: 2, name: 'Vegan Face Cream', tag: 'vegan', price: '₹3800' },
    { id: 3, name: 'Exfoliating Clay Mask', tag: 'exfoliating', price: '₹3200' },
    { id: 4, name: 'Brightening Vitamin C', tag: 'brightening', price: '₹5200' }
  ];

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string, subcategoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryName);
    // In a real app, this would navigate to the products page or filter products
    console.log(`Navigating to: ${categoryId} > ${subcategoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Selected Subcategory Banner */}
      {selectedSubcategory && (
        <div className="bg-orange-100 border-l-4 border-orange-600 px-4 py-3 max-w-7xl mx-auto mt-4">
          <p className="text-orange-800">
            Now viewing: <span className="font-semibold">{selectedSubcategory}</span>
            <button 
              onClick={() => setSelectedSubcategory(null)}
              className="ml-4 text-sm underline hover:text-orange-600"
            >
              Clear filter
            </button>
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Shop by Category Section */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryClick(category.id, sub.id, sub.name)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bestsellers Section */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Bestsellers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="h-64 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg"></div>
                </div>
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  product.tag === 'hydrating' ? 'bg-blue-500' :
                  product.tag === 'vegan' ? 'bg-green-500' :
                  product.tag === 'exfoliating' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`}>
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                  <Button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
