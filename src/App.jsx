import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import styles from './App.module.css';

function App() {
    return (
        <ThemeProvider>
            <div className={styles.app}>
                <Navbar />

                <main className={styles.main}>
                    <Hero />
                    <Projects />
                    <Skills />
                    <Experience />
                    <Contact />
                </main>

                <Footer />
                <Chatbot />
            </div>
        </ThemeProvider>
    );
}

export default App;
