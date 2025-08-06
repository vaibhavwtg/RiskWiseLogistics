import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Users, Rocket, Play } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rw-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-rw-navy leading-tight">
                  Enterprise Risk Management for{" "}
                  <span className="text-rw-red">Logistics</span>
                </h1>
                <p className="text-xl text-rw-gray leading-relaxed">
                  Specialized risk management framework designed for freight forwarding and customs broking operations. Streamline compliance, minimize risks, and optimize your logistics operations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                    <Rocket className="mr-2" size={20} />
                    Start Free Demo
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-rw-navy text-rw-navy px-8 py-4 rounded-lg hover:bg-rw-navy hover:text-white transition-colors font-semibold text-lg">
                  <Play className="mr-2" size={20} />
                  Watch Overview
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rw-navy">500+</div>
                  <div className="text-sm text-rw-gray">Companies Trust Us</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rw-navy">99.9%</div>
                  <div className="text-sm text-rw-gray">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rw-navy">24/7</div>
                  <div className="text-sm text-rw-gray">Expert Support</div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern logistics operations" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Why Choose RiskWise Tech?</h2>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              Built specifically for logistics professionals by industry experts who understand the unique challenges of freight forwarding and customs broking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-rw-light p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-rw-red rounded-lg flex items-center justify-center mb-6">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-rw-navy mb-4">Logistics-Specific Framework</h3>
                <p className="text-rw-gray">Purpose-built for freight forwarding, customs broking, and supply chain operations with industry-specific risk templates.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-rw-light p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-rw-navy rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-rw-navy mb-4">Real-Time Monitoring</h3>
                <p className="text-rw-gray">Continuous risk assessment with automated alerts for compliance violations, operational anomalies, and regulatory changes.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-rw-light p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-rw-red rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-rw-navy mb-4">Expert Team</h3>
                <p className="text-rw-gray">Developed by logistics professionals and tech experts who identified critical gaps in existing risk management solutions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rw-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Transform Your Risk Management?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of logistics companies who trust RiskWise Tech to protect their operations and ensure compliance.
            </p>
            <Link href="/contact">
              <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
