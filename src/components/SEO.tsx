import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
}) => {
  const { language } = useLanguage();
  const siteTitle = 'Mokukeki Portfolio | 桂花拉糕的游戏开发集';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDesc = 'Full-stack Game Developer Portfolio. Showcasing Unity projects, independent games, and technical art.';
  const fullDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* HTML Language tag */}
      <html lang={language} />
      
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
