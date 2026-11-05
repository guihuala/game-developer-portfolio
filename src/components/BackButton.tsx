import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const BackButton = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  if (pathname === '/') return null;
  return <Link className="level-back" to={pathname.startsWith('/project/') ? '/works' : '/'}>
    <ArrowLeft size={18} aria-hidden="true" />
    <span>{t('返回上一级', 'Back to parent')}</span>
  </Link>;
};
