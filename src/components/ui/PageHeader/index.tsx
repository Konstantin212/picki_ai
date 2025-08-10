import { Typography } from '../Typography';

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const PageHeader = ({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}: PageHeaderProps) => {
  return (
    <div className={`mb-6 text-center ${className}`}>
      <Typography variant="h1" className={`mb-4 ${titleClassName}`}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          color="secondary"
          className={`mx-auto max-w-2xl ${descriptionClassName}`}
        >
          {description}
        </Typography>
      )}
    </div>
  );
};
