import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ReviewStars from '@/components/products/review-stars';
import ProductCard from '@/components/products/product-card';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.id !== product.id && p.skinTypes.some(st => product.skinTypes.includes(st))).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((imgId, index) => {
                const image = PlaceHolderImages.find(p => p.id === imgId);
                return (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <div className="relative aspect-square">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={`${product.title} - image ${index + 1}`}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                            priority={index === 0}
                          />
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
                <ReviewStars rating={product.rating} />
                <span className="text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
            </div>
            <span className="text-sm text-muted-foreground">|</span>
             <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>
          <p className="text-3xl font-semibold mb-6">₹{(product.price / 100).toFixed(2)}</p>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="mb-6">
            <Button size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.skinTypes.map(st => <Badge key={st} variant="secondary" className="capitalize">{st} Skin</Badge>)}
            {product.tags.map(tag => <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>)}
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose prose-sm max-w-none text-muted-foreground mt-4">
              <p>{product.longDescription}</p>
               <h4 className="font-semibold text-foreground mt-4">Benefits:</h4>
              <ul className="list-disc pl-5">
                  {product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
              </ul>
            </TabsContent>
            <TabsContent value="ingredients" className="prose prose-sm max-w-none text-muted-foreground mt-4">
              <p>Main ingredients in this product include:</p>
              <ul className="list-disc pl-5">
                  {product.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <ReviewStars rating={review.rating} />
                        <h4 className="font-semibold ml-4">{review.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">by {review.userName} on {new Date(review.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm">{review.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
       {/* Related Products */}
      <section className="mt-16 pt-16 border-t">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
      </section>
    </div>
  );
}
