
import { products } from '@/lib/data';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
    {
      title: "Face Masks",
      types: ["Clay Masks", "Sheet Masks", "Gel Masks", "Cream Masks"],
    },
    {
      title: "Face Wash",
      types: ["Foaming Cleansers", "Gel Cleansers", "Oil Cleansers", "Exfoliating Wash"],
    },
    {
      title: "Serums",
      types: ["Hydrating Serums", "Anti-Aging Serums", "Brightening Serums", "Acne Treatment"],
    },
    {
      title: "Moisturizers",
      types: ["Day Creams", "Night Creams", "Gel Moisturizers", "SPF Moisturizers"],
    },
     {
      title: "Treatments",
      types: ["Eye Creams", "Spot Treatments", "Face Oils", "Toners"],
    },
];

export default function ShopPage() {
  return (
    <div className="px-8 md:px-16 py-16 bg-gradient-to-br from-[#fffdfb] via-[#fdf6f0] to-[#f5ede4] min-h-screen">
      
      {/* Categories Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-center mb-12 text-secondary">Shop by Category</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
                <Card key={category.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                    <CardHeader>
                        <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                            {category.types.map(type => (
                                <Badge key={type} variant="outline">{type}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Our Bestsellers</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
