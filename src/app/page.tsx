"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import AiRecommendationForm from '@/components/ai/ai-recommendation-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products } from '@/lib/data';
import ProductCard from '@/components/products/product-card';
import AnimatedHero from '@/components/animated-hero';
import AnimatedProductGrid from '@/components/animated-product-grid';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-new');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority 
            />
          )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
            <AnimatedHero>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">Find Your Perfect Glow</motion.h1>
              <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl mb-8 drop-shadow-md">
                  Personalized facial mask recommendations powered by AI. Tell us about your skin, and we'll find the perfect match for you.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/shop">Shop All Masks</Link>
                </Button>
              </motion.div>
            </AnimatedHero>
        </div>
      </section>

      {/* AI Recommender Section */}
      <section id="ai-recommender" className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <AiRecommendationForm />
            </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                    Featured Products
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                    Handpicked selection of our most loved and effective facial masks.
                </p>
            </div>
            <AnimatedProductGrid>
              {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </AnimatedProductGrid>
             <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                    <Link href="/shop">View All Products</Link>
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
}
