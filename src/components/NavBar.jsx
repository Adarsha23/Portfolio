import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const NavBar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['home', 'about', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-darkBg/80 backdrop-blur-lg border-b border-white/5' : ''
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold neon-text-cyan cursor-pointer"
                    onClick={() => scrollToSection('home')}
                >
                    AP
                </motion.div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative text-sm font-medium transition-colors ${activeSection === item.id ? 'text-neonCyan' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neonCyan"
                                    style={{ boxShadow: '0 0 10px rgba(0, 243, 255, 0.8)' }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                    <motion.a
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        href="https://github.com/Adarsha23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-neonCyan transition-colors"
                    >
                        <Github size={20} />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        href="https://www.linkedin.com/in/adarsha-prasai-637b49283/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-neonPurple transition-colors"
                    >
                        <Linkedin size={20} />
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
};

export default NavBar;
