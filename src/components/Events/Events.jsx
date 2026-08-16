import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiChevronLeft, FiChevronRight, FiMapPin, FiX } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import Section from '../Section/Section';
import styles from './Events.module.css';

const formatEventDate = (value, locale = 'fr-FR') => {
    if (!value) return '';
    const parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return value;
    const [day, month, year] = parts;
    return new Date(year, month - 1, day).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const EventPost = ({ event, active, onOpenLightbox }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const { t, dateLocale } = useLanguage();
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
                        onClick={() => {
                            if (!active) return;
                            onOpenLightbox({
                                images,
                                startIndex: imageIndex,
                                title: event.title
                            });
                        }}
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
                            {event.date && <span>{formatEventDate(event.date, dateLocale)}</span>}
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
                                aria-label={t('events.prevPhoto')}
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                type="button"
                                className={`${styles.imageNav} ${styles.imageNavRight}`}
                                onClick={showNextImage}
                                aria-label={t('events.nextPhoto')}
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
    const draggedRef = useRef(false);
    const { t, content } = useLanguage();
    const events = content.events;
    const [lightbox, setLightbox] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const getPosts = () =>
        trackRef.current
            ? Array.from(trackRef.current.querySelectorAll(`.${styles.postWrap}`))
            : [];

    const maxScrollLeft = () => {
        const track = trackRef.current;
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - track.clientWidth);
    };

    const targetLeftForIndex = (index) => {
        const track = trackRef.current;
        const posts = getPosts();
        if (!track || !posts[index]) return 0;
        const left = posts[index].offsetLeft - posts[0].offsetLeft;
        return Math.min(left, maxScrollLeft());
    };

    const syncFromScroll = () => {
        const track = trackRef.current;
        const posts = getPosts();
        if (!track || posts.length === 0) return;

        const trackLeft = track.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;

        posts.forEach((el, i) => {
            const distPx = el.getBoundingClientRect().left - trackLeft;
            const dist = Math.abs(distPx);
            const width = el.offsetWidth || 1;
            el.style.setProperty('--peek', String(Math.min(1, dist / width)));
            if (dist < bestDist) {
                bestDist = dist;
                best = i;
            }
        });

        const atEnd = track.scrollLeft >= maxScrollLeft() - 12;
        const index = atEnd ? posts.length - 1 : best;
        if (atEnd) {
            posts.forEach((el, i) => {
                el.style.setProperty('--peek', i === index ? '0' : '1');
            });
        }

        if (index !== postIndexRef.current) {
            postIndexRef.current = index;
            setActiveIndex(index);
        }
        const left = track.scrollLeft > 8;
        const right = track.scrollLeft < maxScrollLeft() - 8;
        setCanScrollLeft((prev) => (prev === left ? prev : left));
        setCanScrollRight((prev) => (prev === right ? prev : right));
    };

    const scrollToPost = (index) => {
        const track = trackRef.current;
        const posts = getPosts();
        if (!track || posts.length === 0) return;

        const next = Math.max(0, Math.min(index, posts.length - 1));
        postIndexRef.current = next;
        setActiveIndex(next);
        track.scrollTo({ left: targetLeftForIndex(next), behavior: 'smooth' });
    };

    const scrollByCard = (direction) => {
        scrollToPost(postIndexRef.current + direction);
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const drag = {
            active: false,
            pointerId: null,
            startX: 0,
            startScroll: 0
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

        const onPointerDown = (e) => {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            if (e.target.closest(`.${styles.imageNav}`)) return;
            drag.active = true;
            drag.pointerId = e.pointerId;
            drag.startX = e.clientX;
            drag.startScroll = track.scrollLeft;
            draggedRef.current = false;
        };

        const onPointerMove = (e) => {
            if (!drag.active || e.pointerId !== drag.pointerId) return;
            const dx = e.clientX - drag.startX;
            if (Math.abs(dx) < 6) return;
            draggedRef.current = true;
            track.classList.add(styles.isDragging);
            track.scrollLeft = drag.startScroll - dx;
        };

        const onPointerUp = (e) => {
            if (!drag.active || e.pointerId !== drag.pointerId) return;
            drag.active = false;
            track.classList.remove(styles.isDragging);
            if (draggedRef.current) {
                const posts = getPosts();
                const trackLeft = track.getBoundingClientRect().left;
                let nearest = 0;
                let bestDist = Infinity;
                posts.forEach((el, i) => {
                    const dist = Math.abs(el.getBoundingClientRect().left - trackLeft);
                    if (dist < bestDist) {
                        bestDist = dist;
                        nearest = i;
                    }
                });
                if (track.scrollLeft >= maxScrollLeft() - 12) {
                    nearest = posts.length - 1;
                }
                scrollToPost(nearest);
            }
        };

        const onClickCapture = (e) => {
            if (!draggedRef.current) return;
            e.preventDefault();
            e.stopPropagation();
            draggedRef.current = false;
        };

        const frame = requestAnimationFrame(syncFromScroll);
        track.addEventListener('scroll', syncFromScroll, { passive: true });
        track.addEventListener('keydown', onKey);
        track.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        track.addEventListener('click', onClickCapture, true);
        window.addEventListener('resize', syncFromScroll);

        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener('scroll', syncFromScroll);
            track.removeEventListener('keydown', onKey);
            track.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            track.removeEventListener('click', onClickCapture, true);
            window.removeEventListener('resize', syncFromScroll);
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
            <h2 className="section-title">{t('events.title')}</h2>
            <p className={styles.subtitle}>{t('events.subtitle')}</p>

            <div className={`${styles.carousel} ${canScrollRight ? styles.hasPeek : ''}`}>
                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => scrollByCard(-1)}
                    aria-label={t('events.prev')}
                    disabled={!canScrollLeft}
                >
                    <FiChevronLeft />
                </button>

                <div
                    className={styles.track}
                    ref={trackRef}
                    tabIndex={0}
                    aria-label={t('events.carousel')}
                >
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className={`${styles.postWrap} ${index === activeIndex ? styles.postActive : styles.postPeek}`}
                            onClick={() => {
                                if (index !== activeIndex) scrollToPost(index);
                            }}
                        >
                            <EventPost
                                event={event}
                                active={index === activeIndex}
                                onOpenLightbox={openLightbox}
                            />
                        </div>
                    ))}
                    <div className={styles.trackSpacer} aria-hidden="true" />
                </div>

                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => scrollByCard(1)}
                    aria-label={t('events.next')}
                    disabled={!canScrollRight}
                >
                    <FiChevronRight />
                </button>
            </div>

            {events.length > 1 && (
                <div className={styles.progress}>
                    <div className={styles.progressDots} role="tablist" aria-label={t('events.nav')}>
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
                            aria-label={t('events.close')}
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
                                aria-label={t('events.prevPhoto')}
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
                                aria-label={t('events.nextPhoto')}
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
