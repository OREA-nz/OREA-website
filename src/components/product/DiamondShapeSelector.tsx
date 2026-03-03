import React from 'react';

const DIAMOND_SHAPES = [
  'Round', 'Oval', 'Pear', 'Marquise', 'Princess',
  'Emerald', 'Radiant', 'Asscher', 'Cushion', 'Heart'
] as const;

export type DiamondShape = typeof DIAMOND_SHAPES[number];

const BASE_URL = 'https://unbridaled-prod.s3.amazonaws.com/das/static/images/shape_icons';

const SHAPE_SVG_MAP: Record<string, string> = {
  Round: `${BASE_URL}/shape-round.svg`,
  Oval: `${BASE_URL}/shape-oval.svg`,
  Pear: `${BASE_URL}/shape-pear.svg`,
  Marquise: `${BASE_URL}/shape-marquise.svg`,
  Princess: `${BASE_URL}/shape-princess.svg`,
  Emerald: `${BASE_URL}/shape-emerald.svg`,
  Radiant: `${BASE_URL}/shape-radiant.svg`,
  Asscher: `${BASE_URL}/shape-asscher.svg`,
  Cushion: `${BASE_URL}/shape-cushion.svg`,
  Heart: `${BASE_URL}/shape-heart.svg`,
};

const ShapeIcon: React.FC<{ shape: string; className?: string }> = ({ shape }) => {
  const src = SHAPE_SVG_MAP[shape];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={shape}
      style={{
        width: 30,
        height: 30,
        display: 'block',
        objectFit: 'contain',
        padding: 0,
      }}
    />
  );
};

interface DiamondShapeSelectorProps {
  shapes?: string[];
  selectedShape: string;
  onShapeChange: (shape: string) => void;
}

const DiamondShapeSelector: React.FC<DiamondShapeSelectorProps> = ({
  shapes = DIAMOND_SHAPES as unknown as string[],
  selectedShape,
  onShapeChange
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2">
        <label className="text-micro font-bold uppercase tracking-widest text-orea-dark">
          {'Shape:'}
        </label>
        <span className="text-body-sm font-light text-orea-taupe tracking-wide">
          {selectedShape}
        </span>
      </div>
      <div className="w-full flex flex-row flex-nowrap items-stretch">
        {shapes.map((shape) => {
          const isActive = selectedShape === shape;
          return (
            <button
              key={shape}
              onClick={() => onShapeChange(shape)}
              className="relative flex flex-1 flex-col items-center justify-center group transition-all duration-300 focus:outline-none h-12"
              aria-label={`Select ${shape} shape`}
              aria-pressed={isActive}
            >
              <div
                className={`flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? 'opacity-100 scale-110'
                    : 'opacity-30 group-hover:opacity-70'
                }`}
                style={{ mixBlendMode: 'multiply', width: 30, height: 30 }}
              >
                <ShapeIcon shape={shape} />
              </div>
              {isActive && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-orea-dark animate-in slide-in-from-bottom-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { ShapeIcon, DIAMOND_SHAPES };
export default DiamondShapeSelector;
