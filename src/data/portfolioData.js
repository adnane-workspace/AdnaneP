export const personalInfo = {
    name: "EL MENOUAR Adnane",
    role: "Full-Stack Developer & QA Automation Engineer",
    tagline: "Étudiant motivé, passionné par le développement et les technologies",
    description: "Étudiant en ingénierie informatique, passionné par le développement web et la qualité logicielle. Je m’intéresse à la fois à la conception d’applications full stack performantes et à leur validation à travers des pratiques de testing (tests fonctionnels, API et automatisation). Rigoureux et orienté détail, je cherche à contribuer à des projets en assurant fiabilité, performance et bonne expérience utilisateur.",
    email: "adnaneelmenouar7@gmail.com",
    phone: "+212 663-219524",
    location: "Lotissement Mamounia, Route de Setrou - Fès",
    avatar: "/images/avatar.jpg",
    avatar2: "/images/adnane2.jpeg",
    avatar3: "/images/adnane3.jpeg",
    avatars: [
        "/images/avatar.jpg",
        "/images/adnane2.jpeg",
        "/images/adnane3.jpeg",
        "/images/adnane4.jpeg"
    ],
    resume: "/documents/cv.pdf"
};

export const socialLinks = {
    github: "https://github.com/adnane-workspace",
    linkedin: "https://www.linkedin.com/in/adnane-el-menouar-b0020230b/",
};

export const skills = [
    {
        id: 1,
        name: "Laravel",
        category: "Backend",
        level: 85,
        icon: "FaLaravel"
    },
    {
        id: 2,
        name: "React",
        category: "Frontend",
        level: 80,
        icon: "FaReact"
    },
    {
        id: 3,
        name: "MySQL",
        category: "Database",
        level: 85,
        icon: "FaDatabase"
    },
    {
        id: 4,
        name: "Python",
        category: "Language",
        level: 75,
        icon: "FaPython"
    },
    {
        id: 5,
        name: "Java",
        category: "Language",
        level: 70,
        icon: "FaJava"
    },
    {
        id: 6,
        name: "Docker",
        category: "DevOps",
        level: 70,
        icon: "FaDocker"
    },
    {
        id: 7,
        name: "PHP",
        category: "Backend",
        level: 85,
        icon: "FaPhp"
    },
    {
        id: 8,
        name: "GitHub",
        category: "Tools",
        level: 80,
        icon: "FaGithub"
    },
    {
        id: 9,
        name: "JavaScript",
        category: "Language",
        level: 80,
        icon: "SiJavascript"
    },
    {
        id: 10,
        name: "Keycloak",
        category: "Security",
        level: 70,
        icon: "SiOpenid"
    }
];

export const projects = [
    {
        id: 3,
        title: "Portfolio Personnel",
        description: "Portfolio professionnel moderne et responsive développé avec React et Vite. Présentation de mes compétences, projets et expériences avec animations fluides et mode sombre.",
        image: "/images/project3.jpg",
        tags: ["React", "Vite", "Framer Motion", "CSS"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 1,
        title: "Gestion des Ressources Humaines",
        description: "Application web de gestion des ressources humaines avec Laravel, React et Keycloak. Gestion des employés, absences, présences et retards.",
        image: "/images/project1.jpg",
        tags: ["Laravel", "React"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 2,
        title: "Gestion d'Hébergement",
        description: "Application web de gestion d'hébergement développée avec Laravel et MySQL. Automatisation des réservations, factures et suivi de disponibilité des chambres.",
        image: "/images/project2.jpg",
        tags: ["Laravel", "MySQL", "PHP"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 4,
        title: "Détection ASL en Temps Réel",
        description: "Système de détection de la langue des signes (ASL) en temps réel : capture de gestes via caméra, reconnaissance des lettres/ mots, et traduction. Backend en FastAPI + PyTorch, inférence optimisée avec TorchScript et WebSocket pour la prise en charge mobile.",
        image: "/images/sign.jpg",
        tags: ["PyTorch", "FastAPI", "WebSocket", "Mobile", "TorchScript"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 5,
        title: "STOCKLY — Plateforme de Gestion de Stock",
        description: "Plateforme complète de gestion des stocks et commerce pour PME. Backend Spring Boot + MySQL, frontend Angular, authentification JWT, conteneurisation Docker et déploiement cloud.",
        image: "/images/stokly.jpg",
        tags: ["Spring Boot", "Angular", "MySQL", "Docker", "JWT"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 6,
        title: "Système intelligent de gestion scolaire",
        description: "Système académique complet avec tableau de bord multi-rôles, gestion CRUD des étudiants et professeurs, planification dynamique des filières/modules/salles/emplois du temps, saisie sécurisée des notes par les professeurs et consultation en temps réel par les étudiants, calcul automatique des moyennes pondérées (GPA). Interface premium basée sur Tailwind CSS (Geist/Inter, glassmorphism).",
        image: "/images/uni.jpg",
        tags: ["Laravel", "MySQL", "Docker", "JWT"],
        github: "https://github.com/adnane-workspace",
    }
];  

export const servicesList = [
    {
        id: 7,
        title: "SCANOSH — Menu digital QR",
        description: "Menu digital pour cafés, restaurants et snacks : un QR code à scanner, accès instantané au menu, et gestion depuis un dashboard. Mise à jour à tout moment.",
        image: "/images/scanosh.jpg",
        tags: ["React", "Express JS", "PostgreSQL", "Cloudinary", "Cloudflare"],
        url: "https://scanosh.com",
        featured: true
    }
];

export const experiences = [
    {
        id: 1,
        type: "work",
        title: "Ingenieur QA",
        company: "Neologix",
        location: "Fès",
        period: "01/07/2026 - 31/08/2026",
        description: "Réalisation de tests manuels et automatisés sur l'application AvocatPro : conception et exécution de scénarios de test, tests fonctionnels et de régression, identification et suivi des anomalies.",
        achievements: []
    },
    {
        id: 2,
        type: "work",
        title: "Stagiaire en développement Full-Stack",
        company: "Nelogix",
        location: "Fès",
        period: "01/07/2025 - 31/08/2025",
        description: "Réalisation d'un projet de gestion des ressources humaines avec Laravel, React et Keycloak.",
        achievements: [
            "Gestion des employés",
            "Gestion des absences",
            "Gestion des présences et des retards"
        ]
    },
    {
        id: 3,
        type: "work",
        title: "Stagiaire en développement Full-Stack",
        company: "COS ONEE",
        location: "Fès-Meknès",
        period: "01/03/2025 - 31/03/2025",
        description: "Réalisation d'une application web de gestion d'hébergement avec Laravel et MySQL.",
        achievements: [
            "Automatisation des réservations et factures",
            "Suivi de la disponibilité des chambres"
        ]
    },
    {
        id: 4,
        type: "work",
        title: "Stagiaire en développement web",
        company: "École polytechnique des Génies-Fès",
        location: "Fès",
        period: "08/08/2024 - 08/09/2024",
        description: "Participation à l'évolution du site principal de l'école en utilisant PHP, JavaScript, HTML et CSS.",
        achievements: []
    },
    {
        id: 5,
        type: "education",
        title: "Cycle d'ingénieur en Génie Informatique",
        company: "UPF - Université Privée de Fès",
        location: "Fès",
        period: "Depuis 2025",
        description: "Formation d'ingénieur en génie informatique (1ère année cycle d'ingénieur).",
        achievements: []
    },
    {
        id: 6,
        type: "education",
        title: "DTS Développement Digital Full stack",
        company: "OFPPT - Office de la formation professionnelle",
        location: "Fès",
        period: "2023 - 2025",
        description: "Formation en développement digital full stack avec spécialisation Laravel, React et technologies web modernes.",
        achievements: []
    }
];

export const events = [
    {
        id: 4,
        date: "09-08-2026",
        location: "Casablanca",
        title: "Café Cursor Casablanca",
        images: ["/images/cursor1.jpeg", "/images/adnane3.jpeg"],
        tags: ["Networking", "Cursor"]
    },
    {
        id: 3,
        date: "26-07-2026",
        location: "Casablanca",
        title: "Build with Gemma Hackathon Casablanca",
        images: ["/images/gemma1.jpeg", "/images/adnane4.jpeg", "/images/gemma2.jpeg"],
        tags: ["Gemma", "IA", "Google"],
        result: "1ᵉ place"
    },
    {
        id: 2,
        date: "20-06-2026",
        location: "Merzouga",
        title: "Rallye IA - Future Lab",
        images: ["/images/merz1.jpeg", "/images/merz2.jpeg"],
        tags: ["hackathon", "IA", "Ingénierie", "Merzouga"]
    },
    {
        id: 1,
        date: "16-05-2026",
        location: "UPF University",
        title: "National UPF Robotics Competition — 9ᵉ édition",
        images: ["/images/robotic2.jpeg", "/images/robotic1.jpeg", "/images/robotic3.jpeg"],
        tags: ["Robotique", "Compétition", "UPF"],
        featured: true,
        result: "3ᵉ place"
    }
];

export const about = {
    bio: "Étudiant en ingénierie informatique, passionné par le développement web et la qualité logicielle. Je m’intéresse à la fois à la conception d’applications full stack performantes et à leur validation à travers des pratiques de testing (tests fonctionnels, API et automatisation). Rigoureux et orienté détail, je cherche à contribuer à des projets en assurant fiabilité, performance et bonne expérience utilisateur.",
    interests: [
        "Développement Full-Stack",
        "Technologies Web",
        "Méthodes Agiles",
        "Analyse et Initiative",
        "Apprentissage Rapide",
        "Travail d'Équipe"
    ],
    stats: [
        { label: "Années d'études", value: "3+" },
        { label: "Projets réalisés", value: "7+" },
        { label: "Stages complétés", value: "3" },
        { label: "Technologies", value: "10+" }
    ]
};
