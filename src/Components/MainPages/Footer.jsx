import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Logo from "../Navbar/Logo";

const Footer = () => {
  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blogs" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={22} />, link: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter size={22} />, link: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram size={22} />, link: "https://instagram.com" },
    { name: "GitHub", icon: <Github size={22} />, link: "https://github.com" },
  ];

  return (
    <footer className="border-t border-border bg-primary  text-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo & Description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              TechTales — where technology meets storytelling. Discover insightful blogs, tutorials, and resources to fuel your tech passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0">
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.link}
                  className="text-sm hover:text-accent transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-accent"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} TechTales. Crafted with ❤️ for creators.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
