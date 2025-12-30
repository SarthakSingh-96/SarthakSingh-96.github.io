// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Parallax scroll effect
let lastScrollTop = 0;
const body = document.body;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when user scrolls down
    if (scrollTop > 50) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }

    // Simple fade and scale for image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = 1 - scrollTop * 0.003;
    }

    // Fade in sections as they come into view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });

    lastScrollTop = scrollTop;
});


// Initial trigger for hero section
window.addEventListener('load', () => {
    document.querySelector('.hero').classList.add('visible');
});

// Smooth scroll for scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.querySelector('span');
    const originalText = buttonText.textContent;
    
    // Show loading state
    buttonText.textContent = 'Sending...';
    button.disabled = true;
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem sending your message. Please try again or email me directly at sarthaksingh1211@gmail.com');
        }
    } catch (error) {
        alert('Oops! There was a problem sending your message. Please try again or email me directly at sarthaksingh1211@gmail.com');
    } finally {
        buttonText.textContent = originalText;
        button.disabled = false;
    }
});

// Active navigation highlighting on scroll
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    navSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#f093fb';
        }
    });
});

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectData = {
        'Enterprise RAG System with Multi-Document QA': {
            icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
            description: 'Built a production-grade Retrieval-Augmented Generation (RAG) system capable of processing over 10,000 documents with 92% accuracy. Leverages FAISS vector indexing and OpenAI GPT-4 for context-aware question answering, enabling intelligent document retrieval and natural language understanding at enterprise scale.',
            features: [
                'Hybrid search combining semantic search and BM25 achieving 0.87 precision@5',
                'Reduced hallucination rate from 18% to 4% through citation tracking',
                'FastAPI microservice handling 1,200+ queries/hour at 240ms average latency',
                'Redis caching implementation cutting operational costs by $800/month (45%)',
                'Supports multi-format documents (PDF, DOCX, TXT, HTML) with automatic parsing'
            ],
            tags: ['LangChain', 'OpenAI GPT-4', 'Pinecone', 'FastAPI'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'Agent-Based MLOps Platform': {
            icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
            description: 'Architected an autonomous machine learning framework featuring 5 specialized AI agents that collaborate to perform end-to-end ML tasks. Executed 50+ Optuna hyperparameter tuning trials achieving 92% AUROC on 200K+ healthcare samples, with built-in explainable AI capabilities for model transparency.',
            features: [
                'Integrated SHAP and LIME for explainable AI dashboards',
                'Reduced algorithmic bias by 15% through fairness metrics validation',
                'Automated EDA reducing setup time by 60% for 20+ datasets',
                'MLflow experiment tracking for 500+ model versions',
                'Streamlit-based UI for non-technical users to deploy ML pipelines'
            ],
            tags: ['Python', 'Streamlit', 'XGBoost', 'SHAP'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'Neural Radiance Fields (NeRF) 3D Reconstruction': {
            icon: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
            description: 'Engineered a GPU-accelerated Neural Radiance Fields pipeline with volumetric ray marching for photorealistic 3D scene reconstruction. Achieved 28.5 dB PSNR and 0.92 SSIM using FP16 mixed-precision training, enabling high-quality novel view synthesis from sparse image inputs.',
            features: [
                'COLMAP Structure-from-Motion and Poisson surface reconstruction',
                'Support for multiple 3D formats (PLY, OBJ, FBX) with real-time export',
                'Throughput improvement of 40% achieving 21 FPS rendering',
                'Camera pose estimation at 95% accuracy using SIFT/RANSAC',
                'Optimized for AR/VR applications with low-latency inference'
            ],
            tags: ['PyTorch', 'CUDA', 'JAX', 'NumPy'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        'Distributed Banking System with Consensus Protocol': {
            icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80',
            description: 'Architected a distributed banking application implementing Linear-PBFT consensus protocol for Byzantine fault tolerance across 10+ nodes. Achieved 99.9% system uptime with 1,000+ transactions per second throughput, ensuring robust financial operations in a distributed environment.',
            features: [
                'Byzantine fault tolerance ensuring system reliability with up to 1/3 faulty nodes',
                'Optimized transaction throughput by 22% reducing latency from 500ms to 320ms',
                'Asynchronous processing with gRPC for high-performance distributed communication',
                'Automatic failover with 2-second recovery time maintaining ACID guarantees',
                'Comprehensive monitoring and logging infrastructure for production reliability'
            ],
            tags: ['Python', 'gRPC', 'Docker', 'Redis'],
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        'Weather App': {
            icon: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&q=80',
            description: 'Interactive weather application providing real-time weather information and forecasts for locations worldwide. Features a clean, modern interface with intuitive search functionality and comprehensive weather data display.',
            features: [
                'Real-time weather data integration using Weather API',
                'Location-based weather search with autocomplete functionality',
                'Detailed weather metrics including temperature, humidity, wind speed, and conditions',
                'Responsive design optimized for mobile and desktop viewing',
                'Clean UI with weather icons and visual indicators for quick understanding'
            ],
            tags: ['JavaScript', 'HTML/CSS', 'Weather API', 'Responsive Design'],
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        },
        'Stock Prediction': {
            icon: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
            description: 'Machine learning-powered stock price prediction system leveraging historical market data and advanced time series analysis. Implements predictive algorithms to forecast stock trends and provide data-driven insights for investment decisions.',
            features: [
                'Time series analysis using LSTM and ARIMA models for price forecasting',
                'Historical data processing with Pandas for feature engineering',
                'Visualization dashboard displaying trends, predictions, and confidence intervals',
                'Technical indicators integration (Moving Averages, RSI, MACD) for enhanced accuracy',
                'Model evaluation with RMSE and MAE metrics achieving competitive prediction accuracy'
            ],
            tags: ['Python', 'Machine Learning', 'Pandas', 'Data Analysis'],
            gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
        },
        'Football Analysis Dashboard': {
            icon: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
            description: 'Comprehensive sports analytics platform for football data visualization and performance analysis. Provides interactive dashboards with detailed player statistics, team performance metrics, and match insights for data-driven decision making.',
            features: [
                'Interactive data visualization with dynamic charts and graphs for match analysis',
                'Player performance tracking with statistical metrics and comparison tools',
                'Team analytics including possession, shots, passes, and tactical formations',
                'Real-time data updates and historical trend analysis across multiple seasons',
                'Customizable dashboard views for coaches, analysts, and sports enthusiasts'
            ],
            tags: ['Python', 'Data Visualization', 'Dashboard', 'Analytics'],
            gradient: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)'
        },
        'EV Charging Optimization using Stochastic Dynamic Programming': {
            icon: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80',
            description: 'Advanced optimization framework for electric vehicle charging infrastructure leveraging stochastic dynamic programming algorithms. Optimizes charging schedules, load balancing, and resource allocation to minimize costs while meeting demand uncertainty and grid constraints.',
            features: [
                'Stochastic dynamic programming for optimal charging policy under uncertain demand',
                'Multi-objective optimization balancing cost reduction, grid stability, and user satisfaction',
                'Real-time decision-making framework for adaptive charging schedule adjustments',
                'Integration of renewable energy sources and time-of-use pricing models',
                'Simulation engine testing various scenarios for infrastructure planning and scalability'
            ],
            tags: ['Python', 'Optimization', 'Dynamic Programming', 'EV Technology'],
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        'Chatbot': {
            icon: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80',
            description: 'Intelligent conversational AI chatbot utilizing natural language processing and machine learning algorithms. Provides automated, context-aware responses for interactive user conversations with intent recognition and sentiment analysis capabilities.',
            features: [
                'Natural language understanding with tokenization and intent classification',
                'Context-aware conversation flow maintaining dialogue history',
                'Machine learning models trained on diverse conversational datasets',
                'Multi-turn dialogue support with entity recognition and slot filling',
                'Extensible architecture for custom integrations and domain-specific knowledge'
            ],
            tags: ['Python', 'NLP', 'AI', 'Machine Learning'],
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        },
        'Youth Fitness Health Predictor': {
            icon: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
            description: 'Machine learning system predicting youth health outcomes using comprehensive multi-modal data including physical measurements, fitness assessments, body composition analysis, and behavioral indicators. Leverages LightGBM with custom threshold optimization achieving high accuracy using Quadratic Weighted Kappa metric for ordinal classification of functional impairment severity.',
            features: [
                'Multi-modal data integration from physical measures (BMI, blood pressure), fitness tests (FitnessGram, treadmill), and behavioral assessments (PCIAT)',
                'Time-series feature extraction from accelerometer data capturing activity patterns and movement metrics',
                'Custom threshold optimization algorithm maximizing Quadratic Weighted Kappa (QWK) for ordinal classification',
                'Hyperparameter tuning with Optuna across 30 trials optimizing learning rate, tree depth, and regularization',
                'Robust missing data handling and strategic feature engineering for incomplete assessment records',
                'Cross-validated ensemble approach with 5-fold Stratified K-Fold achieving competitive performance'
            ],
            tags: ['Python', 'LightGBM', 'Optuna', 'Time Series'],
            gradient: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)'
        },
        'Speech-Based Movie Recommendation System': {
            icon: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&q=80',
            description: 'Emotion recognition system leveraging speech signal processing and deep learning to detect emotions from voice patterns and recommend movies that match the detected emotional state. Provides personalized movie suggestions based on real-time speech emotion analysis.',
            features: [
                'Audio feature extraction using MFCC, spectrogram analysis, and prosodic features',
                'Deep learning models (CNN, LSTM, or hybrid architectures) for emotion classification',
                'Real-time speech processing with emotion detection across multiple emotion categories',
                'Movie recommendation engine matching films to detected emotional states',
                'Personalized suggestions considering emotion intensity and genre preferences'
            ],
            tags: ['Python', 'Deep Learning', 'Audio Processing', 'TensorFlow'],
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }
    };

    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalIcon = document.querySelector('.modal-icon');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalFeatures = document.querySelector('.modal-features');
    const modalTags = document.querySelector('.modal-tags');

    // Prevent project card clicks from interfering with links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

// Add click event to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on a link or inside project-links
        if (e.target.closest('.project-links') || e.target.closest('a')) {
            return;
        }
        
        const projectTitle = this.querySelector('h3').textContent;
        const project = projectData[projectTitle];
        
        if (project) {
            // Set modal content
            modalIcon.innerHTML = `<img src="${project.icon}" alt="${projectTitle}">`;
            modalIcon.style.background = project.gradient;
            modalTitle.textContent = projectTitle;
            modalDescription.textContent = project.description;
            
            // Set features
            modalFeatures.innerHTML = project.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
            
            // Set tags
            modalTags.innerHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
