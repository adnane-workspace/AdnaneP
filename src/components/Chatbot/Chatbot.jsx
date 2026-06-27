import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
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
        if (t.includes('projet') || t.includes('projets')) return "Vous pouvez consulter mes projets dans la section 'Mes Projets'. Souhaitez-vous en voir un en particulier ?";
        if (t.includes('contact') || t.includes('contacter')) return `Vous pouvez me contacter par email: ${personalInfo.email}`;
        if (t.includes('competences') || t.includes('compétences') || t.includes('technologies')) return 'Je maîtrise Laravel, React, MySQL, Python, Java, Docker et d\'autres technologies web.';
        if (t.includes('cv') || t.includes('resume') || t.includes('curriculum')) return `Mon CV est disponible ici : ${personalInfo.resume}`;
        return "Bonjour ! Je suis l'assistant d'Adnane. Posez une question sur ses projets, compétences ou expériences.";
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
