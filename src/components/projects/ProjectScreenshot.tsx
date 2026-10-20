import type { Project } from '../../data';
import '../../styles/project-screenshots.css';

/**
 * Project cards use tailored thumbnail crops so every screenshot sits nicely
 * inside the shared portfolio card size. Modal previews still show the full
 * original screenshot without cropping.
 */
type ScreenshotVariant = 'card' | 'modal';

export default function ProjectScreenshot({
  project,
  variant = 'card',
}: {
  project: Project;
  variant?: ScreenshotVariant;
}) {
  if (!project.image) return null;

  const url = /^https?:\/\//i.test(project.image)
    ? project.image
    : `${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, '')}`;

  return (
    <div
      className={`project-screenshot project-screenshot--${variant}`}
      data-project={project.id}
    >
      {variant === 'card' && ['automatic-plant-watering', 'wallpaper-download-gallery', 'e-passport-sri-lanka', 'employee-management-system'].includes(project.id) && (
        <span
          className="project-screenshot-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: `url(${JSON.stringify(url)})` }}
        />
      )}
      <img
        className="project-screenshot-image"
        src={url}
        alt={`${project.name} project screenshot`}
        loading={variant === 'card' ? 'lazy' : 'eager'}
        decoding="async"
      />
      {variant === 'card' && <span className="project-screenshot-glow" aria-hidden="true" />}
    </div>
  );
}
