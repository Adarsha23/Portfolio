import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
    const projects = [
        {
            title: 'Smart Pet Feeder',
            description: 'IoT-enabled smart pet feeding system with real-time monitoring, automated scheduling, and mobile control. Built with React, Supabase, and ESP32.',
            tags: ['React', 'IoT', 'Supabase', 'ESP32'],
            link: 'https://petfeeder-gamma.vercel.app',
            github: 'https://github.com/Adarsha23/petfeeder',
            gradient: 'from-neonCyan to-blue-500',
        },
        {
            title: 'LaunchBox',
            description: 'Advanced message integration platform built with n8n, streamlining communication workflows and automating message routing across multiple channels.',
            tags: ['n8n', 'Automation', 'Integration'],
            github: 'https://github.com/PS-Wizard/launchbox',
            gradient: 'from-neonPurple to-pink-500',
        },
    ];

    return (
        <section id="projects" className="min-h-screen py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Featured <span className="neon-text-purple">Projects</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Building solutions that make a difference in people's lives.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="glass-card group cursor-pointer relative overflow-hidden"
                        >
                            {/* Gradient Overlay */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-neonCyan transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-white/70 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4">
                                    {project.link && (
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-neonCyan text-darkBg font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all"
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </motion.a>
                                    )}

                                    {project.github && (
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/80 font-medium rounded-lg hover:border-neonPurple hover:text-neonPurple transition-all"
                                        >
                                            <Github size={16} />
                                            Code
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/60 mb-4">Want to see more?</p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/Adarsha23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neonCyan text-neonCyan font-semibold rounded-lg hover:bg-neonCyan/10 hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all"
                    >
                        <Github size={20} />
                        View All Projects on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
