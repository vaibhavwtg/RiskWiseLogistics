import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, FileText, Globe, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function LogisticsRisk() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-rw-navy">Specialized Risk Management for Logistics</h1>
                <p className="text-xl text-rw-gray">
                  Purpose-built for freight forwarding and customs broking operations with industry-specific risk frameworks and compliance requirements.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-red rounded-full flex items-center justify-center mt-1">
                    <Truck className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Freight Forwarding Risk Management</h3>
                    <p className="text-rw-gray">Comprehensive risk assessment for cargo handling, route optimization, carrier evaluation, and international shipping compliance.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-navy rounded-full flex items-center justify-center mt-1">
                    <FileText className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Customs Broking Compliance</h3>
                    <p className="text-rw-gray">Automated customs documentation, duty calculation verification, and regulatory compliance monitoring across multiple jurisdictions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-red rounded-full flex items-center justify-center mt-1">
                    <Globe className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">International Trade Risk</h3>
                    <p className="text-rw-gray">Real-time monitoring of trade regulations, sanctions screening, and documentation requirements for seamless international operations.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contact">
                <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                  Request Logistics Demo <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Freight forwarding operations" 
                className="rounded-xl shadow-lg w-full"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Customs documentation process" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="International shipping operations" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories */}
      <section className="py-20 bg-rw-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Comprehensive Risk Coverage</h2>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              Our logistics-specific risk framework addresses the unique challenges facing freight forwarders and customs brokers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Documentation Risk</h3>
                <p className="text-rw-gray">Automated validation of shipping documents, customs declarations, and compliance certificates.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Bill of Lading verification</li>
                  <li>• Customs documentation</li>
                  <li>• Certificate validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Carrier Risk</h3>
                <p className="text-rw-gray">Comprehensive carrier evaluation and performance monitoring across your supply chain.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Performance tracking</li>
                  <li>• Financial stability</li>
                  <li>• Insurance verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Regulatory Risk</h3>
                <p className="text-rw-gray">Stay ahead of changing regulations and ensure compliance across multiple jurisdictions.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Regulatory updates</li>
                  <li>• Sanctions screening</li>
                  <li>• Trade compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Financial Risk</h3>
                <p className="text-rw-gray">Monitor currency fluctuations, payment terms, and credit exposure across your operations.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Currency hedging</li>
                  <li>• Credit monitoring</li>
                  <li>• Payment tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Security Risk</h3>
                <p className="text-rw-gray">Comprehensive cargo security and loss prevention measures throughout the supply chain.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Cargo tracking</li>
                  <li>• Security protocols</li>
                  <li>• Loss prevention</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-rw-navy">Operational Risk</h3>
                <p className="text-rw-gray">Monitor operational performance and identify potential disruptions before they impact your business.</p>
                <ul className="text-sm text-rw-gray space-y-1">
                  <li>• Performance metrics</li>
                  <li>• Disruption alerts</li>
                  <li>• Capacity planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Transform Your Logistics Risk Management</h2>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              Join the logistics companies who have already transformed their risk management with RiskWise Tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                  Schedule a Demo
                </Button>
              </Link>
              <Link href="/industry">
                <Button variant="outline" className="border-2 border-rw-navy text-rw-navy px-8 py-4 rounded-lg hover:bg-rw-navy hover:text-white transition-colors font-semibold text-lg">
                  Explore All Modules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
