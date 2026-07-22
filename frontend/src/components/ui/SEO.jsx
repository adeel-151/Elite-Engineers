import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Elite Engineers - Leading architectural design, structural engineering, and construction management firm. Building tomorrow's landmarks, today.", 
  keywords = "construction, architecture, structural engineering, interior design, renovation, Elite Engineers", 
  type = "website", 
  image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
}) => {
  const siteTitle = title ? `${title} | Elite Engineers` : 'Elite Engineers | Building Tomorrow\'s Landmarks';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Elite Engineers" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
