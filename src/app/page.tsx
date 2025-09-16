import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          {/* Logo & Brand */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Herbtrace Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 drop-shadow-md"
            />
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight mb-4">
              Herbtrace
            </h1>
            <Badge variant="secondary" className="text-sm px-4 py-1 bg-green-100 text-green-800 border-green-200">
              Powered by Blockchain Technology
            </Badge>
          </div>

          {/* Main Tagline */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 leading-tight">
              Complete Supply Chain Transparency
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Track medicinal herbs from farm to pharmacy with end-to-end traceability,
              ensuring authenticity and quality at every step of the journey.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              <div className="p-6 rounded-lg bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🌱</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Farm Origins</h3>
                <p className="text-sm text-gray-600">Track herbs from cultivation to harvest with verified farmer credentials</p>
              </div>

              <div className="p-6 rounded-lg bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">🔬</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quality Testing</h3>
                <p className="text-sm text-gray-600">Laboratory verification and certification for purity and potency</p>
              </div>

              <div className="p-6 rounded-lg bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Distribution</h3>
                <p className="text-sm text-gray-600">Secure packaging and transportation with real-time monitoring</p>
              </div>
            </div>
          </div>

          <Separator className="mb-10 max-w-md mx-auto" />

          {/* CTA Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Join the Future of Herbal Medicine</h3>
              <p className="text-gray-500 text-sm mb-6">
                Whether you&apos;re a farmer, lab technician, manufacturer, or distributor -
                be part of the transparent supply chain revolution.
              </p>
            </div>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-16 py-4 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
              >
                Get Started Today
                <span className="ml-2">→</span>
              </Button>
            </Link>

            <p className="text-xs text-gray-400 mt-4">
              Free to join • Secure • Compliant with regulatory standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
