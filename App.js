import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { btoa, atob } from 'react-native-quick-base64';
import { TouchableOpacity, Text } from 'react-native';

import user from './reducers/user';
import userReducer from './reducers/userReducer';
import post from './reducers/post';
import contactReducer from './reducers/contactReducer'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import AdminScreen from './screens/AdminScreen';
import UserScreen from './screens/UserScreen';
import ShowScreen from './screens/ShowScreen';
import MyAccount from './screens/MyAccount';


global.btoa = btoa;
global.atob = atob;

const store = configureStore({
  reducer: {
    user: user,
    posts: post,
    users: userReducer,
    contacts: contactReducer,
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  const TabNavigator = () => {
    const userRoles = useSelector(state => state.user.roles); // Récupération des rôles depuis Redux
    console.log("User Roles:", userRoles);

    // Fonction pour déterminer l'icône à afficher
    const getTabBarIcon = (route, color, size) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Admin':
          // Afficher l'icône Admin uniquement si l'utilisateur a le rôle Admin ou Super Admin
          if (userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_SUPER_ADMIN')) {
            iconName = 'hand-peace-o';
          }
          break;
        case 'MyAccount':
          // Afficher l'icône User uniquement si l'utilisateur a le rôle User
          if (userRoles.includes('ROLE_USER')) {
            iconName = 'user-circle';
          }
          break;
        default:
          iconName = 'question';
          break;

      }

      return iconName ? <FontAwesome name={iconName} color={color} size={size} /> : null;
    };


    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
          tabBarActiveTintColor: '#D8BD8A',
          tabBarInactiveTintColor: '#335561',
          tabBarStyle: { backgroundColor: '#AA5042' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {userRoles && (userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_SUPER_ADMIN')) && <Tab.Screen name="Admin" component={AdminScreen} options={{ headerShown: true }} />}
        <Tab.Screen name="MyAccount" component={MyAccount} options={{ headerShown: true }} />
        </Tab.Navigator>

    );

  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="ShowScreen" component={ShowScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#AA5042',
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10, paddingRight:30 }}>
                  <FontAwesome name="angle-double-left" size={30} color="#D8BD8A" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name='UserScreen' component={UserScreen} options={{ headerShown: true }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  
}

