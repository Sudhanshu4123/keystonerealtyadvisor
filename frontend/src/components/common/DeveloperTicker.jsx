import React from 'react';
import { Link } from 'react-router-dom';

// Official Developer Brand Logo Badge Component
const DeveloperLogo = ({ name, id }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        padding: '2px 8px',
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }}
    >
      <img
        src={`/developers/${id}.svg`}
        alt={`${name} Official Logo`}
        width="80"
        height="22"
        loading="lazy"
        style={{
          height: '22px',
          width: 'auto',
          maxWidth: '100px',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

const DEVELOPERS = [
  { id: 'dlf', name: 'DLF Limited' },
  { id: 'm3m', name: 'M3M India' },
  { id: 'godrej', name: 'Godrej Properties' },
  { id: 'elan', name: 'Elan Group' },
  { id: 'conscient', name: 'Conscient Infrastructure' },
  { id: 'smartworld', name: 'Smart World Developers' },
  { id: 'signature', name: 'Signature Global' },
  { id: 'emaar', name: 'Emaar India' },
  { id: 'sobha', name: 'Sobha Limited' },
  { id: 'tata', name: 'Tata Housing' },
];

export default function DeveloperTicker() {
  return (
    <section 
      aria-label="Top Developer Projects Portfolio" 
      className="dev-ticker-wrapper"
    >
      {/* Scrolling Track Container */}
      <div className="dev-ticker-track-container">
        <div className="dev-ticker-track">
          {/* First loop of items */}
          {DEVELOPERS.map((dev, index) => (
            <Link
              key={`dev-1-${index}`}
              to={`/projects?search=${encodeURIComponent(dev.name)}`}
              className="dev-ticker-item"
              title={`Explore ${dev.name} Projects`}
            >
              <DeveloperLogo id={dev.id} name={dev.name} />
              <span>{dev.name}</span>
              <span className="dev-dot" />
            </Link>
          ))}

          {/* Duplicate loop for seamless infinite loop */}
          {DEVELOPERS.map((dev, index) => (
            <Link
              key={`dev-2-${index}`}
              to={`/projects?search=${encodeURIComponent(dev.name)}`}
              className="dev-ticker-item"
              title={`Explore ${dev.name} Projects`}
            >
              <DeveloperLogo id={dev.id} name={dev.name} />
              <span>{dev.name}</span>
              <span className="dev-dot" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

