const en = {
    language: {
        label: 'Language',
        fr: 'French',
        en: 'English',
        switchTo: 'Switch to French'
    },
    nav: {
        home: 'Home',
        events: 'Events',
        projects: 'Projects',
        skills: 'Skills',
        experience: 'Experience',
        contact: 'Contact',
        openMenu: 'Open menu',
        closeMenu: 'Close menu'
    },
    theme: {
        toggle: 'Toggle theme',
        toDark: 'Switch to dark mode',
        toLight: 'Switch to light mode'
    },
    hero: {
        greeting: "Hi, I'm",
        contact: 'Contact me',
        resume: 'Download my CV',
        projects: 'View my projects',
        scrollEvents: 'Go to events'
    },
    events: {
        title: 'Events',
        subtitle: 'Competitions, hackathons and meetups',
        prev: 'Previous event',
        next: 'Next event',
        carousel: 'Events carousel',
        nav: 'Events navigation',
        prevPhoto: 'Previous photo',
        nextPhoto: 'Next photo',
        close: 'Close'
    },
    projects: {
        title: 'My Projects',
        subtitle: 'A selection of my recent work',
        featured: 'Featured',
        code: 'Code',
        demo: 'Demo',
        more: 'Show more',
        less: 'Show less'
    },
    skills: {
        title: 'Technical Skills',
        aria: 'Technical skills'
    },
    experience: {
        title: 'Experience & Education',
        work: 'Work Experience',
        education: 'Education',
        more: 'Show more',
        less: 'Show less'
    },
    contact: {
        title: 'Get in touch',
        subtitle: 'A question? A project? Feel free to reach out!',
        infoTitle: "Let's stay in touch",
        infoText: "I'm always open to new opportunities and collaborations. Don't hesitate to contact me!",
        formAria: 'Contact form',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        message: 'Message',
        messagePlaceholder: 'Your message...',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Something went wrong. Please try again.',
        subject: 'New message from {{name}}'
    },
    chatbot: {
        title: 'Adnane Assistant',
        status: 'Ready to help',
        welcome: "Hi! 👋 I'm Adnane's personal AI assistant. I'm here to show you why he's a great fit for your next project. What would you like to explore first?",
        suggestionsTitle: 'Try asking:',
        suggestions: [
            'Why hire Adnane?',
            'Tell me about his strengths',
            'Show me his best projects',
            'How can I contact him?'
        ],
        placeholder: 'Ask a question about Adnane...',
        generating: 'Generating a reply...',
        error: '⚠️ Something went wrong. Please try again later.',
        open: 'Open chat',
        close: 'Close chat',
        replies: {
            projects: 'Here are some recent projects: {{list}}. You can ask for details about a specific one.',
            contact: 'You can reach me by email at {{email}} or through the contact form on this portfolio.',
            skills: 'Adnane works with Laravel, React, MySQL, Python, Java, Docker, PHP, Keycloak and JavaScript.',
            resume: 'My resume is available here: {{url}}',
            experience: 'Adnane has worked on: {{list}}. Check the experience section for more details.',
            qualities: 'Adnane is rigorous, autonomous and results-driven. He works well in a team and ships polished, performant interfaces.',
            education: 'He is currently in a Computer Engineering program at Université Privée de Fès and holds a Full-Stack DTS from OFPPT.',
            hello: "Hi! I'm Adnane's assistant. Ask about his projects, skills or experience.",
            fallback: "I'm Adnane's assistant. Ask about his projects, skills or experience and I'll help."
        }
    },
    meta: {
        description: 'Portfolio of EL MENOUAR Adnane — Full-Stack Developer & QA Automation Engineer'
    },
    content: {
        role: 'Full-Stack Developer & QA Automation Engineer',
        tagline: 'Motivated student, passionate about development and technology',
        description: 'Full-Stack developer and QA engineer focused on building modern, reliable applications. I combine web development and quality assurance to ship performant solutions, while automating tests and safeguarding product quality.',
        bio: 'Computer engineering student passionate about full-stack development and new technologies. I work with Laravel, React, MySQL, Python and Java. My goal is to grow through concrete projects and hands-on experience.',
        stats: [
            { label: 'Years of study' },
            { label: 'Projects shipped' },
            { label: 'Internships' },
            { label: 'Technologies' }
        ],
        projects: {
            3: {
                title: 'Personal Portfolio',
                description: 'A modern, responsive professional portfolio built with React and Vite. Skills, projects and experience with smooth animations and dark mode.'
            },
            1: {
                title: 'Human Resources Management',
                description: 'HR web app with Laravel, React and Keycloak. Employee management, absences, attendance and delays.'
            },
            2: {
                title: 'Accommodation Management',
                description: 'Accommodation management web app built with Laravel and MySQL. Automated bookings, invoices and room availability tracking.'
            },
            4: {
                title: 'Real-time ASL Detection',
                description: 'Real-time American Sign Language detection: camera capture, letter/word recognition and translation. FastAPI + PyTorch backend, TorchScript inference and WebSocket support for mobile.'
            },
            5: {
                title: 'STOCKLY — Inventory Platform',
                description: 'End-to-end inventory and commerce platform for SMEs. Spring Boot + MySQL backend, Angular frontend, JWT auth, Docker and cloud deployment.'
            },
            6: {
                title: 'Intelligent school management system',
                description: 'Full academic system with a multi-role dashboard, student and teacher CRUD, dynamic planning for majors/modules/rooms/timetables, secure grade entry by teachers and live student consultation, automatic weighted GPA. Premium Tailwind CSS interface (Geist/Inter, glassmorphism).'
            }
        },
        experiences: {
            1: {
                title: 'QA Engineer',
                description: 'Manual and automated testing on the AvocatPro application: designing and running test scenarios, functional and regression testing, bug identification and tracking.'
            },
            2: {
                title: 'Full-Stack Development Intern',
                description: 'Built an HR management project with Laravel, React and Keycloak.',
                achievements: [
                    'Employee management',
                    'Absence management',
                    'Attendance and delay tracking'
                ]
            },
            3: {
                title: 'Full-Stack Development Intern',
                description: 'Built an accommodation management web app with Laravel and MySQL.',
                achievements: [
                    'Automated bookings and invoices',
                    'Room availability tracking'
                ]
            },
            4: {
                title: 'Web Development Intern',
                description: "Contributed to the school's main website using PHP, JavaScript, HTML and CSS."
            },
            5: {
                title: 'Computer Engineering degree',
                period: 'Since 2025',
                description: 'Computer engineering program (1st year of the engineering cycle).'
            },
            6: {
                title: 'DTS Digital Full-Stack Development',
                description: 'Full-stack digital development program focused on Laravel, React and modern web technologies.'
            }
        },
        events: {
            4: {
                title: 'Cursor Café Casablanca',
                tags: ['Networking', 'Cursor']
            },
            3: {
                title: 'Build with Gemma Hackathon Casablanca',
                tags: ['Gemma', 'AI', 'Google'],
                result: '1st place'
            },
            2: {
                title: 'AI Rally - Future Lab',
                tags: ['hackathon', 'AI', 'Engineering', 'Merzouga']
            },
            1: {
                title: 'National UPF Robotics Competition — 9th edition',
                tags: ['Robotics', 'Competition', 'UPF'],
                result: '3rd place'
            }
        }
    }
};

export default en;
