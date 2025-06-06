import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// FAQ Item component with animation
const FAQItem = ({ question, children }: { question: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-6 text-left flex justify-between items-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <Plus className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#609966]' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-4 text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6e8] via-[#e9f5db] to-[#d4e7c5] pb-20">
      {/* Hero Section */}
      <div
        className="h-[320px] bg-cover bg-center relative flex items-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent backdrop-blur-sm rounded-b-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-end px-4">
          <div className="text-right drop-shadow" style={{ color: "#EDF1D6" }}>
            <h1 className="text-6xl font-bold mb-4 tracking-tight">Contact Us</h1>
            <p className="text-xl font-light">
              If you have any queries regarding the store<br />
              or a recent order, please read the below<br />
              FAQs or fill the contact form below to<br />
              reach our customer support team.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#40513B] tracking-tight">Frequently Asked Questions</h2>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg mb-12 border border-gray-100">
          <div className="bg-[#f4f6e8] px-6 py-3 font-semibold text-gray-900 text-center rounded-t-2xl">ORDERS</div>
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

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
          <div className="bg-[#f4f6e8] px-6 py-3 font-semibold text-gray-900 text-center rounded-t-2xl">SHIPPING</div>
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
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#40513B] tracking-tight">Contact Us</h2>
          <p className="text-center mb-8 text-gray-600">
            For queries related to your order, please specify your order number (Starting with #ORD)
          </p>

          <form className="space-y-6 text-gray-900">
            {/* Floating label input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#609966] transition"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#609966] bg-white/80 px-1"
              >
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-green-600 bg-white/80 px-1"
              >
                E-mail
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="subject"
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-green-600 bg-white/80 px-1"
              >
                Subject
              </label>
            </div>
            <div className="relative">
              <textarea
                id="message"
                placeholder=" "
                rows={4}
                className="peer w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-green-600 bg-white/80 px-1"
              >
                Message
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#609966] to-[#40513B] text-white py-3 rounded-md font-semibold hover:from-[#40513B] hover:to-[#609966] transition-colors shadow-lg"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}