import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-rw-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-rw-navy">About RiskWise Tech</h1>
                <p className="text-xl text-rw-gray">
                  We are a team of technology innovators and logistics industry veterans who identified a critical gap in risk management solutions for the freight forwarding and customs broking sectors.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-rw-navy mb-3">Our Mission</h3>
                  <p className="text-rw-gray">
                    To revolutionize risk management in logistics by providing specialized, intelligent solutions that understand the unique challenges of freight forwarding and customs broking operations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-rw-navy mb-3">Industry Expertise</h3>
                  <p className="text-rw-gray">
                    Our founding team combines decades of experience in logistics operations, regulatory compliance, and enterprise software development to deliver solutions that truly serve the industry.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-rw-navy mb-3">Innovation Focus</h3>
                  <p className="text-rw-gray">
                    We leverage cutting-edge technology including AI-powered risk assessment, automated compliance monitoring, and predictive analytics to keep our clients ahead of emerging risks.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Modern office professionals collaborating" 
                className="rounded-xl shadow-lg w-full"
              />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <Card className="bg-white p-6 shadow-md">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-rw-navy">15+</div>
                    <div className="text-sm text-rw-gray">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-white p-6 shadow-md">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-rw-navy">500+</div>
                    <div className="text-sm text-rw-gray">Clients Served</div>
                  </CardContent>
                </Card>
                <Card className="bg-white p-6 shadow-md">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-rw-navy">50+</div>
                    <div className="text-sm text-rw-gray">Countries</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Our Story</h2>
            <div className="space-y-6 text-lg text-rw-gray leading-relaxed">
              <p>
                RiskWise Tech was born from a simple observation: existing risk management solutions weren't designed for the unique complexities of logistics operations. As experienced professionals in freight forwarding and customs broking, our founders repeatedly encountered generic risk management tools that failed to address the specific challenges of international trade, regulatory compliance, and supply chain security.
              </p>
              <p>
                Frustrated by this gap, our team of tech-savvy logistics experts came together to build something better. We combined our deep understanding of logistics operations with cutting-edge technology to create a risk management platform that truly understands the industry.
              </p>
              <p>
                Today, RiskWise Tech serves hundreds of logistics companies worldwide, helping them navigate the complex landscape of international trade while maintaining the highest standards of compliance and operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-rw-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Our Values</h2>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              The principles that guide everything we do at RiskWise Tech.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-rw-red rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">E</span>
                </div>
                <h3 className="text-xl font-semibold text-rw-navy">Expertise</h3>
                <p className="text-rw-gray">Deep industry knowledge combined with technical innovation.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-rw-navy rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">R</span>
                </div>
                <h3 className="text-xl font-semibold text-rw-navy">Reliability</h3>
                <p className="text-rw-gray">Dependable solutions you can trust for critical operations.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-rw-red rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">I</span>
                </div>
                <h3 className="text-xl font-semibold text-rw-navy">Innovation</h3>
                <p className="text-rw-gray">Continuously evolving to meet emerging challenges.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-rw-navy rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">P</span>
                </div>
                <h3 className="text-xl font-semibold text-rw-navy">Partnership</h3>
                <p className="text-rw-gray">Building long-term relationships with our clients.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rw-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Experience the Difference?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how RiskWise Tech can transform your logistics risk management with industry-specific solutions built by experts who understand your challenges.
            </p>
            <Link href="/contact">
              <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
