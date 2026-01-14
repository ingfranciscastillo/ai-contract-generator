import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import ContractTypesSection from "@/components/home/contract-types-section";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <HeroSection />
      <FeaturesSection />
      <ContractTypesSection />
    </div>
  );
}
