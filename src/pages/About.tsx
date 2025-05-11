import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="max-w-4xl mx-auto h-full flex items-center px-4">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">ABOUT TRASHURE</h1>
              <p className="text-2xl font-light">
                One Purpose. One Dream.<br />
                Sustainable Living for All.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p className="text-lg">
            At Trashure, we believe that one person's trash can be another's treasure. Our mission is to transform discarded materials into beautiful, functional, and sustainable products that help reduce waste and promote a circular economy.
          </p>
          
          <p className="text-lg">
            We are more than just an e-commerce platform—we are a movement towards a greener future. Every item you find here has been crafted from recycled or upcycled materials, giving new life to what would have otherwise been waste. From eco-friendly home decor to fashion accessories and everyday essentials, our products are designed to make sustainable living easy and stylish.
          </p>

          <p className="text-lg">
            Find out how Trashure is redefining sustainability by turning waste into beautifully crafted products, empowering eco-conscious living, and making it easier than ever to shop with a purpose.
          </p>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-[#f4f6e8] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">WHY CHOOSE TRASHURE?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/6963134/pexels-photo-6963134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sustainable Shopping"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">SUSTAINABLE SHOPPING</h3>
                <p className="text-gray-600">Every purchase contributes to reducing waste and promoting sustainability.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/6963089/pexels-photo-6963089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Handcrafted Items"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">HANDCRAFTED & UNIQUE</h3>
                <p className="text-gray-600">Each item is carefully crafted with attention to detail and quality.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/6963115/pexels-photo-6963115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Supporting Green Businesses"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">SUPPORTING GREEN BUSINESSES</h3>
                <p className="text-gray-600">We partner with eco-conscious artisans and sustainable businesses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}