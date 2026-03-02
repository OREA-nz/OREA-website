export interface DiamondShape {
  name: string;
  description: string;
  technicalNote: string;
  image: string;
}

export interface ComparisonSpec {
  label: string;
  lab: string;
  mined: string;
}

export type DiamondModality = 'Cut' | 'Color' | 'Clarity' | 'Carat';
