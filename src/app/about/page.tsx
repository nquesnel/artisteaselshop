import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "Founded by artists, for artists. Learn about our mission to provide premium studio supplies to creators worldwide.",
};

const MILESTONES = [
  { year: "2018", event: "Founded in Brooklyn, NY by two art school graduates" },
  { year: "2019", event: "Launched wholesale program for schools and studios" },
  { year: "2020", event: "Expanded to serve 500+ educational institutions" },
  { year: "2022", event: "Opened warehouse and distribution center" },
  { year: "2024", event: "10,000+ studios and classrooms supplied nationwide" },
];

const VALUES = [
  {
    title: "Quality First",
    description:
      "We test every product in our own studio before it reaches yours. If it doesn't meet our standards, we don't sell it.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
  {
    title: "Artist-Owned",
    description:
      "We're artists who understand what you need because we need it too. Our recommendations come from experience, not a sales playbook.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Sustainable Sourcing",
    description:
      "We partner with manufacturers who share our commitment to responsible forestry, non-toxic materials, and ethical labor practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        {/* Hero */}
        <section aria-label="About page hero" className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-16 sm:mb-24">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80"
            alt="Artist studio with brushes, paints, and canvases arranged on a wooden workbench"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="relative z-10 text-center">
            <h1 className="font-heading text-5xl sm:text-6xl text-white">
              Our Story
            </h1>
          </div>
        </section>

        {/* Mission */}
        <section aria-label="Our mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-6">
                Founded by Artists, for Artists
              </h2>
              <div className="space-y-4 text-[15px] text-stone-600 leading-relaxed">
                <p>
                  Artist Easel Shop started in 2018 when two art school
                  graduates realized something frustrating: finding quality
                  studio supplies shouldn&apos;t be this hard. Between overpriced
                  boutiques and unreliable online stores, artists were settling
                  for tools that didn&apos;t match their ambition.
                </p>
                <p>
                  We set out to change that. Every product in our catalog has
                  been tested in our own studio. We work directly with
                  manufacturers in Italy, Germany, and the UK to source materials
                  that meet professional standards without the gallery-district
                  markup.
                </p>
                <p>
                  Today, we supply over 10,000 studios and classrooms across the
                  country. From the solo artist setting up their first home
                  studio to university art departments outfitting 200 students,
                  we believe the right tools unlock creative potential.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop"
                alt="Artists working in the Artist Easel Shop workshop surrounded by easels and studio supplies"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section aria-label="Our journey timeline" className="bg-cream py-16 sm:py-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal text-center mb-12">
              Our Journey
            </h2>
            <div className="space-y-0">
              {MILESTONES.map((milestone, i) => (
                <div key={milestone.year} className="flex gap-6">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-terracotta shrink-0 mt-1.5" />
                    {i < MILESTONES.length - 1 && (
                      <div className="w-px h-full bg-stone-300 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <span className="text-[13px] font-semibold text-terracotta">
                      {milestone.year}
                    </span>
                    <p className="text-[15px] text-stone-600 mt-1">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-label="Our values" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-warm-white rounded-lg border border-stone-200 p-6 sm:p-8 shadow-soft"
              >
                <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center text-terracotta mb-5">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-[14px] text-stone-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Call to action" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
            Ready to Elevate Your Studio?
          </h2>
          <p className="text-[15px] text-stone-600 mb-8 max-w-xl mx-auto">
            Browse our curated collection or get in touch for custom
            wholesale pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center bg-terracotta text-white font-medium rounded-lg px-8 py-3.5 text-[15px] hover:bg-terracotta-dark transition-colors min-w-[180px]"
            >
              Shop Now
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-transparent text-charcoal border border-charcoal font-medium rounded-lg px-8 py-3.5 text-[15px] hover:bg-charcoal hover:text-white transition-colors min-w-[180px]"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
