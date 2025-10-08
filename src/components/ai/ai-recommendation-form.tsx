"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, MessageCircle, X } from "lucide-react";

import { getAiRecommendation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";


const formSchema = z.object({
  skinType: z.string().min(1, "Please select your skin type."),
  preferences: z.string().min(1, "Please select your main concern."),
});

const initialState = {
  message: null,
  recommendation: null,
  reason: null,
  product: null,
  errors: {},
};

export default function AiRecommendationForm() {
  const [state, formAction] = useActionState(getAiRecommendation, initialState);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skinType: "",
      preferences: "",
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
            <MessageCircle className="h-8 w-8" />
        </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl p-4 border border-border z-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-lg text-secondary">GlowNiva Skin Advisor</h4>
        <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost">
            <X className="h-5 w-5"/>
        </Button>
      </div>

      {!state.recommendation ? (
        <Form {...form}>
            <form 
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="skinType"
                    render={({ field }) => (
                        <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="w-full p-2 border rounded-lg">
                                <SelectValue placeholder="Select Skin Type" />
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
                            <SelectTrigger className="w-full p-2 border rounded-lg">
                                <SelectValue placeholder="Select Problem" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="acne">Acne</SelectItem>
                                <SelectItem value="dullness">Dullness</SelectItem>
                                <SelectItem value="redness">Redness</SelectItem>
                                <SelectItem value="aging">Aging</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full py-2 rounded-lg btn-primary-gradient" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Get Recommendation"
                    )}
                </Button>
                {state.message && state.errors && <p className="text-sm font-medium text-destructive">{state.message}</p>}
            </form>
        </Form>
      ) : (
        <div className="mt-4 p-3 bg-muted text-sm rounded-lg text-muted-foreground">
          <strong>Recommended:</strong> {state.recommendation}
          <p className="text-xs mt-2">{state.reason}</p>
           <Button variant="link" className="p-0 h-auto mt-2" onClick={() => window.location.reload()}>
                Start Over
            </Button>
        </div>
      )}
    </div>
  );
}