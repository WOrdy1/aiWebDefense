const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const srcPath = path.resolve(projectRoot, 'src');

const config = {
  resolver: {
    extraNodeModules: {
      '@': srcPath,
      '@api': path.resolve(srcPath, 'api'),
      '@components': path.resolve(srcPath, 'components'),
      '@hooks': path.resolve(srcPath, 'hooks'),
      '@navigation': path.resolve(srcPath, 'navigation'),
      '@screens': path.resolve(srcPath, 'screens'),
      '@store': path.resolve(srcPath, 'store'),
      '@types': path.resolve(srcPath, 'types'),
      '@utils': path.resolve(srcPath, 'utils'),
    },
  },
  watchFolders: [srcPath],
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
