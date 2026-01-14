import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;
        const mouse = mouseRef.current;

        // Track mouse position
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseSpeedX = Math.random() * 0.5 - 0.25;
                this.baseSpeedY = Math.random() * 0.5 - 0.25;
                this.speedX = this.baseSpeedX;
                this.speedY = this.baseSpeedY;
                this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.5)' : 'rgba(188, 0, 255, 0.5)';
            }

            update() {
                // Attract particles slightly toward mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        const force = (200 - distance) / 200;
                        this.speedX = this.baseSpeedX + (dx / distance) * force * 0.5;
                        this.speedY = this.baseSpeedY + (dy / distance) * force * 0.5;
                    } else {
                        this.speedX = this.baseSpeedX;
                        this.speedY = this.baseSpeedY;
                    }
                }

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // Draw connections between particles
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });

                // Draw connections to mouse cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particle.x - mouse.x;
                    const dy = particle.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = 0.6 * (1 - distance / 150);
                        ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw cursor glow effect
            if (mouse.x !== null && mouse.y !== null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
                gradient.addColorStop(0, 'rgba(0, 243, 255, 0.3)');
                gradient.addColorStop(0.5, 'rgba(188, 0, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(0, 243, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center gap-2 mb-4"
                >
                    <Sparkles className="text-neonCyan animate-glow-pulse" size={24} />
                    <span className="text-neonCyan text-sm font-medium tracking-wider uppercase">
                        Creative Developer
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                >
                    Building the Future
                    <br />
                    <span className="neon-text-purple">with AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
                >
                    I'm <span className="neon-text-cyan font-semibold">Adarsha Prasai</span>,
                    a developer passionate about solving real-life problems through innovative technology.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-neonCyan text-darkBg font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all"
                    >
                        View My Work
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 border-2 border-neonPurple text-neonPurple font-semibold rounded-lg hover:bg-neonPurple/10 hover:shadow-[0_0_30px_rgba(188,0,255,0.3)] transition-all"
                    >
                        Get in Touch
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
