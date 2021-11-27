import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import OneSignal from 'react-native-onesignal';

import SignIn from './components/signIn';
import Home from './components/home';
import api from './services/api';
import SignUp from './components/signUp';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'LOAD_ALERT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      alert: { name: '', description: '', threatLevel: 1, active: false, district: '' },
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await EncryptedStorage.getItem("user@token");
      } catch (e) {
        console.error('Ocorreu um erro para recuperar o token: ', error);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();

    // ONESIGNAL
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('2096a882-8ab0-4c94-a0ac-f50f01e4b3e7');
    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let response = null;

        try {
          response = await api.post("/login", data);
          console.log('signIn response: ', response);
          if (response.status == '200' || response.status == '202') {
            await EncryptedStorage.setItem('user@token', response.data);
          }
        } catch (error) {
          console.error('Ocorreu um erro no login: ', error);
        }

        dispatch({ type: 'SIGN_IN', token: response });
      },
      signOut: async () => {
        await EncryptedStorage.removeItem('user@token');
        dispatch({ type: 'SIGN_OUT' });
      },
      loadAlert: async (data) => {
        // carregar alert aqui
        await EncryptedStorage.removeItem('user@token');
        dispatch({ type: 'LOAD_ALERT',  });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <>
              <Stack.Screen name="Login"
                component={SignIn}
                options={{ title: 'Acessar', animationTypeForReplace: state.isSignout ? 'pop' : 'push', }}
              />
              <Stack.Screen name="Cadastro"
                component={SignUp}
                options={{ title: 'Cadastrar novo usuário', animationTypeForReplace: state.isSignout ? 'pop' : 'push', }}
              />
            </>
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}