import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './Chatbot.module.css';

const Chatbot = () => {
    const { t, lang, content, dictionary } = useLanguage();
    const { projects, experiences, about, services } = content;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 0,
            text: t('chatbot.welcome'),
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

    useEffect(() => {
        setMessages((prev) => {
            if (prev.length === 1 && prev[0].id === 0) {
                return [{ ...prev[0], text: dictionary.chatbot.welcome }];
            }
            return prev;
        });
    }, [lang, dictionary]);

    const simpleResponder = async (text) => {
        const normalized = text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

        if (normalized.match(/\b(scanosh|menu digital|qr|service|services)\b/)) {
            const item = services[0];
            return t('chatbot.replies.services', {
                title: item?.title || 'SCANOSH',
                url: item?.url || 'https://scanosh.com'
            });
        }

        if (normalized.match(/\b(projet|projets|portfolio|project|projects)\b/)) {
            const list = [...services, ...projects].map((item) => item.title).join(', ');
            return t('chatbot.replies.projects', { list });
        }

        if (normalized.match(/\b(contact|contacter|email|mail|reach)\b/)) {
            return t('chatbot.replies.contact', { email: personalInfo.email });
        }

        if (normalized.match(/\b(competen|competence|competences|technologie|technologies|skill|skills)\b/)) {
            return t('chatbot.replies.skills');
        }

        if (normalized.match(/\b(cv|resume|curriculum|c v|curriculum vitae)\b/)) {
            return t('chatbot.replies.resume', { url: personalInfo.resume });
        }

        if (normalized.match(/\b(experience|experiences|stage|stages|stagiaire|internship|intern)\b/)) {
            const connector = lang === 'en' ? ' at ' : ' chez ';
            const list = experiences
                .filter((exp) => exp.type === 'work')
                .map((exp) => `${exp.title}${connector}${exp.company}`)
                .join(', ');
            return t('chatbot.replies.experience', { list });
        }

        if (normalized.match(/\b(a propos|apropos|bio|qui es tu|about|who are you|tell me)\b/)) {
            return about.bio;
        }

        if (normalized.match(/\b(qualit|fort|atout|points forts|strength|strengths|hire|engager|why)\b/)) {
            return t('chatbot.replies.qualities');
        }

        if (normalized.match(/\b(formation|etude|etudes|diplome|universite|ofppt|upf|education|degree|university)\b/)) {
            return t('chatbot.replies.education');
        }

        if (normalized.match(/\b(bonjour|salut|hello|hi|coucou|hey)\b/)) {
            return t('chatbot.replies.hello');
        }

        return t('chatbot.replies.fallback');
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
            text: t('chatbot.generating'),
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
                    ? { ...msg, text: t('chatbot.error'), isPlaceholder: false }
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
                                    <h4 className={styles.title}>{t('chatbot.title')}</h4>
                                    <span className={styles.status}>{t('chatbot.status')}</span>
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
                                            <p className={styles.suggestionsTitle}>{t('chatbot.suggestionsTitle')}</p>
                                            <div className={styles.suggestionsGrid}>
                                                {dictionary.chatbot.suggestions.map((question, i) => (
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
                                placeholder={t('chatbot.placeholder')}
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
                aria-label={isOpen ? t('chatbot.close') : t('chatbot.open')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
