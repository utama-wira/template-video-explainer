// Generator SVG tokoh Weyeni dan teman-teman (port dari komponen kanvas).
(function () {
  const LOOKS = {
    weyeni: { skin: '#C2805A', shade: '#A86A47', top: '#D9483B', shirt: '#FFF6EC', seam: '#B8382D', bottom: '#2E3A5C' },
    nur: { skin: '#C98B62', shade: '#AD7350', top: '#E9A23B', shirt: '#FFF6EC', seam: '#C9862A', bottom: '#2E3A5C' },
    yohana: { skin: '#7A4A30', shade: '#643B25', top: '#4A6FA5', shirt: '#FFF6EC', seam: '#3A5A88', bottom: '#2E3A5C' },
    togar: { skin: '#B07650', shade: '#94603F', top: '#A9C2DA', shirt: '#FFFFFF', seam: '#86A3BF', bottom: '#4A3F35' },
    lina: { skin: '#E2B48C', shade: '#C99A72', top: '#7B5EA7', shirt: '#FFF6EC', seam: '#634A8A', bottom: '#2E3A5C' }
  };
  const BROWS = {
    normal: ['M112 126 Q124 120 136 126', 'M164 126 Q176 120 188 126'],
    kaget: ['M112 114 Q124 106 136 112', 'M164 112 Q176 106 188 114'],
    berpikir: ['M112 128 Q124 126 136 128', 'M164 118 Q176 110 188 118']
  };
  const MOUTHS = {
    senyum: { d: 'M132 178 Q150 194 168 178', fill: 'none' },
    bicara: { d: 'M134 177 Q150 202 166 177 Z', fill: '#7A2E2E' },
    kaget: { d: 'M141 188 a9 11 0 1 0 18 0 a9 11 0 1 0 -18 0 Z', fill: '#7A2E2E' },
    berpikir: { d: 'M138 184 Q146 178 152 183 Q158 188 164 182', fill: 'none' }
  };
  const RIGHTS = {
    santai: { d: 'M202 242 Q218 278 220 310', x: 220, y: 318 },
    'pegang-hp': { d: 'M202 246 Q228 280 206 296', x: 200, y: 298 },
    kaget: { d: 'M202 242 Q228 222 228 198', x: 228, y: 190 },
    berpikir: { d: 'M202 246 Q222 222 186 210', x: 180, y: 208 },
    menunjuk: { d: 'M202 244 Q236 224 254 194', x: 258, y: 188 }
  };
  const L_DOWN = { d: 'M98 242 Q82 278 80 310', x: 80, y: 318 };
  const L_UP = { d: 'M98 242 Q72 222 72 198', x: 72, y: 190 };

  window.weyeniSVG = function (o) {
    const t = o.tokoh || 'weyeni', e = o.ekspresi || 'senyum', p = o.pose || 'santai';
    const k = LOOKS[t];
    const mouthKey = o.mulut || e;
    const b = e === 'kaget' ? BROWS.kaget : (e === 'berpikir' ? BROWS.berpikir : BROWS.normal);
    const m = MOUTHS[mouthKey] || MOUTHS.senyum;
    const r = RIGHTS[p] || RIGHTS.santai;
    const l = p === 'kaget' ? L_UP : L_DOWN;
    const eyeY = e === 'berpikir' ? 145 : 148;
    const eyeRy = o.kedip ? 1.6 : (e === 'kaget' ? 13 : 11);
    const show = (c) => (c ? '' : 'display:none');
    const blushL = t === 'nur' ? 116 : 106, blushR = t === 'nur' ? 184 : 194;
    return `<svg viewBox="0 0 300 420" width="100%" height="100%" aria-hidden="true">
<g style="${show(t !== 'nur')}"><rect x="102" y="324" width="42" height="64" rx="12" fill="${k.bottom}"/><rect x="156" y="324" width="42" height="64" rx="12" fill="${k.bottom}"/></g>
<path style="${show(t === 'nur')}" d="M100 326 L200 326 L214 386 Q214 392 208 392 L92 392 Q86 392 86 386 Z" fill="${k.bottom}"/>
<ellipse cx="120" cy="392" rx="28" ry="12" fill="#1F2433"/><ellipse cx="180" cy="392" rx="28" ry="12" fill="#1F2433"/>
<path d="M86 304 C86 252 108 222 150 222 C192 222 214 252 214 304 L214 334 Q214 340 208 340 L92 340 Q86 340 86 334 Z" fill="${k.top}"/>
<path d="M130 224 L150 266 L170 224 Z" fill="${k.shirt}"/>
<path d="M150 266 L150 338" fill="none" stroke="${k.seam}" stroke-width="3" stroke-linecap="round"/>
<g style="${show(t === 'weyeni')}"><circle cx="188" cy="282" r="13" fill="#F4B740"/><text x="188" y="288" text-anchor="middle" style="font: 800 16px 'Baloo 2'; fill:#1F2433">W</text></g>
<path d="${l.d}" fill="none" stroke="${k.top}" stroke-width="26" stroke-linecap="round"/>
<path d="${r.d}" fill="none" stroke="${k.top}" stroke-width="26" stroke-linecap="round"/>
<path style="${show(t === 'lina')}" d="M74 150 C74 82 110 58 150 58 C190 58 226 82 226 150 L226 196 Q226 206 216 206 L84 206 Q74 206 74 196 Z" fill="#1B1717"/>
<rect x="138" y="200" width="24" height="26" rx="6" fill="${k.shade}"/>
<g style="${show(t !== 'nur')}"><circle cx="80" cy="150" r="14" fill="${k.skin}"/><circle cx="220" cy="150" r="14" fill="${k.skin}"/></g>
<circle cx="150" cy="140" r="72" fill="${k.skin}"/>
<g style="${show(t === 'weyeni')}" fill="#241F1E"><path d="M78 134 C78 80 112 58 150 58 C196 58 224 86 224 130 C214 114 198 104 178 102 C186 112 186 120 182 126 C168 110 140 102 112 106 C98 110 86 120 78 134 Z"/><path d="M148 62 C156 42 174 36 188 42 C176 46 166 54 162 64 Z"/></g>
<ellipse cx="${blushL}" cy="172" rx="11" ry="6" fill="#E07B63" opacity=".5"/><ellipse cx="${blushR}" cy="172" rx="11" ry="6" fill="#E07B63" opacity=".5"/>
<path d="${b[0]}" fill="none" stroke="#241F1E" stroke-width="5" stroke-linecap="round"/><path d="${b[1]}" fill="none" stroke="#241F1E" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="124" cy="${eyeY}" rx="8" ry="${eyeRy}" fill="#1F2433"/><ellipse cx="176" cy="${eyeY}" rx="8" ry="${eyeRy}" fill="#1F2433"/>
<g style="${show(!o.kedip)}"><circle cx="127" cy="${eyeY - 4}" r="3" fill="#fff"/><circle cx="179" cy="${eyeY - 4}" r="3" fill="#fff"/></g>
<path d="${m.d}" fill="${m.fill}" stroke="#1F2433" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<g style="${show(p === 'pegang-hp')}"><rect x="184" y="250" width="32" height="50" rx="6" fill="#1F2433"/><rect x="188" y="255" width="24" height="38" rx="3" fill="#F4B740"/></g>
<path style="${show(p === 'menunjuk')}" d="M262 180 L272 164" fill="none" stroke="${k.skin}" stroke-width="9" stroke-linecap="round"/>
<circle cx="${l.x}" cy="${l.y}" r="13" fill="${k.skin}"/><circle cx="${r.x}" cy="${r.y}" r="13" fill="${k.skin}"/>
</svg>`;
  };
})();
