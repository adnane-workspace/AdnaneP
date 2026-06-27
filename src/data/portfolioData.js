
export const personalInfo = {
    name: "EL MENOUAR Adnane",
    role: "Futur Ingénieur d'État en Informatique",
    tagline: "Étudiant motivé, passionné par le développement et les technologies",
    description: "Étudiant motivé, passionné par le développement et les technologies, cherchant à renforcer ses compétences à travers des projets et expériences pratiques.",
    email: "adnaneelmenouar7@gmail.com",
    phone: "+212 663-219524",
    location: "Lotissement Mamounia, Route de Setrou - Fès",
    avatar: "/AdnaneP/images/avatar.jpg",
    avatar2: "/AdnaneP/images/adnane2.jpeg",
    avatar3: "/AdnaneP/images/adnane3.jpeg",
    avatars: [
        "/AdnaneP/images/avatar.jpg",
        "/AdnaneP/images/adnane2.jpeg",
        "/AdnaneP/images/adnane3.jpeg"
    ],
    resume: "/AdnaneP/documents/cv.pdf"
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
        image: "/AdnaneP/images/project3.png",
        tags: ["React", "Vite", "Framer Motion", "CSS"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 1,
        title: "Gestion des Ressources Humaines",
        description: "Application web de gestion des ressources humaines avec Laravel, React et Keycloak. Gestion des employés, absences, présences et retards.",
        image: "/AdnaneP/images/project1.png",
        tags: ["Laravel", "React"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 2,
        title: "Gestion d'Hébergement",
        description: "Application web de gestion d'hébergement développée avec Laravel et MySQL. Automatisation des réservations, factures et suivi de disponibilité des chambres.",
        image: "/AdnaneP/images/project2.jpg",
        tags: ["Laravel", "MySQL", "PHP"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 4,
        title: "Détection ASL en Temps Réel",
        description: "Système de détection de la langue des signes (ASL) en temps réel : capture de gestes via caméra, reconnaissance des lettres/ mots, et traduction. Backend en FastAPI + PyTorch, inférence optimisée avec TorchScript et WebSocket pour la prise en charge mobile.",
        image: "/AdnaneP/images/sign.png",
        tags: ["PyTorch", "FastAPI", "WebSocket", "Mobile", "TorchScript"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 5,
        title: "STOCKLY — Plateforme de Gestion de Stock",
        description: "Plateforme complète de gestion des stocks et commerce pour PME. Backend Spring Boot + MySQL, frontend Angular, authentification JWT, conteneurisation Docker et déploiement cloud.",
        image: "/AdnaneP/images/stokly.jpg",
        tags: ["Spring Boot", "Angular", "MySQL", "Docker", "JWT"],
        github: "https://github.com/adnane-workspace",
    },
    {
        id: 6,
        title: "STOCKLY — Plateforme de Gestion de Stock",
        description: "Système académique complet avec tableau de bord multi-rôles, gestion CRUD des étudiants et professeurs, planification dynamique des filières/modules/salles/emplois du temps, saisie sécurisée des notes par les professeurs et consultation en temps réel par les étudiants, calcul automatique des moyennes pondérées (GPA). Interface premium basée sur Tailwind CSS (Geist/Inter, glassmorphism).",
        image: "/AdnaneP/images/uni.png",
        tags: ["Laravel", "MySQL", "Docker", "JWT"],
        github: "https://github.com/adnane-workspace",
    }
];  

export const experiences = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
        type: "work",
        title: "Stagiaire en développement web",
        company: "École polytechnique des Génies-Fès",
        location: "Fès",
        period: "08/08/2024 - 08/09/2024",
        description: "Participation à l'évolution du site principal de l'école en utilisant PHP, JavaScript, HTML et CSS.",
        achievements: []
    },
    {
        id: 4,
        type: "education",
        title: "Cycle d'ingénieur en Génie Informatique",
        company: "UPF - Université Privée de Fès",
        location: "Fès",
        period: "Depuis 2025",
        description: "Formation d'ingénieur en génie informatique (1ère année cycle d'ingénieur).",
        achievements: []
    },
    {
        id: 5,
        type: "education",
        title: "DTS Développement Digital Full stack",
        company: "OFPPT - Office de la formation professionnelle",
        location: "Fès",
        period: "2023 - 2025",
        description: "Formation en développement digital full stack avec spécialisation Laravel, React et technologies web modernes.",
        achievements: []
    }
];

export const about = {
    bio: "Étudiant en génie informatique, passionné par le développement full-stack et les nouvelles technologies. Je maîtrise plusieurs technologies dont Laravel, React, MySQL, Python et Java. Mon objectif est de renforcer mes compétences à travers des projets concrets et des expériences pratiques enrichissantes.",
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
        { label: "Projets réalisés", value: "5+" },
        { label: "Stages complétés", value: "3" },
        { label: "Technologies", value: "10+" }
    ]
};
