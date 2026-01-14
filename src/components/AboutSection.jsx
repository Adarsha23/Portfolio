import { motion } from 'framer-motion';
import { Code2, Cpu, Lightbulb, Rocket } from 'lucide-react';

const AboutSection = () => {
    const skills = [
        { name: 'Python', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Unity', level: 80 },
        { name: 'C/C++', level: 75 },
        { name: 'AI Integration', level: 88 },
        { name: 'Backend Dev', level: 70 },
    ];

    const highlights = [
        {
            icon: <Code2 className="text-neonCyan" size={28} />,
            title: 'Frontend Wizard',
            description: 'Crafting beautiful, responsive interfaces with React and modern CSS.',
        },
        {
            icon: <Cpu className="text-neonPurple" size={28} />,
            title: 'AI Enthusiast',
            description: 'Building intelligent solutions that solve real-world problems.',
        },
        {
            icon: <Lightbulb className="text-neonCyan" size={28} />,
            title: 'Problem Solver',
            description: 'Turning complex challenges into elegant, scalable solutions.',
        },
        {
            icon: <Rocket className="text-neonPurple" size={28} />,
            title: 'Full Stack',
            description: 'From databases to deployment, I handle the entire pipeline.',
        },
    ];

    return (
        <section id="about" className="min-h-screen py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        About <span className="neon-text-cyan">Me</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A creative developer who loves building with AI to solve real-life issues.
                    </p>
                </motion.div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card group cursor-pointer"
                        >
                            <div className="mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.description}</p>
                        </motion.div>
                    ))}
                </div>


                {/* AI-Assisted Development */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card max-w-4xl mx-auto text-center"
                >
                    <h3 className="text-3xl font-bold mb-6">
                        Building with <span className="neon-text-purple">AI</span>
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        I specialize in leveraging AI tools and technologies to build innovative solutions faster and smarter.
                        By combining traditional development skills with cutting-edge AI assistance, I create applications
                        that solve real-world problems efficiently and effectively.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
