import { useEffect, useRef } from 'react';

function attachCanvas(canvas, paint, { animate = true } = {}) {
  const ctx = canvas.getContext('2d');
  let raf = 0;
  let t = 0;
  let width = 0;
  let height = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldAnimate = animate && !reduce;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.getBoundingClientRect();
    width = box.width;
    height = box.height;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    paint(ctx, width, height, t);
    t += 1;
    if (shouldAnimate) raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  const ro = new ResizeObserver(() => {
    resize();
    if (!shouldAnimate) draw();
  });
  ro.observe(canvas);
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}

export function CatalogSky({ className = 'look-canvas' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const stars = Array.from({ length: 240 }, (_, i) => {
      const u = Math.sin(i * 12.9898) * 43758.5453;
      const v = Math.sin(i * 78.233) * 23421.631;
      return {
        x: u - Math.floor(u),
        y: v - Math.floor(v),
        m: 0.35 + (i % 8) * 0.16,
        tw: i,
      };
    });
    const named = [
      { name: 'Headcount', x: 0.27, y: 0.4 },
      { name: 'Celestia', x: 0.54, y: 0.28 },
      { name: 'Aura', x: 0.74, y: 0.46 },
      { name: 'MockPad', x: 0.45, y: 0.64 },
    ];

    return attachCanvas(canvas, (ctx, width, height, t) => {
      ctx.fillStyle = '#08101c';
      ctx.fillRect(0, 0, width, height);
      stars.forEach((star) => {
        const x = ((star.x + t * 0.00035) % 1) * width;
        const y = star.y * height;
        const a = 0.4 + Math.sin(t * 0.03 + star.tw) * 0.28;
        ctx.fillStyle = `rgba(236, 230, 214, ${Math.max(0.15, a)})`;
        ctx.beginPath();
        ctx.arc(x, y, star.m, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = 'rgba(196, 92, 54, 0.62)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      named.forEach((n, i) => {
        const x = n.x * width;
        const y = n.y * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.font = '11px "IBM Plex Mono", ui-monospace, monospace';
      named.forEach((n) => {
        const x = n.x * width;
        const y = n.y * height;
        ctx.fillStyle = '#f4efe4';
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d46a45';
        ctx.fillText(n.name, x + 8, y - 7);
      });
    });
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}

export function StarGlobe({ className = 'look-canvas', inked = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const count = 520;
    const points = Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
        m: i % 11 === 0 ? 1.6 : 0.7,
      };
    });

    return attachCanvas(canvas, (ctx, width, height, t) => {
      if (inked) {
        ctx.fillStyle = '#07080c';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
      const cx = width * 0.5;
      const cy = height * 0.52;
      const r = Math.min(width, height) * 0.38;
      const rot = t * 0.004;
      ctx.strokeStyle = 'rgba(214, 196, 150, 0.18)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      points.forEach((p) => {
        const x = p.x * Math.cos(rot) - p.z * Math.sin(rot);
        const z = p.x * Math.sin(rot) + p.z * Math.cos(rot);
        if (z < -0.05) return;
        const px = cx + x * r;
        const py = cy + p.y * r;
        const depth = (z + 1) / 2;
        ctx.fillStyle = `rgba(232, 214, 168, ${0.18 + depth * 0.75})`;
        ctx.beginPath();
        ctx.arc(px, py, p.m * (0.6 + depth), 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }, [inked]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
