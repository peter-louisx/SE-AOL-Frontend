import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const paymentIcons = [
  "/payments/1.png",
  "/payments/2.png",
  // "/payments/3.png",
  "/payments/4.png",
  "/payments/5.png",
  "/payments/6.png",
  "/payments/7.png",
  "/payments/8.png",
];

const socialLinks = [
  { icon: <Instagram size={24} />, href: "#" },
  { icon: <Twitter size={24} />, href: "#" },
  { icon: <Youtube size={24} />, href: "#" },
  { icon: <Facebook size={24} />, href: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#40513B] text-white">
      <div className="container mx-auto px-12 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-2">
              <img
                src="/logo.png"
                className="h-8 w-8 mr-2"
                alt="Trashure Logo"
              />
              <span className="text-2xl font-bold">Trashure</span>
            </div>
            <p className="text-md font-extralight leading-relaxed">
              Trashure is a sustainable e-commerce platform connecting
              eco-conscious buyers with high-quality, upcycled, and ethically
              sourced products. As a third-party marketplace, we make it easy to
              discover and support brands that prioritize sustainability. Every
              purchase helps reduce waste and protect the planet, because small
              choices make a big difference!
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2 md:w-1/6 mt-10 ">
            <a
              href="#"
              className="text-md hover:text-green-200 transition-colors"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-md hover:text-green-200 transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-md hover:text-green-200 transition-colors"
            >
              Green Game
            </a>
            <a
              href="#"
              className="text-md hover:text-green-200 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-md hover:text-green-200 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Payments */}
          <div className="md:w-1/4">
            <span className="font-bold mb-2 block">Accepted Payments</span>
            <div className="grid grid-cols-4 gap-2">
              {paymentIcons.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Payment"
                  className=" w-auto bg-white rounded p-1"
                  style={{ background: "#fff" }}
                />
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:w-1/6">
            <span className="font-bold mb-2 block">Follow Us</span>
            <div className="grid grid-cols-4 gap-x-4 mt-1">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex justify-center items-center text-white hover:text-green-200 transition-colors"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-8 opacity-80">
          © {new Date().getFullYear()} Trashure. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
