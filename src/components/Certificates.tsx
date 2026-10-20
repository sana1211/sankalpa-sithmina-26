import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  ArrowUpRight,
  BadgeCheck,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  ImageOff,
  X,
} from 'lucide-react';
import { certificates, type CertificateEntry } from '../data';
import '../styles/certificates-gallery-images.css';

const filters = ['All', 'Diploma', 'Training', 'Course', 'Award'] as const;
type Filter = (typeof filters)[number];

// If a file is not configured in data.ts, match the four uploaded certificates.
function certificateFile(item: CertificateEntry): string | undefined {
  if (item.file?.trim()) return item.file.trim();

  const title = item.title.toLowerCase();
  if (/ticketing|reservations/.test(title)) return 'certificates/iaac.jpg';
  if (/computer competency|computer competenc|computer licen[cs]e/.test(title)) {
    return 'certificates/computer.jpg';
  }
  if (title.includes('web design')) return 'certificates/web.jpg';
  if (title.includes('python')) return 'certificates/python.jpg';
  return undefined;
}

// Vite's BASE_URL keeps images working on GitHub Pages repository sub-paths.
function certificateUrl(file: string): string {
  if (/^(https?:)?\/\//i.test(file) || /^(data|blob):/i.test(file)) return file;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}${file.replace(/^\/+/, '')}`;
}

function isImage(file: string): boolean {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(file.split(/[?#]/)[0]);
}

function isPdf(file: string): boolean {
  return /\.pdf$/i.test(file.split(/[?#]/)[0]);
}

function CertificateImage({ src, alt, inModal = false }: {
  src: string;
  alt: string;
  inModal?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div className="certificate-image-error">
        <ImageOff size={32} strokeWidth={1.4} />
        <span>Certificate image could not be loaded</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={inModal ? 'certificate-modal-image' : 'certificate-art-image'}
      loading={inModal ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function CertificateModal({ certificate, onClose }: {
  certificate: CertificateEntry;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const file = certificateFile(certificate);
  const url = file ? certificateUrl(file) : '';

  return (
    <motion.div
      className="certificate-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="certificate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-heading"
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="certificate-modal-top">
          <span><BadgeCheck size={17} /> CERTIFICATE DETAILS</span>
          <button type="button" aria-label="Close certificate details" onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        <div className="certificate-modal-document">
          {file && url && isImage(file) ? (
            <CertificateImage src={url} alt={`${certificate.title} certificate`} inModal />
          ) : file && url && isPdf(file) ? (
            <iframe src={`${url}#toolbar=0`} title={`${certificate.title} preview`} />
          ) : (
            <div className="certificate-modal-empty">
              <FileText size={54} strokeWidth={1.2} />
              <strong>DOCUMENT NOT UPLOADED</strong>
              <p>Add a certificate file to public/certificates to enable the preview.</p>
            </div>
          )}
        </div>

        <div className="certificate-modal-info">
          <span className="certificate-type">{certificate.type.toUpperCase()} / LEARNING RECORD</span>
          <h3 id="certificate-modal-heading">{certificate.title}</h3>
          <p>{certificate.description}</p>
          {certificate.institution && (
            <span className="certificate-institution">{certificate.institution}</span>
          )}
          <div className="certificate-modal-actions">
            {url ? (
              <>
                <a href={url} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} /> OPEN DOCUMENT
                </a>
                <a href={url} download>
                  <Download size={16} /> DOWNLOAD
                </a>
              </>
            ) : (
              <span className="certificate-awaiting">PDF / IMAGE TO BE ADDED</span>
            )}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default function Certificates() {
  const [active, setActive] = useState<Filter>('All');
  const [selected, setSelected] = useState<CertificateEntry | null>(null);

  const visible = active === 'All'
    ? certificates
    : certificates.filter((item) => item.type === active);
  const availableFilters = filters.filter(
    (filter) => filter === 'All' || certificates.some((item) => item.type === filter)
  );

  return (
    <>
      <section id="certificates" className="certificate-section section-pad section-anchor">
        <div className="certificate-ambient" aria-hidden="true" />
        <div className="wrap certificate-shell">
          <motion.div
            className="certificate-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-65px' }}
            transition={{ duration: 0.65 }}
          >
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> 05 / LEARNING & ACHIEVEMENTS
              </div>
              <h2>MY <em>CERTIFICATES.</em></h2>
            </div>
          </motion.div>

          <div className="certificate-toolbar">
            <div className="certificate-filter-tabs" role="group" aria-label="Filter certificates">
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active === filter}
                  className={active === filter ? 'active' : ''}
                  onClick={() => setActive(filter)}
                >
                  {filter === 'All' ? 'ALL RECORDS' : filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="certificate-gallery">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((certificate, index) => {
                const file = certificateFile(certificate);
                const url = file ? certificateUrl(file) : '';
                const imageUrl = file && isImage(file) ? url : '';

                return (
                  <motion.article
                    className="certificate-tile"
                    key={certificate.id}
                    layout
                    initial={{ opacity: 0, y: 22, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.38, delay: index * 0.05 }}
                  >
                    <div className="certificate-art certificate-art--document">
                      <div className={`certificate-preview-stage${imageUrl ? '' : ' certificate-preview-stage--empty'}`}>
                        {imageUrl ? (
                          <CertificateImage
                            src={imageUrl}
                            alt={`${certificate.title} certificate`}
                          />
                        ) : (
                          <div className="certificate-art-fallback" aria-hidden="true">
                            {certificate.type === 'Diploma' ? (
                              <GraduationCap size={65} strokeWidth={1.1} />
                            ) : (
                              <Award size={65} strokeWidth={1.1} />
                            )}
                          </div>
                        )}
                      </div>
                      {/* Labels sit BELOW the document so they never cover certificate text. */}
                      <div className="certificate-art-meta">
                        <span className="certificate-art-index">/ {String(index + 1).padStart(2, '0')}</span>
                        <span className="certificate-art-corner">LEARNING ARCHIVE ↗</span>
                      </div>
                    </div>

                    <div className="certificate-tile-body">
                      <div className="certificate-tile-kicker">
                        <span>{certificate.type.toUpperCase()}</span>
                        <span className={file ? 'has-document' : ''}>
                          {file ? 'DOCUMENT AVAILABLE' : 'AWAITING DOCUMENT'}
                        </span>
                      </div>
                      <h3>{certificate.title}</h3>
                      <p>{certificate.description}</p>
                      {certificate.institution && (
                        <span className="certificate-tile-institution">{certificate.institution}</span>
                      )}
                      <div className="certificate-tile-foot">
                        <button type="button" onClick={() => setSelected(certificate)}>
                          VIEW DETAILS <ArrowUpRight size={17} />
                        </button>
                        {file && (
                          <a
                            href={url}
                            download
                            aria-label={`Download ${certificate.title}`}
                            title="Download certificate"
                          >
                            <Download size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="certificate-bottom-note" aria-hidden="true" />
        </div>
      </section>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selected && (
            <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
