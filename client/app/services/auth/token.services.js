import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'dailySeed';

// Lưu trữ token
export const saveTokenToLocalStorage = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token saved to Local Storage');
    
  } catch (error) {
    console.error('Error saving token to Local Storage:', error);
  }
 };
 
 // Lấy token từ Local Storage
 export const getTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    } else {
      console.log('No token found in Local Storage');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token from Local Storage:', error);
    return null;
  }
 };
 
 // Xóa token khỏi Local Storage
 export const deleteTokenFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('Token deleted from Local Storage');
  } catch (error) {
    console.error('Error deleting token from Local Storage:', error);
  }
 };
 