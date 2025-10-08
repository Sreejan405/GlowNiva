"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { AtSign, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function LoginPage() {
  const { toast } = useToast();
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      // You can redirect the user to a dashboard page here
      // e.g., router.push('/dashboard');
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let errorMessage = "An unknown error occurred.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials. Please check your email and password.";
          break;
        default:
          errorMessage = "Failed to log in. Please try again later.";
          break;
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
            <Card className="shadow-2xl">
                <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
                <CardDescription>
                    Sign in to access your account.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="your.email@example.com" {...field} className="pl-9" type="email" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="********" {...field} className="pl-9" type="password" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full btn-primary-gradient" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                    </form>
                </Form>
                 <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/" className="font-semibold text-primary hover:underline">
                        Sign up
                        </Link>
                    </p>
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
  );
}
