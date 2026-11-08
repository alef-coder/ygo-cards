import { MD3DarkTheme } from 'react-native-paper';

export const tema = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#b794f6',
    onPrimary: '#1e1033',
    primaryContainer: '#4a2c7a',
    onPrimaryContainer: '#ffffff',
    secondary: '#cbb8ee',
    background: '#2d1b4e',
    surface: '#3a2463',
    surfaceVariant: '#4a2c7a',
    onSurface: '#ffffff',
    onSurfaceVariant: '#cbb8ee',
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level1: '#3a2463',
      level2: '#412a6e',
      level3: '#48307a',
    },
  },
};