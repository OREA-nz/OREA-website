import React from 'react';
import { LabGrownIntro } from './LabGrownIntro';
import { DiamondComparison } from './DiamondComparison';
import { MasteryOf4Cs } from './MasteryOf4Cs';
import { DiamondShapes } from './DiamondShapes';

const AboutDiamondsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-section-lg pb-section-lg">
      <LabGrownIntro />
      <DiamondComparison />
      
      <MasteryOf4Cs />
      <DiamondShapes />
    </div>
  );
};

export default AboutDiamondsPage;
