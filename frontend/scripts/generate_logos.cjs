const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/developers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const logos = {
  'dlf.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" fill="none">
  <!-- DLF 9-segment pyramid logo -->
  <g transform="translate(4, 4)">
    <polygon points="16,0 24,14 8,14" fill="#C62828" />
    <polygon points="7,16 15,30 0,30" fill="#D32F2F" />
    <polygon points="17,16 25,30 9,30" fill="#B71C1C" />
    <polygon points="25,16 33,30 17,30" fill="#D32F2F" />
  </g>
  <text x="44" y="27" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#1E293B" letterSpacing="1">DLF</text>
  <text x="96" y="27" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="9" fill="#C62828" letterSpacing="0.5">LIMITED</text>
</svg>`,

  'm3m.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40" fill="none">
  <rect x="2" y="5" width="46" height="30" rx="6" fill="#D32F2F" />
  <text x="25" y="28" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">M3M</text>
  <text x="56" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" fill="#0F172A">INDIA</text>
  <text x="56" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="7" fill="#64748B" letter-spacing="1.5">EXPERTISE. JOY.</text>
</svg>`,

  'godrej.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="none">
  <text x="4" y="24" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="bold" font-size="24" fill="#BE123C">Godrej</text>
  <text x="82" y="23" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="11" fill="#0F172A" letter-spacing="1">PROPERTIES</text>
  <line x1="82" y1="28" x2="146" y2="28" stroke="#C29B38" stroke-width="1.5" />
</svg>`,

  'elan.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40" fill="none">
  <text x="6" y="27" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#0F172A" letter-spacing="2">ELAN</text>
  <circle cx="82" cy="22" r="4.5" fill="#E11D48" />
  <text x="94" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="10" fill="#64748B" letter-spacing="1">GROUP</text>
</svg>`,

  'conscient.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="none">
  <g transform="translate(6, 6)">
    <circle cx="14" cy="14" r="13" stroke="#C29B38" stroke-width="2.5" fill="none" />
    <path d="M14 6 L14 22 M8 12 L20 12 M9 17 L19 17" stroke="#A88225" stroke-width="2" stroke-linecap="round" />
  </g>
  <text x="42" y="24" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="17" fill="#0F172A" letter-spacing="-0.3">conscient</text>
  <text x="43" y="33" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="6.5" fill="#C29B38" letter-spacing="1">WHERE VALUES MEET</text>
</svg>`,

  'smartworld.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(4, 7)">
    <circle cx="13" cy="13" r="11" stroke="#0284C7" stroke-width="3" fill="none" />
    <circle cx="21" cy="13" r="11" stroke="#38BDF8" stroke-width="3" fill="none" />
    <circle cx="17" cy="13" r="4" fill="#EAB308" />
  </g>
  <text x="44" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="17" fill="#0369A1" letter-spacing="1">SMART</text>
  <text x="108" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="17" fill="#0F172A" letter-spacing="1">WORLD</text>
</svg>`,

  'signature.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="6" fill="#DC2626" />
    <path d="M7 21 C7 11, 14 8, 21 9 C14 12, 13 17, 21 21" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>
  <text x="40" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14" fill="#0F172A" letter-spacing="0.5">SIGNATURE</text>
  <text x="40" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="10" fill="#DC2626" letter-spacing="2">GLOBAL</text>
</svg>`,

  'emaar.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" fill="none">
  <text x="6" y="27" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#0369A1" letter-spacing="3">EMAAR</text>
  <path d="M6 32 C40 28, 70 28, 102 32" stroke="#C29B38" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>`,

  'sobha.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" fill="none">
  <g transform="translate(4, 7)">
    <rect width="26" height="26" rx="4" fill="#78350F" />
    <polygon points="13,4 21,21 5,21" fill="#FDE68A" />
    <circle cx="13" cy="15" r="3" fill="#78350F" />
  </g>
  <text x="38" y="26" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="20" fill="#1E293B" letter-spacing="2">SOBHA</text>
  <text x="110" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="8" fill="#78350F">LTD</text>
</svg>`,

  'tata.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="40" height="28" rx="14" fill="#0284C7" />
    <text x="20" y="20" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">TATA</text>
  </g>
  <text x="52" y="25" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" fill="#0F172A" letter-spacing="0.5">HOUSING</text>
</svg>`,

  'birla.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 40" fill="none">
  <g transform="translate(4, 6)">
    <circle cx="14" cy="14" r="13" fill="#B91C1C" />
    <circle cx="14" cy="14" r="8" fill="#F97316" />
    <text x="14" y="19" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" fill="#FFFFFF" text-anchor="middle">B</text>
  </g>
  <text x="38" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#B91C1C">BIRLA</text>
  <text x="86" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="15" fill="#0F172A">ESTATES</text>
  <text x="39" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#64748B" letter-spacing="1">ADITYA BIRLA GROUP</text>
</svg>`,

  'whiteland.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="5" fill="#0F172A" />
    <path d="M6 8 L11 21 L14 13 L17 21 L22 8" stroke="#E5C058" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
  <text x="38" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="14" fill="#0F172A" letter-spacing="1">WHITELAND</text>
  <text x="39" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="7" fill="#A88225" letter-spacing="1.5">CORPORATION</text>
</svg>`,

  'centralpark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="6" fill="#15803D" />
    <circle cx="14" cy="11" r="7" fill="#86EFAC" />
    <rect x="12.5" y="16" width="3" height="8" fill="#FFFFFF" rx="1" />
  </g>
  <text x="38" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="13" fill="#15803D" letter-spacing="0.5">CENTRAL</text>
  <text x="96" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="13" fill="#0F172A" letter-spacing="0.5">PARK</text>
  <text x="39" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#64748B" letter-spacing="1">LUXURY RESIDENCES</text>
</svg>`,

  'puri.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="5" fill="#4338CA" />
    <text x="14" y="22" font-family="Georgia, serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle">P</text>
  </g>
  <text x="40" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#0F172A" letter-spacing="1">PURI</text>
  <text x="41" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="7" fill="#4338CA" letter-spacing="1.5">CONSTRUCTIONS</text>
</svg>`,

  'adani.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" fill="none">
  <text x="6" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="21" fill="#0369A1" letter-spacing="-0.5">adani</text>
  <text x="68" y="25" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="14" fill="#0F172A">Realty</text>
  <path d="M6 31 C26 31, 46 31, 62 31" stroke="#F97316" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>`,

  'ssgroup.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="5" fill="#831843" />
    <text x="14" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FDE68A" text-anchor="middle">SS</text>
  </g>
  <text x="40" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#0F172A">SS GROUP</text>
  <text x="41" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#831843" letter-spacing="1">BUILT ON VALUES</text>
</svg>`,

  'krisumi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(4, 6)">
    <circle cx="14" cy="14" r="13" fill="#1E1E2F" />
    <circle cx="14" cy="14" r="8" stroke="#E11D48" stroke-width="2.5" fill="none" />
    <circle cx="14" cy="14" r="3.5" fill="#F43F5E" />
  </g>
  <text x="38" y="21" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="14" fill="#0F172A" letter-spacing="1">KRISUMI</text>
  <text x="39" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#E11D48" letter-spacing="1.5">CORPORATION</text>
</svg>`,

  'ganga.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="none">
  <g transform="translate(4, 6)">
    <rect width="28" height="28" rx="5" fill="#047857" />
    <path d="M6 14 Q14 6 22 14" stroke="#FDE68A" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M6 19 Q14 11 22 19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" />
  </g>
  <text x="40" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#047857" letter-spacing="0.5">GANGA</text>
  <text x="96" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="15" fill="#0F172A">REALTY</text>
  <text x="41" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#64748B" letter-spacing="1">PURE LIVING</text>
</svg>`
};

for (const [filename, content] of Object.entries(logos)) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Wrote ${filename}`);
}

console.log('All 18 developer logo SVGs generated successfully!');
