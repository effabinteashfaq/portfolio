// SVG optimiser settings for src/scenes (run: npm run optimise-svg).
// IDs are kept because other parts of the page point at them (e.g. the
// Corridor frames use the wall's "mir" gradient), and viewBox is kept so
// the drawings still scale.
export default {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          removeViewBox: false,
          removeUnknownsAndDefaults: { keepRoleAttr: true, keepAriaAttrs: true },
        },
      },
    },
    'removeXMLNS',
  ],
};
