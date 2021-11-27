import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/
const api = axios.create({
  //baseURL: 'http://localhost:3333/',
  baseURL: "http://192.168.15.73:8080",
});

api.interceptors.request.use(async (config) => {
    try {
      const token = await EncryptedStorage.getItem("user@token");
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    } catch (err) {
      alert(err);
    }
  });

export default api;