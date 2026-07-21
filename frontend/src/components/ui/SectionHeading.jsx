const SectionHeading = ({ subtitle, title, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
