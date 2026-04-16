// Neural Network SVG Animation
class NeuralNetwork {
    constructor() {
        this.svg = document.getElementById('neural-svg');
        if (!this.svg) return;
        
        this.nodes = [
            { id: 'aaryan', label: 'Aaryan', type: 'central' },
            { id: 'web', label: 'Web Dev', type: 'skill' },
            { id: 'ai', label: 'AI/ML', type: 'skill' },
            { id: 'python', label: 'Python', type: 'tech' },
            { id: 'js', label: 'JavaScript', type: 'tech' },
            { id: 'react', label: 'React', type: 'tech' },
            { id: 'ml', label: 'Machine Learning', type: 'tech' },
            { id: 'cloud', label: 'Cloud', type: 'skill' },
            { id: 'devops', label: 'DevOps', type: 'tech' }
        ];
        
        this.edges = [
            // Central to skills
            ['aaryan', 'web'], ['aaryan', 'ai'], ['aaryan', 'cloud'],
            // Skills to tech
            ['web', 'js'], ['web', 'react'], ['web', 'python'],
            ['ai', 'python'], ['ai', 'ml'],
            ['cloud', 'devops'], ['cloud', 'ml']
        ];
        
        this.startTime = performance.now();
        this.speed = 0.0003;
        this.baseRadius = 180;
        this.init();
    }
    
    init() {
        this.createDefs();
        this.createNodes();
        this.createEdges();
        this.animate();
    }
    
    createDefs() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Glow filter
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'glow');
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');
        
        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('in', 'SourceGraphic');
        feGaussianBlur.setAttribute('stdDeviation', '4');
        
        filter.appendChild(feGaussianBlur);
        defs.appendChild(filter);
        this.svg.appendChild(defs);
    }
    
    createNodes() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'nodes');
        
        const nonCentralNodes = this.nodes.filter(n => n.type !== 'central');
        const totalNodes = nonCentralNodes.length;
        
        this.nodes.forEach((node, i) => {
            if (node.type === 'central') {
                this.createCentralNode(node, g);
            }
        });
        
        nonCentralNodes.forEach((node, i) => {
            const angle = (2 * Math.PI * i) / totalNodes;
            const x = this.baseRadius * Math.cos(angle);
            const y = this.baseRadius * Math.sin(angle);
            this.createOrbitNode(node, g, x, y, angle);
        });
        
        this.svg.appendChild(g);
    }
    
    createCentralNode(node, parent) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'node central-node');
        g.setAttribute('id', `node-${node.id}`);
        
        // Outer ring
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', '0');
        ring.setAttribute('cy', '0');
        ring.setAttribute('r', '32');
        ring.setAttribute('stroke', '#38bdf8');
        ring.setAttribute('stroke-width', '2');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('filter', 'url(#glow)');
        
        // Core circle
        const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        core.setAttribute('cx', '0');
        core.setAttribute('cy', '0');
        core.setAttribute('r', '24');
        core.setAttribute('fill', 'rgba(56, 189, 248, 0.2)');
        core.setAttribute('stroke', '#38bdf8');
        core.setAttribute('stroke-width', '1.5');
        
        g.appendChild(ring);
        g.appendChild(core);
        parent.appendChild(g);
    }
    
    createOrbitNode(node, parent, x, y, angle) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', `node orbit-node ${node.type}`);
        g.setAttribute('id', `node-${node.id}`);
        g.setAttribute('data-angle', angle);
        g.setAttribute('transform', `translate(${x}, ${y})`);
        
        const size = node.type === 'skill' ? 20 : 16;
        const color = node.type === 'skill' ? '#a855f7' : '#00ffff';
        const glowColor = node.type === 'skill' ? '#a855f7' : '#38bdf8';
        
        // Glow circle
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', '0');
        glow.setAttribute('cy', '0');
        glow.setAttribute('r', size * 1.5);
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', color);
        glow.setAttribute('stroke-width', '0.5');
        glow.setAttribute('opacity', '0.5');
        
        // Main circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', size);
        circle.setAttribute('fill', `rgba(${color === '#00ffff' ? '0, 255, 255' : '168, 85, 247'}, 0.3)`);
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', '1.5');
        circle.setAttribute('filter', 'url(#glow)');
        
        g.appendChild(glow);
        g.appendChild(circle);
        
        // Add hover effect
        g.addEventListener('mouseenter', () => {
            circle.setAttribute('r', size * 1.3);
            circle.setAttribute('filter', 'url(#glow)');
        });
        g.addEventListener('mouseleave', () => {
            circle.setAttribute('r', size);
        });
        
        parent.appendChild(g);
    }
    
    createEdges() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'edges');
        g.setAttribute('stroke', '#38bdf8');
        g.setAttribute('stroke-width', '1');
        g.setAttribute('opacity', '0.4');
        g.setAttribute('fill', 'none');
        
        this.edges.forEach(([from, to]) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('id', `edge-${from}-${to}`);
            line.setAttribute('data-from', from);
            line.setAttribute('data-to', to);
            g.appendChild(line);
        });
        
        this.svg.appendChild(g);
    }
    
    getDepth(angle) {
        return 0.5 * (1 + Math.cos(angle - Math.PI));
    }
    
    updatePositions(t) {
        const nonCentralNodes = this.nodes.filter(n => n.type !== 'central');
        const totalNodes = nonCentralNodes.length;
        const breatheRadius = this.baseRadius + this.baseRadius * 0.1 * Math.sin(t * 0.0001);
        
        nonCentralNodes.forEach((node, i) => {
            const baseAngle = (2 * Math.PI * i) / totalNodes;
            const angle = baseAngle + t * this.speed;
            const depth = this.getDepth(angle);
            
            const scale = 0.7 + 0.4 * depth;
            const opacity = 0.3 + 0.7 * depth;
            const zIndex = Math.round(1 + 99 * depth);
            
            const x = breatheRadius * Math.cos(angle);
            const y = breatheRadius * Math.sin(angle);
            
            const nodeEl = document.getElementById(`node-${node.id}`);
            if (nodeEl) {
                nodeEl.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`);
                nodeEl.style.zIndex = zIndex;
                nodeEl.style.opacity = opacity;
            }
        });
        
        // Update edges
        this.edges.forEach(([from, to]) => {
            const fromEl = document.getElementById(`node-${from}`);
            const toEl = document.getElementById(`node-${to}`);
            const line = document.getElementById(`edge-${from}-${to}`);
            
            if (fromEl && toEl && line) {
                const fromTransform = fromEl.getAttribute('transform');
                const toTransform = toEl.getAttribute('transform');
                
                const fromMatch = fromTransform?.match(/translate\(([^,]+),\s*([^)]+)\)/) || ['', '0', '0'];
                const toMatch = toTransform?.match(/translate\(([^,]+),\s*([^)]+)\)/) || ['', '0', '0'];
                
                const fromX = parseFloat(fromMatch[1]) || 0;
                const fromY = parseFloat(fromMatch[2]) || 0;
                const toX = parseFloat(toMatch[1]) || 0;
                const toY = parseFloat(toMatch[2]) || 0;
                
                line.setAttribute('x1', fromX);
                line.setAttribute('y1', fromY);
                line.setAttribute('x2', toX);
                line.setAttribute('y2', toY);
            }
        });
    }
    
    animate = () => {
        const t = performance.now() - this.startTime;
        this.updatePositions(t);
        requestAnimationFrame(this.animate);
    }
}

// Theme Toggle and Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        if (themeToggle) themeToggle.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize neural network only on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        new NeuralNetwork();
    }
});