import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewStarsProps {
  rating: number;
  className?: string;
}

export default function ReviewStars({ rating, className }: ReviewStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}
