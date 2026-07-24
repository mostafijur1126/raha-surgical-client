import Link from "next/link";
import {
  FaHeartbeat,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "General Surgery", href: "/products/general-surgery" },
    { label: "Neurosurgery", href: "/products/neurosurgery" },
    { label: "Orthopedics", href: "/products/orthopedics" },
    { label: "Sterilization Trays", href: "/products/sterilization-trays" },
  ];

  const companyLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Regulatory Compliance", href: "/compliance" },
    { label: "Support", href: "/support" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://facebook.com/rahasurgical",
      label: "Facebook",
      color: "text-[#1877F2]",
      hoverBg: "hover:bg-[#1877F2]/10",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/rahasurgical",
      label: "Instagram",
      color: "text-[#E4405F]",
      hoverBg: "hover:bg-[#E4405F]/10",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/rahasurgical",
      label: "Twitter",
      color: "text-[#000000]",
      hoverBg: "hover:bg-black/10",
    },
    {
      icon: FaTiktok,
      href: "https://tiktok.com/@rahasurgical",
      label: "TikTok",
      color: "text-[#000000]",
      hoverBg: "hover:bg-black/10",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <FaHeartbeat className="text-blue-400 w-6 h-6 transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold tracking-tight">
                  RAHA <span className="text-blue-400">Surgical</span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Global leaders in high-precision surgical instrument procurement
                and hospital supply chain optimization since 1998.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`p-2.5 rounded-full bg-white/5 ${social.hoverBg} ${social.color} hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product Catalog Column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
                Product Catalog
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-400 leading-relaxed">
                    1200 Innovation Drive
                    <br />
                    Suite 400, Chicago, IL 60601
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-400 w-4 h-4 flex-shrink-0" />
                  <a
                    href="tel:+1800555SURG"
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    +1 (800) 555-SURG
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400 w-4 h-4 flex-shrink-0" />
                  <a
                    href="mailto:info@rahasurgical.com"
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    info@rahasurgical.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            &copy; {currentYear} RAHA Surgical Equipment. Clinical Excellence.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
