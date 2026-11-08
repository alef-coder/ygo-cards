import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { tema } from './theme';
import { FavoritosProvider } from './context/FavoritosContext';
import CartasScreen from './screens/CartasScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import DetalhesScreen from './screens/DetalhesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Faz a navegação usar as mesmas cores roxas do tema do Paper
const temaNavegacao = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    primary: tema.colors.primary,
    background: tema.colors.background,
    card: tema.colors.surface,
    text: '#ffffff',
    border: tema.colors.surfaceVariant,
  },
};

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: tema.colors.primary,
        tabBarInactiveTintColor: tema.colors.onSurfaceVariant,
      }}
    >
      <Tab.Screen
        name="Cartas"
        component={CartasScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <FavoritosProvider>
        <NavigationContainer theme={temaNavegacao}>
          <Stack.Navigator>
            <Stack.Screen name="Abas" component={Abas} options={{ headerShown: false }} />
            <Stack.Screen
              name="Detalhes"
              component={DetalhesScreen}
              options={{ title: 'Detalhes da carta' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritosProvider>
    </PaperProvider>
  );
}