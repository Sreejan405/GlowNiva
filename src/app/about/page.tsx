import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="bg-gradient-to-r from-[#f0e5da] via-[#fffdfb] to-[#f5ede4] px-8 md:px-16 py-16 text-center min-h-[80vh] flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-6 text-accent">About GlowNiva</h1>
      <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
        At GlowNiva, we believe that beauty is all about embracing your natural self. Our products are cruelty-free, skin-friendly, and designed to give you confidence and radiance every day.
      </p>
    </section>
  );
}
