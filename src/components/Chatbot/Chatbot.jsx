import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { personalInfo, skills, projects, experiences, about } from '../../data/portfolioData';
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
        { text: `Bonjour ! 👋 Je suis l'assistant personnel IA d'Adnane. Je suis là pour vous montrer pourquoi il est le profil idéal pour votre prochain projet. Que souhaitez-vous explorer en premier ?`, isBot: true }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendText = (text) => {
        if (!text.trim()) return;

        // User message
        setMessages(prev => [...prev, { text, isBot: false }]);
        setInputText("");

        // Bot response logic
        setTimeout(() => {
            const lowerInput = text.toLowerCase();
            let botReply = `Merci pour votre message ! N'hésitez pas à me contacter directement à l'adresse ${personalInfo.email} pour en discuter d'avantage.`;
            
            if (lowerInput.includes('engager') || lowerInput.includes('pourquoi') || lowerInput.includes('profil')) {
                botReply = `${personalInfo.name} est un développeur très passionné. Doté d'un fort esprit d'initiative, il apprend vite et possède un profil web complet. Ses stages chez Nelogix ou COS ONEE démontrent sa grande capacité d'adaptation et de réalisation !`;
            
            } else if (lowerInput.includes('qualité') || lowerInput.includes('atout') || lowerInput.includes('soft skill')) {
                botReply = `Ses meilleures qualités sont : son apprentissage rapide, sa capacité d'analyse approfondie, son esprit d'initiative et son excellent relationnel en équipe ! Il est particulièrement rigoureux et s'intègre vite.`;

            } else if (lowerInput.includes('projet') || lowerInput.includes('portfolio') || lowerInput.includes('réalisation')) {
                const projectNames = projects.map(p => p.title).join(", ");
                botReply = `Adnane a réalisé plusieurs projets professionnels à forte valeur ajoutée, tels que : ${projectNames}. Vous pouvez découvrir les détails techniques dans la section Projets !`;
            
            } else if (lowerInput.includes('skil') || lowerInput.includes('compétence') || lowerInput.includes('techno') || lowerInput.includes('savoir')) {
                const topSkills = skills.filter(s => s.level >= 80).map(s => s.name).join(", ");
                botReply = `C'est un développeur full-stack. Ses compétences les plus fortes incluent notamment : ${topSkills}. Il maîtrise également bien d'autres technos comme Docker, Java et Python.`;
            
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('mail') || lowerInput.includes('téléphone')) {
                botReply = `Pour le contacter, c'est très simple ! Envoyez-lui un email sur ${personalInfo.email} ou appelez-le au ${personalInfo.phone}. Il est motivé et très réactif !`;
            
            } else if (lowerInput.includes('stage') || lowerInput.includes('emploi') || lowerInput.includes('disponible') || lowerInput.includes('expérience')) {
                const recentJob = experiences.find(e => e.type === "work");
                botReply = `Il a déjà eu l'occasion d'effectuer un stage très formateur de ${recentJob.title} chez ${recentJob.company}. Il est activement à la recherche de nouvelles opportunités pour apporter sa valeur technique !`;
            
            } else if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('hello')) {
                botReply = `Bonjour à vous ! Je suis là pour mettre en avant les atouts d'Adnane. De quoi souhaitez-vous discuter ?`;
            }

            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 800);
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
                                        <div className={styles.messageBubble}>
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
