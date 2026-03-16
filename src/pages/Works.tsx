import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { NextModuleLink } from '../components/NextModuleLink';

export const Works: React.FC = () => {
  return (
    <div className="pt-20">
      <Portfolio />
      <NextModuleLink to="/about" zhText="关于我" enText="About Me" />
    </div>
  );
};
