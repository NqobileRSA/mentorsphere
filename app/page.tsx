import Hero from './Home/Hero';
import AboutSection from './Home/AboutSection';
import CTA from '@/components/ui/CTA';
import CoursesSection from './Home/CoursesSection';
// import FAQSection from '@/components/ui/FAQSection';
import TestimonialsSection from './Home/TestimonialsSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CTA />
      <CoursesSection />
      {/* <FAQSection /> */}
      <TestimonialsSection />
    </>
  );
}
