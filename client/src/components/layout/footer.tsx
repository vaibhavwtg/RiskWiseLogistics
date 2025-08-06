import { Link } from "wouter";
import { SITE_CONFIG } from "@/lib/constants";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import footerLogo from "@assets/rwt logo (2)_1754487958235.png";

import rwt_logo__4_ from "@assets/rwt logo (4).png";

export default function Footer() {
  return (
    <footer className="bg-rw-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={rwt_logo__4_} 
                alt="RiskWise Tech" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-gray-300">
              Leading enterprise risk management software specifically designed for logistics operations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solutions</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Risk Management</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Compliance</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Audit</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Incidents</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Policy Management</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Industries</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Freight Forwarding</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Customs Broking</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Supply Chain</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">International Trade</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">Blog</Link>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 RiskWise Tech. All rights reserved. | Designed for enterprise risk management in logistics.</p>
        </div>
      </div>
    </footer>
  );
}
