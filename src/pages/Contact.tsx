import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// FAQ Item component
const FAQItem = ({ question, children }: { question: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-gray-200">
        <button
          className="w-full py-4 px-6 text-left flex justify-between items-center hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-900">{question}</span>
          <Plus className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </button>
        {isOpen && (
          <div className="px-6 pb-4 text-gray-600">
            {children}
          </div>
        )}
      </div>
    );
  };
  
  export default function Contact() {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <div 
          className="h-[300px] bg-cover bg-center relative"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
          }}
        >
          <div className="absolute inset-0 bg-opacity-40">
            <div className="max-w-4xl mx-auto h-full flex items-center justify-end px-4">
              <div className="text-right drop-shadow" style={{ color: "#EDF1D6" }}>
                <h1 className="text-5xl font-bold mb-4">CONTACT US</h1>
                <p className="text-xl">
                  If you have any queries regarding the store<br />
                  or a recent order, please read the below<br />
                  FAQs or fill the contact form below to<br />
                  reach our customer support team.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-lg shadow-sm mb-12">
            <div className="bg-[#f4f6e8] px-6 py-3 font-semibold text-gray-900 text-center">ORDERS</div>
            <FAQItem question="How will I know my order has been shipped?">
              You will receive a shipping confirmation email with tracking details once your order has been dispatched.
            </FAQItem>
            <FAQItem question="Where is my order?">
              You can track your order using the tracking number provided in your shipping confirmation email.
            </FAQItem>
            <FAQItem question="I'm missing an item from my order, what should I do?">
              Please contact our support team with your order number and we'll help resolve the issue immediately.
            </FAQItem>
            <FAQItem question="What should I do if I receive a faulty item?">
              Please take photos of the faulty item and contact us within 48 hours of receiving your order.
            </FAQItem>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-[#f4f6e8] px-6 py-3 font-semibold text-gray-900 text-center">SHIPPING</div>
            <FAQItem question="What carrier do you ship with?">
              We use eco-friendly shipping partners who share our commitment to sustainability.
            </FAQItem>
            <FAQItem question="How long should delivery take?">
              Domestic orders typically arrive within 3-5 business days. International shipping may take 7-14 business days.
            </FAQItem>
            <FAQItem question="My order states delivered but I have not received it">
              Please check with neighbors and your local post office. If you still can't locate your package, contact us.
            </FAQItem>
            <FAQItem question="How do I return my order?">
              Contact our support team for a return label. Returns must be initiated within 30 days of delivery.
            </FAQItem>
          </div>
        </div>
  
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto px-4 pb-16">
          <div className="bg-[#f4f6e8] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">CONTACT US</h2>
            <p className="text-center mb-8 text-gray-600">
              For queries related to your order, please specify your order number (Starting with #ORD)
            </p>
            
            <form className="space-y-4 text-gray-900">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
  
        </div>
    );
  }