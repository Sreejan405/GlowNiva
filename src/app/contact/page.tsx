"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactPage() {
    const { toast } = useToast();
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section className="px-8 md:px-16 py-16 bg-gradient-to-t from-[#fffdfb] via-[#fdf6f0] to-[#f0e5da] min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8 text-card-foreground">Get in Touch</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
        <Input 
          {...form.register("name")} 
          type="text" 
          placeholder="Your Name" 
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" 
        />
        {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
        
        <Input 
          {...form.register("email")}
          type="email" 
          placeholder="Your Email" 
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-foreground" 
        />
        {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}

        <Textarea 
          {...form.register("message")}
          placeholder="Your Message" 
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        {form.formState.errors.message && <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>}

        <Button type="submit" className="px-6 py-3 rounded-xl btn-primary-gradient">Send</Button>
      </form>
    </section>
  );
}
