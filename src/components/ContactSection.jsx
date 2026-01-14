import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link with proper encoding
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.email}`);
        const mailtoLink = `mailto:praaiadarsha@gmail.com?subject=${subject}&body=${body}`;

        // Create and click anchor element (more reliable than window.open)
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const socialLinks = [
        {
            icon: <Github size={24} />,
            label: 'GitHub',
            href: 'https://github.com/Adarsha23',
            color: 'hover:text-neonCyan',
        },
        {
            icon: <Linkedin size={24} />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/adarsha-prasai-637b49283/',
            color: 'hover:text-neonPurple',
        },
        {
            icon: <Mail size={24} />,
            label: 'Email',
            href: 'mailto:praaiadarsha@gmail.com',
            color: 'hover:text-neonCyan',
        },
    ];

    return (
        <section id="contact" className="min-h-screen py-20 px-6 relative">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Let's <span className="neon-text-cyan">Connect</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to chat? I'd love to hear from you!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card"
                    >
                        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/80">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-neonCyan focus:outline-none focus:ring-2 focus:ring-neonCyan/20 transition-all"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/80">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-neonPurple focus:outline-none focus:ring-2 focus:ring-neonPurple/20 transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/80">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-neonCyan focus:outline-none focus:ring-2 focus:ring-neonCyan/20 transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-neonCyan to-neonPurple text-darkBg font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Social Links & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="glass-card">
                            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>

                            <div className="space-y-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        whileHover={{ x: 10 }}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg ${link.color} transition-all group`}
                                    >
                                        <div className="group-hover:scale-110 transition-transform">
                                            {link.icon}
                                        </div>
                                        <span className="font-medium">{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 className="text-xl font-bold mb-4 neon-text-purple">Quick Info</h3>
                            <div className="space-y-3 text-white/70">
                                <p>📍 Available for remote opportunities</p>
                                <p>💼 Open to freelance projects</p>
                                <p>🚀 Building with AI & modern tech</p>
                                <p>⚡ Fast response time</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 pt-8 border-t border-white/10 text-center text-white/40"
            >
                <p>© 2026 Adarsha Prasai. Built with React, Tailwind & Framer Motion.</p>
            </motion.footer>
        </section>
    );
};

export default ContactSection;
