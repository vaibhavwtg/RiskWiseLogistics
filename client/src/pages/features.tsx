import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { FEATURE_MODULES } from "@/lib/constants";
import { Link } from "wouter";

export default function Features() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-rw-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-rw-navy">Comprehensive Risk Management Features</h1>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              Our integrated platform provides world-class risk management capabilities specifically designed for logistics operations.
            </p>
          </div>
          
          <div className="space-y-8">
            {FEATURE_MODULES.map((module, index) => (
              <Card key={index} className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  {/* Main Module Card */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-rw-navy mb-4">{module.title}</h2>
                          <p className="text-lg text-rw-gray mb-4">{module.description}</p>
                        </div>
                        
                        <Button
                          onClick={() => toggleModule(index)}
                          className="bg-rw-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                        >
                          {expandedModule === index ? (
                            <>Hide Details <ChevronDown className="ml-2" size={20} /></>
                          ) : (
                            <>View Features <ChevronRight className="ml-2" size={20} /></>
                          )}
                        </Button>
                      </div>
                      
                      <div className="lg:pl-8">
                        <img 
                          src={module.image} 
                          alt={module.title}
                          className="rounded-xl shadow-lg w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Features Section */}
                  {expandedModule === index && (
                    <div className="bg-rw-light border-t border-gray-200">
                      <div className="p-8">
                        <h3 className="text-xl font-semibold text-rw-navy mb-6">Key Features & Capabilities</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {module.features.map((feature, featureIndex) => (
                            <Card key={featureIndex} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <img 
                                    src={feature.image} 
                                    alt={feature.title}
                                    className="w-full h-32 object-cover rounded-lg"
                                  />
                                  <div>
                                    <h4 className="font-semibold text-rw-navy mb-2">{feature.title}</h4>
                                    <p className="text-sm text-rw-gray">{feature.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rw-navy">Integrated Risk Management Platform</h2>
            <p className="text-xl text-rw-gray max-w-3xl mx-auto">
              All features work together seamlessly to provide comprehensive risk visibility and control across your logistics operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-red rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Unified Data Flow</h3>
                    <p className="text-rw-gray">Seamless information sharing between audit, compliance, incidents, risk management, policy, and contract modules.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-navy rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Configurable Dashboards</h3>
                    <p className="text-rw-gray">Customizable dashboards with elegant graphics displaying vital information specific to each user's role and responsibilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-red rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Automated Workflows</h3>
                    <p className="text-rw-gray">Intelligent automation for compliance deadlines, audit scheduling, incident escalation, and risk mitigation tasks.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rw-navy rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-rw-navy mb-2">Global Search & Reporting</h3>
                    <p className="text-rw-gray">Powerful search capabilities across all modules with customizable reports and comprehensive analytics.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contact">
                <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                  Request Platform Demo <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://www.tickitondemand.com.au/wp-content/uploads/2021/08/Risk_Register.jpg" 
                alt="Risk management dashboard" 
                className="rounded-xl shadow-lg w-full"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://tickitondemand.com.au/wp-content/uploads/2015/01/dashboard.jpg" 
                  alt="Configurable dashboard" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
                
                <img 
                  src="https://tickitsystems.com.au/wp-content/uploads/2023/07/image-11.png" 
                  alt="Compliance reporting" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-rw-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Experience World-Class Risk Management?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how RiskWise Tech's comprehensive feature set can transform your logistics risk management operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                  Schedule Demo
                </Button>
              </Link>
              <Link href="/logistics-risk">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-rw-navy transition-colors font-semibold text-lg">
                  Learn About Logistics Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
