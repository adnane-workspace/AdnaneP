import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Events from './components/Events/Events';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
// SupabaseTest removed
import Chatbot from './components/Chatbot/Chatbot';
import styles from './App.module.css';

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
            <div className={styles.app}>
                <Navbar />

                <main className={styles.main}>
                    <Hero />
                    <Events />
                    <Projects />
                    <Skills />
                    <Experience />
                    <Contact />
                    {/* SupabaseTest removed */}
                </main>

                <Footer />
                <Chatbot />
            </div>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
