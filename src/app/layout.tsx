import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import { Home, FileText, Users, Settings, HelpCircle } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TipPay Finance",
  description: "Financial solutions for your business",
};

const navigationItems = [
  { name: 'Home', icon: Home },
  { name: 'Contracts', icon: FileText },
  { name: 'Users', icon: Users },
  { name: 'Settings', icon: Settings },
  { name: 'Help', icon: HelpCircle },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-primary-light/5 to-white`}>
        <div className="flex min-h-screen">
          {/* Left Sidebar */}
          <aside className="w-64 bg-white shadow-lg flex flex-col">
            <div className="p-6 border-b">
              <Image
                src="/tippay-logo.png"
                alt="TipPay Logo"
                width={120}
                height={40}
                priority
              />
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary-light hover:bg-primary-light/10 hover:text-primary-main transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center">
                  <Image
                    src="/user-avatar.png"
                    alt="User"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-main">John Doe</p>
                  <p className="text-xs text-secondary-light">Administrator</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
