module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: [
        "module:metro-react-native-babel-preset",
        "nativewind/babel"
      ]
    }
  },
};