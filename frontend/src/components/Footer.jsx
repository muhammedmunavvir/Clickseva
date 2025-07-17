

import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            {/* About Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">About E-Shop</h4>
              <p className="text-sm">
                E-Shop is your go-to platform for premium pet food products, offering a wide range of options to keep your pets healthy and happy.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact & Social Media Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-sm">123 Pet Street, City, Country</p>
              <p className="text-sm">Email: support@eshop.com</p>
              <p className="text-sm">Phone: +123 456 7890</p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
