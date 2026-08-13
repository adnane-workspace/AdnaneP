import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiChevronLeft, FiChevronRight, FiMapPin, FiX } from 'react-icons/fi';
import { events } from '../../data/portfolioData';
import Section from '../Section/Section';
import styles from './Events.module.css';

const formatEventDate = (value) => {
    if (!value) return '';
    const parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return value;
    const [day, month, year] = parts;
    return new Date(year, month - 1, day).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const EventPost = ({ event, onOpenLightbox }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = event.images || [];
    const isFirstPlace = Boolean(event.result && /1/.test(event.result));

    const showPrevImage = (e) => {
        e.stopPropagation();
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const showNextImage = (e) => {
        e.stopPropagation();
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <article className={styles.post}>
            {images.length > 0 && (
                <div className={styles.media}>
                    <button
                        type="button"
                        className={styles.mediaButton}
                        onClick={() => onOpenLightbox({
                            images,
                            startIndex: imageIndex,
                            title: event.title
                        })}
                    >
                        <img src={images[imageIndex]} alt={event.title} />
                    </button>

                    {event.result && (
                        <p className={`${styles.result} ${isFirstPlace ? styles.resultGold : ''}`}>
                            <span className={styles.resultMedal}>
                                {event.result.match(/\d+/)?.[0] || <FiAward />}
                            </span>
                            <span className={styles.resultLabel}>{event.result}</span>
                        </p>
                    )}

                    {(event.date || event.location) && (
                        <div className={styles.mediaMeta}>
                            {event.date && <span>{formatEventDate(event.date)}</span>}
                            {event.date && event.location && <span className={styles.dotSep}>·</span>}
                            {event.location && (
                                <span className={styles.mediaLocation}>
                                    <FiMapPin />
                                    {event.location}
                                </span>
                            )}
                        </div>
                    )}

                    {images.length > 1 && (
                        <>
                            <span className={styles.counter}>
                                {imageIndex + 1}/{images.length}
                            </span>
                            <button
                                type="button"
                                className={`${styles.imageNav} ${styles.imageNavLeft}`}
                                onClick={showPrevImage}
                                aria-label="Photo précédente"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                type="button"
                                className={`${styles.imageNav} ${styles.imageNavRight}`}
                                onClick={showNextImage}
                                aria-label="Photo suivante"
                            >
                                <FiChevronRight />
                            </button>
                        </>
                    )}
                </div>
            )}

            <div className={styles.body}>
                {event.title && (
                    <h4 className={`${styles.title} ${event.featured ? styles.titleFeatured : ''}`}>
                        {event.title}
                    </h4>
                )}
                {event.description && (
                    <p className={styles.description}>{event.description}</p>
                )}
                {event.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {event.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

const Events = () => {
    const trackRef = useRef(null);
    const lightboxTrackRef = useRef(null);
    const postIndexRef = useRef(0);
    const isPagingRef = useRef(false);
    const [lightbox, setLightbox] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const getPosts = () =>
        trackRef.current
            ? Array.from(trackRef.current.querySelectorAll(`.${styles.postWrap}`))
            : [];

    const updateArrows = (index = postIndexRef.current) => {
        setCanScrollLeft(index > 0);
        setCanScrollRight(index < events.length - 1);
    };

    const syncPostIndex = () => {
        const track = trackRef.current;
        const posts = getPosts();
        if (!track || posts.length === 0) return;
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        const step = posts[0].offsetWidth + gap;
        if (!step) return;
        const index = Math.max(0, Math.min(events.length - 1, Math.round(track.scrollLeft / step)));
        postIndexRef.current = index;
        setActiveIndex(index);
        updateArrows(index);
    };

    const scrollToPost = (index) => {
        const track = trackRef.current;
        const posts = getPosts();
        if (!track || posts.length === 0) return;

        const next = Math.max(0, Math.min(index, posts.length - 1));
        postIndexRef.current = next;
        setActiveIndex(next);
        updateArrows(next);
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        const step = posts[0].offsetWidth + gap;
        track.scrollTo({ left: next * step, behavior: 'smooth' });
    };

    const scrollByCard = (direction) => {
        if (isPagingRef.current) return;
        isPagingRef.current = true;
        scrollToPost(postIndexRef.current + direction);
        window.setTimeout(() => {
            isPagingRef.current = false;
        }, 500);
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onWheel = (e) => {
            const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            if (!horizontal) return;
            e.preventDefault();
            if (Math.abs(e.deltaX) < 8) return;
            scrollByCard(e.deltaX > 0 ? 1 : -1);
        };

        const onKey = (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollByCard(1);
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollByCard(-1);
            }
        };

        updateArrows(0);
        const frame = requestAnimationFrame(syncPostIndex);
        track.addEventListener('scroll', syncPostIndex, { passive: true });
        track.addEventListener('wheel', onWheel, { passive: false });
        track.addEventListener('keydown', onKey);
        window.addEventListener('resize', syncPostIndex);

        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener('scroll', syncPostIndex);
            track.removeEventListener('wheel', onWheel);
            track.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', syncPostIndex);
        };
    }, [lightbox]);

    const openLightbox = ({ images, startIndex, title }) => {
        setLightbox({ images, title });
        setLightboxIndex(startIndex);
    };

    const closeLightbox = () => setLightbox(null);

    const scrollLightbox = (direction) => {
        const track = lightboxTrackRef.current;
        if (!track) return;
        track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
    };

    const updateLightboxIndex = () => {
        const track = lightboxTrackRef.current;
        if (!track || !track.clientWidth) return;
        setLightboxIndex(Math.round(track.scrollLeft / track.clientWidth));
    };

    useEffect(() => {
        if (!lightbox) return;

        const track = lightboxTrackRef.current;
        if (!track) return;

        const onKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') scrollLightbox(1);
            if (e.key === 'ArrowLeft') scrollLightbox(-1);
        };

        const onWheel = (e) => {
            e.preventDefault();
            track.scrollBy({ left: e.deltaY + e.deltaX });
        };

        window.addEventListener('keydown', onKey);
        track.addEventListener('wheel', onWheel, { passive: false });
        track.addEventListener('scroll', updateLightboxIndex, { passive: true });

        requestAnimationFrame(() => {
            track.scrollTo({
                left: lightboxIndex * track.clientWidth,
                behavior: 'instant'
            });
        });

        return () => {
            window.removeEventListener('keydown', onKey);
            track.removeEventListener('wheel', onWheel);
            track.removeEventListener('scroll', updateLightboxIndex);
        };
    }, [lightbox]);

    return (
        <Section id="events" className={styles.section}>
            <h2 className="section-title">Événements</h2>
            <p className={styles.subtitle}>Compétitions, hackathons et rencontres</p>

            <div className={`${styles.carousel} ${canScrollRight ? styles.hasPeek : ''}`}>
                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => scrollByCard(-1)}
                    aria-label="Événement précédent"
                    disabled={!canScrollLeft}
                >
                    <FiChevronLeft />
                </button>

                <div
                    className={styles.track}
                    ref={trackRef}
                    tabIndex={0}
                    aria-label="Carrousel d'événements"
                >
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className={`${styles.postWrap} ${index === activeIndex ? styles.postActive : styles.postPeek}`}
                            onClick={() => {
                                if (index !== activeIndex) scrollToPost(index);
                            }}
                        >
                            <EventPost event={event} onOpenLightbox={openLightbox} />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => scrollByCard(1)}
                    aria-label="Événement suivant"
                    disabled={!canScrollRight}
                >
                    <FiChevronRight />
                </button>
            </div>

            {events.length > 1 && (
                <div className={styles.progress}>
                    <div className={styles.progressDots} role="tablist" aria-label="Navigation des événements">
                        {events.map((event, index) => (
                            <button
                                key={event.id}
                                type="button"
                                role="tab"
                                aria-selected={index === activeIndex}
                                className={`${styles.progressDot} ${index === activeIndex ? styles.progressDotActive : ''}`}
                                onClick={() => scrollToPost(index)}
                                aria-label={event.title}
                            />
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button
                            type="button"
                            className={styles.lightboxClose}
                            onClick={closeLightbox}
                            aria-label="Fermer"
                        >
                            <FiX />
                        </button>

                        {lightbox.images.length > 1 && lightboxIndex > 0 && (
                            <button
                                type="button"
                                className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollLightbox(-1);
                                }}
                                aria-label="Photo précédente"
                            >
                                <FiChevronLeft />
                            </button>
                        )}

                        {lightbox.images.length > 1 && lightboxIndex < lightbox.images.length - 1 && (
                            <button
                                type="button"
                                className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollLightbox(1);
                                }}
                                aria-label="Photo suivante"
                            >
                                <FiChevronRight />
                            </button>
                        )}

                        <div className={styles.lightboxCaption}>
                            <span>{lightbox.title}</span>
                            {lightbox.images.length > 1 && (
                                <span>{lightboxIndex + 1} / {lightbox.images.length}</span>
                            )}
                        </div>

                        <div className={styles.lightboxTrack} ref={lightboxTrackRef}>
                            {lightbox.images.map((src, index) => (
                                <div key={`${src}-${index}`} className={styles.lightboxSlide}>
                                    <img
                                        src={src}
                                        alt={lightbox.title}
                                        className={styles.lightboxImage}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Events;
