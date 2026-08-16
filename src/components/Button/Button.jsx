import React from 'react';
import styles from './Button.module.css';

/**
 * Composant Button réutilisable
 * @param {string} variant - Style du bouton: 'primary', 'secondary', 'outline'
 * @param {string} size - Taille: 'small', 'medium', 'large'
 * @param {function} onClick - Fonction appelée au clic
 * @param {ReactNode} children - Contenu du bouton
 * @param {string} href - Lien (transforme le bouton en lien)
 * @param {boolean} disabled - Désactiver le bouton
 */
const Button = ({
    variant = 'primary',
    size = 'medium',
    onClick,
    children,
    href,
    disabled = false,
    className = '',
    download,
    ...props
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    if (href) {
        const isExternal = href.startsWith('http');
        const isFile = /\.(pdf|doc|docx)$/i.test(href);
        return (
            <a
                href={href}
                className={buttonClass}
                target={isExternal || isFile ? '_blank' : '_self'}
                rel={isExternal || isFile ? 'noopener noreferrer' : undefined}
                download={isFile ? (download || true) : undefined}
                {...props}
            >
                {children}
            </a>
        );
    }

    // Sinon, retourner un bouton
    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
