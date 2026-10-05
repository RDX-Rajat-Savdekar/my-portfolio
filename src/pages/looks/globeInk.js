/** Night globe is cream on black. Paper globe is ink so it reads on #f3efe6. */
export function globeInk(inked) {
  if (inked) {
    return {
      sky: '#07080c',
      ring: 'rgba(214, 196, 150, 0.18)',
      star: (alpha) => `rgba(232, 214, 168, ${alpha})`,
    };
  }
  return {
    sky: null,
    ring: 'rgba(28, 25, 20, 0.72)',
    star: (alpha) => `rgba(28, 25, 20, ${alpha})`,
  };
}
