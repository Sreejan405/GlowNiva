"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const skinTypes = [
  { id: "oily", label: "Oily" },
  { id: "dry", label: "Dry" },
  { id: "combination", label: "Combination" },
  { id: "sensitive", label: "Sensitive" },
  { id: "normal", label: "Normal" },
];

const tags = [
    { id: 'hydrating', label: 'Hydrating' },
    { id: 'brightening', label: 'Brightening' },
    { id: 'exfoliating', label: 'Exfoliating' },
    { id: 'anti-aging', label: 'Anti-Aging' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'organic', label: 'Organic' },
];

const ratings = [
  { id: "4", label: "4 stars & up" },
  { id: "3", label: "3 stars & up" },
  { id: "2", label: "2 stars & up" },
  { id: "1", label: "1 star & up" },
];

interface ProductFiltersProps {
  filters: {
    skinTypes: string[];
    tags: string[];
    priceRange: [number, number];
    rating: number;
  };
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  
  const handleCheckboxChange = (category: 'skinTypes' | 'tags', value: string, checked: boolean) => {
    onFilterChange((prev: any) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item: string) => item !== value),
    }));
  };

  const handlePriceChange = (value: [number]) => {
     onFilterChange((prev: any) => ({ ...prev, priceRange: [prev.priceRange[0], value[0]] }));
  };
  
  const handleRatingChange = (value: string) => {
    onFilterChange((prev: any) => ({ ...prev, rating: parseInt(value, 10) }));
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["skin-type", "price", "tags", "rating"]} className="w-full">
          
          <AccordionItem value="skin-type">
            <AccordionTrigger className="font-semibold">Skin Type</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {skinTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skin-${type.id}`} 
                    onCheckedChange={(checked) => handleCheckboxChange('skinTypes', type.id, !!checked)}
                    checked={filters.skinTypes.includes(type.id)}
                  />
                  <Label htmlFor={`skin-${type.id}`} className="font-normal">{type.label}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tags">
            <AccordionTrigger className="font-semibold">Tags</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag.id}`} 
                    onCheckedChange={(checked) => handleCheckboxChange('tags', tag.id, !!checked)}
                    checked={filters.tags.includes(tag.id)}
                  />
                  <Label htmlFor={`tag-${tag.id}`} className="font-normal">{tag.label}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
            <AccordionContent className="pt-4">
               <div className="mb-2 text-sm text-muted-foreground">
                Up to: ${(filters.priceRange[1] / 100).toFixed(2)}
               </div>
              <Slider
                defaultValue={[6000]}
                max={6000}
                step={100}
                onValueChange={handlePriceChange}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="rating">
            <AccordionTrigger className="font-semibold">Rating</AccordionTrigger>
            <AccordionContent className="pt-2">
                <RadioGroup onValueChange={handleRatingChange} defaultValue={String(filters.rating)}>
                    {ratings.map((rate) => (
                         <div key={rate.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={rate.id} id={`rating-${rate.id}`} />
                            <Label htmlFor={`rating-${rate.id}`} className="font-normal">{rate.label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
