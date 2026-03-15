import Link from "next/link";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Building2 className="h-6 w-6 text-blue-400" />
              RentPro
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium property rental platform connecting tenants with their perfect home.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-400" />hello@rentpro.com</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" />+1 (555) 000-1234</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" />New York, NY</span>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold mb-4">Properties</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["Apartments", "Houses", "Villas", "Studios", "Penthouses"].map((t) => (
                <li key={t}>
                  <Link href={`/properties?type=${t.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["About Us", "Careers", "Blog", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-blue-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-blue-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RentPro. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & React Query</p>
        </div>
      </div>
    </footer>
  );
}
