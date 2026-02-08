import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Katalog', href: '#catalog' },
        { name: 'Hizmetler', href: '#services' },
        { name: 'UI Tasarımlar', href: '#ui-portfolio' },
        { name: 'İletişim', href: '#contact' },
    ];

    return (
        <nav className="fixed w-full z-50 px-6 py-4">
            <div className="glass container mx-auto rounded-2xl px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl font-bold tracking-tighter hover:text-indigo-400 transition-colors">
                    Design<span className="text-indigo-500">Hub</span>.
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary text-sm">
                        <ShoppingBag size={18} />
                        Market
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-6 right-6 md:hidden"
                    >
                        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="btn btn-primary w-full justify-center mt-2">
                                Market
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
