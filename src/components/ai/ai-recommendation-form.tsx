'use client';

import { useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, MessageCircle, X, Sparkles, CheckCircle } from 'lucide-react';

import { getAiRecommendation } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';


const formSchema = z.object({
  skinType: z.string().min(1, 'Please select your skin type.'),
  preferences: z.string().min(1, 'Please select your main concern.'),
});

const initialState = {
  message: null,
  recommendation: null,
  errors: {},
};

export default function AiRecommendationForm() {
  const [state, formAction] = useActionState(getAiRecommendation, initialState);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skinType: '',
      preferences: '',
    },
  });

  const { formState, handleSubmit } = form;
  
  const onFormSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('skinType', data.skinType);
    formData.append('preferences', data.preferences);
    formAction(formData);
  };


  if (!isOpen) {
    return (
        <Button 
            onClick={() => setIsOpen(true)} 
            className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-2xl btn-primary-gradient"
        >
            <Sparkles className="h-8 w-8" />
        </Button>
    )
  }

  const recommendationEntries = state.recommendation ? Object.entries(state.recommendation).filter(([, value]) => value) : [];

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white shadow-2xl rounded-2xl border border-border z-50 max-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="font-bold text-lg text-secondary flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary"/>
            GlowNiva Skin Advisor
        </h4>
        <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost">
            <X className="h-5 w-5"/>
        </Button>
      </div>

      <div className="p-4 flex-grow overflow-y-auto">
        {!state.recommendation ? (
            <>
            <p className="text-sm text-muted-foreground mb-4">Tell us about your skin to get a personalized routine recommendation.</p>
            <Form {...form}>
                <form 
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="skinType"
                        render={({ field }) => (
                            <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="What's your skin type?" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="oily">Oily</SelectItem>
                                    <SelectItem value="dry">Dry</SelectItem>
                                    <SelectItem value="sensitive">Sensitive</SelectItem>
                                    <SelectItem value="combination">Combination</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="preferences"
                        render={({ field }) => (
                            <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="What's your main concern?" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="acne">Acne & Blemishes</SelectItem>
                                    <SelectItem value="dullness">Dullness & Uneven Tone</SelectItem>
                                    <SelectItem value="redness">Redness & Irritation</SelectItem>
                                    <SelectItem value="aging">Fine Lines & Aging</SelectItem>
                                    <SelectItem value="hydration">Dryness & Dehydration</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full btn-primary-gradient" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Building your routine...
                            </>
                        ) : (
                            "Get My Routine"
                        )}
                    </Button>
                    {state.message && state.errors && <p className="text-sm font-medium text-destructive">{state.message}</p>}
                </form>
            </Form>
            </>
        ) : (
            <div className="space-y-4">
                 <h3 className="font-bold text-center text-secondary">Your Personalized Routine</h3>
                {recommendationEntries.map(([type, rec]) => (
                    <Card key={type} className="overflow-hidden">
                        <CardHeader className="p-3 bg-muted">
                            <CardTitle className="text-sm capitalize font-semibold flex items-center justify-between">
                                {type}
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                            <p className="font-bold text-sm text-foreground">{rec.productName}</p>
                            <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                        </CardContent>
                    </Card>
                ))}
                {recommendationEntries.length === 0 && !formState.isSubmitting && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        We couldn't find a perfect routine for you right now. Please try different options.
                    </p>
                )}
            </div>
        )}
      </div>
      {(state.recommendation || state.message) && (
        <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
                Start Over
            </Button>
        </div>
      )}
    </div>
  );
}