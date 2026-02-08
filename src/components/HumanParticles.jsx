import React, { useEffect, useRef } from 'react';

const HumanParticles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        // Define human shape clusters with larger radii for more spread
        const clusters = [
            { x: 0.5, y: 0.22, r: 60, p: 0.10 },  // Head
            { x: 0.5, y: 0.48, r: 120, p: 0.30 }, // Torso
            { x: 0.35, y: 0.38, r: 60, p: 0.10 }, // Left Arm
            { x: 0.65, y: 0.38, r: 60, p: 0.10 }, // Right Arm
            { x: 0.42, y: 0.75, r: 80, p: 0.10 }, // Left Leg
            { x: 0.58, y: 0.75, r: 80, p: 0.10 }, // Right Leg
            { x: 0.5, y: 0.5, r: 1000, p: 0.20 }  // Background spread
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                // Select cluster based on probability
                const rand = Math.random();
                let acc = 0;
                let cluster = clusters[0];
                for (const c of clusters) {
                    acc += c.p;
                    if (rand < acc) {
                        cluster = c;
                        break;
                    }
                }

                this.cluster = cluster;
                // If it's the background cluster, spread across full screen
                const spreadX = cluster.r > 500 ? canvas.width : cluster.r * 2;
                const spreadY = cluster.r > 500 ? canvas.height : cluster.r * 2;

                this.baseX = (cluster.x * canvas.width) + (Math.random() - 0.5) * spreadX;
                this.baseY = (cluster.y * canvas.height) + (Math.random() - 0.5) * spreadY;

                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.8;
                this.density = (Math.random() * 20) + 10;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.angle = Math.random() * Math.PI * 2;
                this.floatSpeed = Math.random() * 0.015 + 0.005;
                this.floatRange = Math.random() * 15 + 5;
            }

            update() {
                // Floating movement
                this.angle += this.floatSpeed;
                const targetX = this.baseX + Math.cos(this.angle) * this.floatRange;
                const targetY = this.baseY + Math.sin(this.angle) * this.floatRange;

                // Smooth movement towards floating base
                this.x += (targetX - this.x) * 0.03;
                this.y += (targetY - this.y) * 0.03;

                // Mouse Interaction
                let dx = mouseRef.current.x - this.x;
                let dy = mouseRef.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                const forceRadius = 200;
                if (distance < forceRadius) {
                    const force = (forceRadius - distance) / forceRadius;
                    const directionX = (dx / distance) * force * this.density;
                    const directionY = (dy / distance) * force * this.density;
                    this.x -= directionX;
                    this.y -= directionY;
                    this.opacity = 0.7;
                } else if (this.opacity > 0.15) {
                    this.opacity -= 0.003;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(58, 90, 120, ${this.opacity})`;
                ctx.fill();
            }
        }

        const connect = () => {
            const maxDistance = 120;
            ctx.lineWidth = 0.8;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const opacity = 1 - (dist / maxDistance);
                        ctx.strokeStyle = `rgba(58, 90, 120, ${opacity * 0.12})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const init = () => {
            particles = [];
            // Increase count for better global coverage
            const count = 250;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at top right, #FFFFFF, transparent), radial-gradient(circle at bottom left, #F2E6DC, transparent)',
                backgroundColor: '#F2E6DC'
            }}
        />
    );
};

export default HumanParticles;
