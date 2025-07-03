module.exports = ({ config }) => ({
  ...config,
  output: {
    ...config.output,
    library: 'grapesjs-dinvitations',
  },
});