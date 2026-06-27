import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { personalInfo, projects, experiences, about } from '../../data/portfolioData';
import styles from './Chatbot.module.css';

const SUGGESTED_QUESTIONS = [
    "Pourquoi engager Adnane ?",
    "Parle-moi de ses qualités",
    "Voir ses meilleurs projets",
    "Comment le contacter ?"
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 0,
            text: `Bonjour ! 👋 Je suis l'assistant personnel IA d'Adnane. Je suis là pour vous montrer pourquoi il est le profil idéal pour votre prochain projet. Que souhaitez-vous explorer en premier ?`,
            isBot: true,
            isPlaceholder: false
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simple local responder (no RAG)
    const simpleResponder = async (text) => {
        const t = text.toLowerCase();
        const normalized = t.normalize('NFD').replace(/\p{Diacritic}/gu, '');

        if (normalized.match(/\b(projet|projets|portfolio)\b/)) {
            const projectNames = projects.map((project) => project.title).join(', ');
            return `Voici quelques projets récents : ${projectNames}. Vous pouvez demander des détails sur un projet en particulier.`;
        }

        if (normalized.match(/\b(contact|contacter|email|mail)\b/)) {
            return `Vous pouvez me contacter par email : ${personalInfo.email} ou via le formulaire de contact sur le portfolio.`;
        }

        if (normalized.match(/\b(competen|competence|competences|technologie|technologies|skill|skills)\b/)) {
            return `Adnane maîtrise notamment : Laravel, React, MySQL, Python, Java, Docker, PHP, Keycloak et JavaScript.`;
        }

        if (normalized.match(/\b(cv|resume|curriculum|c v|curriculum vitae)\b/)) {
            return `Mon CV est disponible ici : ${personalInfo.resume}`;
        }

        if (normalized.match(/\b(experience|experiences|stage|stages|stagiaire|stages?)\b/)) {
            const expSummaries = experiences
                .filter((exp) => exp.type === 'work')
                .map((exp) => `${exp.title} chez ${exp.company}`)
                .join(', ');
            return `Adnane a travaillé sur : ${expSummaries}. Consultez la section expérience pour plus de détails.`;
        }

        if (normalized.match(/\b(a propos|apropos|bio|qui es tu|qui es tu|present|parle moi|parle\-moi)\b/)) {
            return about.bio;
        }

        if (normalized.match(/\b(qualit|fort|atout|points forts)\b/)) {
            return 'Adnane est rigoureux, autonome et orienté résultats. Il sait travailler en équipe et produire des interfaces soignées et performantes.';
        }

        if (normalized.match(/\b(formation|etude|etudes|diplome|diplome|universite|ofppt|upf)\b/)) {
            return 'Il étudie actuellement en cycle d\'ingénieur en Génie Informatique à l\'Université Privée de Fès et est diplômé d\'un DTS Full Stack à l\'OFPPT.';
        }

        if (normalized.match(/\b(bonjour|salut|hello|coucou)\b/)) {
            return 'Bonjour ! Je suis l\'assistant d\'Adnane. Posez une question sur ses projets, ses compétences ou ses expériences.';
        }

        return 'Je suis l\'assistant d\'Adnane. Posez une question sur ses projets, compétences ou expériences, et je vous répondrai.';
    };

    const handleSendText = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = {
            id: Date.now() + Math.random(),
            text: text.trim(),
            isBot: false,
            isPlaceholder: false
        };

        const placeholderMessage = {
            id: `placeholder-${Date.now()}`,
            text: "Génération de la réponse...",
            isBot: true,
            isPlaceholder: true
        };

        setMessages((prev) => [...prev, userMessage, placeholderMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            const answer = await simpleResponder(userMessage.text);
            setMessages((prev) => prev.map((msg) =>
                msg.id === placeholderMessage.id
                    ? { ...msg, text: answer, isPlaceholder: false }
                    : msg
            ));
        } catch (error) {
            console.error('[Chatbot] Error:', error);
            setMessages((prev) => prev.map((msg) =>
                msg.id === placeholderMessage.id
                    ? { ...msg, text: '⚠️ Une erreur est survenue. Veuillez réessayer plus tard.', isPlaceholder: false }
                    : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        handleSendText(inputText);
    };

    return (
        <div className={styles.chatbotContainer}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.chatWindow}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.chatHeader}>
                            <div className={styles.headerInfo}>
                                <img src={personalInfo.avatar} alt={personalInfo.name} className={styles.avatar} />
                                <div>
                                    <h4 className={styles.title}>Assistant Adnane</h4>
                                    <span className={styles.status}>Prêt à vous répondre</span>
                                </div>
                            </div>
                            <button onClick={toggleChat} className={styles.closeButton}>
                                <FiX />
                            </button>
                        </div>

                        <div className={styles.chatMessages}>
                            {messages.map((msg, index) => (
                                <React.Fragment key={index}>
                                    <div className={`${styles.messageWrapper} ${msg.isBot ? styles.msgBot : styles.msgUser}`}>
                                        <div className={`${styles.messageBubble} ${msg.isPlaceholder ? styles.placeholderBubble : ''}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                    
                                    {/* Display suggestion grid immediately after the bot's last message */}
                                    {index === messages.length - 1 && msg.isBot && (
                                        <div className={styles.suggestionsGridContainer}>
                                            <p className={styles.suggestionsTitle}>Essayez de demander :</p>
                                            <div className={styles.suggestionsGrid}>
                                                {SUGGESTED_QUESTIONS.map((question, i) => (
                                                    <button 
                                                        key={i} 
                                                        className={styles.gridChip}
                                                        onClick={() => handleSendText(question)}
                                                    >
                                                        {question}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className={styles.chatInput}>
                            <input
                                type="text"
                                placeholder="Posez une question à propos d'Adnane..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" disabled={!inputText.trim()} className={styles.sendButton}>
                                <FiSend />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.fab}
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
