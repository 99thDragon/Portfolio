// Typing Effect
const texts = [
    "Building the future with AI",
    "Prompt Engineering Expert",
    "Creating Intelligent Solutions"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = texts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

setTimeout(type, 1000);

// Neural Network Particle System
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const maxDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

animate();

// Card Canvas Animations for Projects
class CardAnimation {
    constructor(canvas, type) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.type = type;
        this.setupCanvas();
        this.init();
        this.animate();
    }

    setupCanvas() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
            this.init();
        });
    }

    init() {
        if (this.type === 'neural') {
            this.initNeural();
        } else if (this.type === 'matrix') {
            this.initMatrix();
        } else if (this.type === 'waves') {
            this.initWaves();
        } else if (this.type === 'binary') {
            this.initBinary();
        }
    }

    initNeural() {
        this.nodes = [];
        for (let i = 0; i < 30; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: 3
            });
        }
    }

    initMatrix() {
        this.columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(this.columns).fill(1);
        this.chars = '01アイウエオカキクケコサシスセソ';
    }

    initWaves() {
        this.waves = [];
        for (let i = 0; i < 5; i++) {
            this.waves.push({
                y: this.canvas.height * (0.3 + i * 0.15),
                amplitude: 30 + i * 10,
                frequency: 0.02 - i * 0.002,
                phase: i * Math.PI / 3,
                speed: 0.02 + i * 0.005
            });
        }
        this.time = 0;
    }

    initBinary() {
        this.binaryStrings = [];
        for (let i = 0; i < 15; i++) {
            this.binaryStrings.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                text: this.generateBinary(),
                speed: 0.5 + Math.random() * 1,
                opacity: 0.3 + Math.random() * 0.4
            });
        }
    }

    generateBinary() {
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += Math.random() > 0.5 ? '1' : '0';
        }
        return result;
    }

    animate() {
        if (this.type === 'neural') {
            this.drawNeural();
        } else if (this.type === 'matrix') {
            this.drawMatrix();
        } else if (this.type === 'waves') {
            this.drawWaves();
        } else if (this.type === 'binary') {
            this.drawBinary();
        }
        requestAnimationFrame(() => this.animate());
    }

    drawNeural() {
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        });

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawMatrix() {
        this.ctx.fillStyle = 'rgba(118, 75, 162, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '15px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * 20, this.drops[i] * 20);
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    drawWaves() {
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.waves.forEach((wave, index) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 - index * 0.1})`;
            this.ctx.lineWidth = 2;

            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = wave.y + Math.sin(x * wave.frequency + this.time + wave.phase) * wave.amplitude;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        });

        this.time += 0.02;
    }

    drawBinary() {
        this.ctx.fillStyle = 'rgba(118, 75, 162, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '14px monospace';

        this.binaryStrings.forEach(str => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${str.opacity})`;
            this.ctx.fillText(str.text, str.x, str.y);
            str.y += str.speed;
            if (str.y > this.canvas.height) {
                str.y = 0;
                str.x = Math.random() * this.canvas.width;
                str.text = this.generateBinary();
            }
        });
    }
}

// Skill Canvas Animations - REBUILT
class SkillAnimation {
    constructor(canvas, skill) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.skill = skill;
        this.setupCanvas();
        this.init();
        this.animate();
    }

    setupCanvas() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
            this.init();
        });
    }

    init() {
        if (this.skill === 'prompt') {
            this.initPrompt();
        } else if (this.skill === 'langchain') {
            this.initLangChain();
        } else if (this.skill === 'api') {
            this.initAPI();
        } else if (this.skill === 'python') {
            this.initPython();
        }
    }

    initPrompt() {
        this.words = [];
        const promptWords = ['prompt', 'context', 'few-shot', 'chain', 'reason', 'optimize', 'tokens', 'output'];
        for (let i = 0; i < 20; i++) {
            this.words.push({
                text: promptWords[Math.floor(Math.random() * promptWords.length)],
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: 0.15 + Math.random() * 0.2,
                size: 14 + Math.random() * 10
            });
        }
    }

    initLangChain() {
        this.chains = [];
        for (let i = 0; i < 8; i++) {
            const chain = [];
            for (let j = 0; j < 6; j++) {
                chain.push({
                    x: 100 + i * 80,
                    y: 50 + j * 80,
                    radius: 15
                });
            }
            this.chains.push(chain);
        }
        this.chainOffset = 0;
    }

    initAPI() {
        this.dataPackets = [];
        for (let i = 0; i < 15; i++) {
            this.dataPackets.push({
                x: Math.random() * this.canvas.width,
                y: -20,
                width: 40 + Math.random() * 30,
                height: 20,
                speed: 1 + Math.random() * 2,
                opacity: 0.3 + Math.random() * 0.3
            });
        }
    }

    initPython() {
        this.codeLines = [];
        const pythonSnippets = [
            'import tensorflow',
            'model.fit(X, y)',
            'numpy.array()',
            'torch.nn.Module',
            'def train_model():',
            'pandas.DataFrame()',
            'sklearn.fit()'
        ];
        for (let i = 0; i < 12; i++) {
            this.codeLines.push({
                text: pythonSnippets[Math.floor(Math.random() * pythonSnippets.length)],
                x: -200,
                y: 50 + i * 40,
                speed: 0.5 + Math.random() * 1,
                opacity: 0.2 + Math.random() * 0.3
            });
        }
    }

    animate() {
        if (this.skill === 'prompt') {
            this.drawPrompt();
        } else if (this.skill === 'langchain') {
            this.drawLangChain();
        } else if (this.skill === 'api') {
            this.drawAPI();
        } else if (this.skill === 'python') {
            this.drawPython();
        }
        requestAnimationFrame(() => this.animate());
    }

    drawPrompt() {
        // Purple gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Floating words
        this.ctx.font = '14px monospace';
        this.words.forEach(word => {
            word.x += word.vx;
            word.y += word.vy;
            
            if (word.x < 0 || word.x > this.canvas.width) word.vx *= -1;
            if (word.y < 0 || word.y > this.canvas.height) word.vy *= -1;
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${word.opacity})`;
            this.ctx.font = `${word.size}px monospace`;
            this.ctx.fillText(word.text, word.x, word.y);
        });
    }

    drawLangChain() {
        // Green gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#059669');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Chain nodes
        this.chains.forEach((chain, idx) => {
            chain.forEach((node, i) => {
                const offsetY = Math.sin(this.chainOffset + idx * 0.5 + i * 0.3) * 10;
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y + offsetY, node.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                if (i > 0) {
                    const prevOffsetY = Math.sin(this.chainOffset + idx * 0.5 + (i - 1) * 0.3) * 10;
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y + offsetY);
                    this.ctx.lineTo(chain[i - 1].x, chain[i - 1].y + prevOffsetY);
                    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    this.ctx.lineWidth = 3;
                    this.ctx.stroke();
                }
            });
        });
        
        this.chainOffset += 0.02;
    }

    drawAPI() {
        // Orange gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#f97316');
        gradient.addColorStop(1, '#ea580c');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Data packets
        this.dataPackets.forEach(packet => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${packet.opacity * 0.3})`;
            this.ctx.fillRect(packet.x, packet.y, packet.width, packet.height);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${packet.opacity})`;
            this.ctx.strokeRect(packet.x, packet.y, packet.width, packet.height);
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${packet.opacity})`;
            this.ctx.font = '10px monospace';
            this.ctx.fillText('API', packet.x + 8, packet.y + 14);
            
            packet.y += packet.speed;
            
            if (packet.y > this.canvas.height) {
                packet.y = -20;
                packet.x = Math.random() * this.canvas.width;
            }
        });
    }

    drawPython() {
        // Blue gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#1d4ed8');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Python code
        this.ctx.font = '14px monospace';
        this.codeLines.forEach(line => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`;
            this.ctx.fillText(line.text, line.x, line.y);
            
            line.x += line.speed;
            
            if (line.x > this.canvas.width) {
                line.x = -200;
            }
        });
    }
}

// Initialize all animations
document.querySelectorAll('.card-canvas').forEach(canvas => {
    const type = canvas.getAttribute('data-type');
    new CardAnimation(canvas, type);
});

document.querySelectorAll('.skill-canvas').forEach(canvas => {
    const skill = canvas.getAttribute('data-skill');
    new SkillAnimation(canvas, skill);
});

// Card Stacking Animation
function updateCardStack(container, cards) {
    const rect = container.getBoundingClientRect();
    const scrollProgress = -rect.top / (rect.height - window.innerHeight);
    const totalCards = cards.length;
    
    cards.forEach((card, i) => {
        const cardProgress = Math.max(0, Math.min(1, (scrollProgress - i / totalCards) * totalCards));
        const nextCardProgress = Math.max(0, Math.min(1, (scrollProgress - (i + 1) / totalCards) * totalCards));
        
        if (cardProgress === 0) {
            card.style.transform = `translateY(100%) scale(0.9)`;
            card.style.opacity = '0';
        } else if (cardProgress < 1) {
            const scale = 0.9 + (cardProgress * 0.1);
            const translateY = (1 - cardProgress) * 50;
            card.style.transform = `translateY(${translateY}%) scale(${scale})`;
            card.style.opacity = '1';
            card.style.zIndex = 100 + i;
        } else {
            const shrink = Math.max(0, 1 - nextCardProgress);
            card.style.transform = `translateY(${-nextCardProgress * 100}%) scale(${shrink})`;
            card.style.opacity = shrink;
            card.style.zIndex = 100 + i;
        }
    });
}

const projectContainer = document.getElementById('project-cards');
const projectCards = document.querySelectorAll('#project-cards .project-card-stack');

const skillsContainer = document.getElementById('skills-cards');
const skillCards = document.querySelectorAll('#skills-cards .skill-card-stack');

function onScroll() {
    updateCardStack(projectContainer, projectCards);
    updateCardStack(skillsContainer, skillCards);
}

window.addEventListener('scroll', onScroll);
onScroll();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Custom Cursor Glow
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
