"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ReviewStars from './review-stars';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { toast } = useToast();
    const image = PlaceHolderImages.find(p => p.id === product.images[0]);
    
    const handleAddToCart = () => {
        toast({
            title: "Coming Soon!",
            description: "Shopping cart functionality is under development.",
        })
    }
  
    return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link href={`/shop/${product.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full">
            {image && (
                <Image
                src={image.imageUrl}
                alt={product.title}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            )}
            {product.tags[0] && <Badge className="absolute top-3 right-3">{product.tags[0]}</Badge>}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-headline leading-tight mb-1">
          <Link href={`/shop/${product.slug}`} className="hover:text-primary transition-colors">
            {product.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 mb-2">
            <ReviewStars rating={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <CardDescription className="text-lg font-semibold">₹{(product.price / 100).toFixed(2)}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
