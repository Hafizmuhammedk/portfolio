'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Contact.module.css';

export default function ContactAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const recipient = 'hafizmuhammed1019@gmail.com';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    setClosing(false);
    setIsOpen(true);
    setStatus('idle');
  };

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      setStatus('idle');
    }, 240);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !closing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closing, handleClose]);

  const handleTransmit = async (e) => {
    e.preventDefault();
    setStatus('transmitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setTimeout(() => {
        handleClose();
        setEmail('');
        setSubject('');
        setMessage('');
      }, 3200);
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const handleCopyDirect = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(recipient).catch(() => {});
    }
    setStatus('copied');
    setTimeout(() => {
      setStatus('idle');
    }, 2500);
  };

  const overlayClass = `${styles.modalOverlay}${closing ? ` ${styles.modalClosing}` : ''}`;

  const modalElement = (
    <div className={overlayClass} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modalBackdrop} onClick={closing ? undefined : handleClose} />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleBlock}>
            <span className={styles.modalTag}>SYSTEM :: MAIL TRANSMISSION</span>
            <h3 id="modal-title" className={styles.modalTitle}>
              INITIATE MAIL PROTOCOL
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeBtn}
            aria-label="Close modal"
            disabled={closing}
          >
            [ ESC / CLOSE ]
          </button>
        </div>

        <div className={styles.recipientBar}>
          <span className={styles.recipientLabel}>RECIPIENT:</span>
          <span className={styles.recipientValue}>{recipient}</span>
        </div>

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successBadge}>[ TRANSMISSION COMPLETE ]</div>
            <p className={styles.successText}>
              Your message has been delivered successfully.
              <br />
              Expect a response within 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleTransmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="sender-email" className={styles.fieldLabel}>
                YOUR EMAIL
              </label>
              <input
                id="sender-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="mail-subject" className={styles.fieldLabel}>
                SUBJECT / PURPOSE
              </label>
              <input
                id="mail-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. AI Architecture Inquiry / Project Collaboration"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="mail-message" className={styles.fieldLabel}>
                TRANSMISSION MESSAGE
              </label>
              <textarea
                id="mail-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, timeline, or scope details..."
                className={styles.fieldTextarea}
              />
            </div>

            {status === 'error' && (
              <div className={styles.errorBar} role="alert">
                <span className={styles.errorDot} />
                {errorMsg}
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'transmitting'}
              >
                {status === 'transmitting' ? 'TRANSMITTING...' : 'TRANSMIT MAIL'}
              </button>
              <button
                type="button"
                onClick={handleCopyDirect}
                className={styles.secondaryBtn}
              >
                {status === 'copied' ? '[ EMAIL COPIED ]' : 'COPY DIRECT EMAIL'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.ctaWrapper} data-contact-action>
      <button
        type="button"
        onClick={handleOpen}
        className={styles.cta}
        aria-label="Initiate mail transmission protocol"
      >
        <span>CONNECT</span>
      </button>

      {isOpen && mounted && createPortal(modalElement, document.body)}
    </div>
  );
}

