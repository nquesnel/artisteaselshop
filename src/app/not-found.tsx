import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white px-4">
      <div className="text-center max-w-md">
        <p className="font-body text-[13px] uppercase tracking-widest text-stone-400 mb-4">
          404
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-[15px] text-stone-500 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Button as="a" href="/" variant="primary" size="md">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
