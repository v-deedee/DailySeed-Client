import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';


export const setupNotificationHandlers = (handleNotificationResponse) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
  return responseListener;
};

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const projectId = Constants.expoConfig.extra.eas.projectId;
    if (!projectId) {
      throw new Error('Project ID not found');
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

export async function schedulePushNotification(title, body, data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
}

export function scheduleNightlyNotification() {
    const triggerDate = new Date();
    
    triggerDate.setHours(21);
    triggerDate.setMinutes(0);
    if (triggerDate.getTime() < Date.now()) {
      triggerDate.setDate(triggerDate.getDate() + 1);
    }
  
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Nhắc nhở tối nay',
        body: 'Đừng quên thực hiện thói quen tốt của bạn!',
        data: { redirect: 'root' }, 
      },
      trigger: {
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
        repeats: true,
      },
    });
  }
  

  export function handleNotificationResponse(response) {
    const data = response.notification.request.content.data;
  
    if (data && data.redirect === 'root') {
      Linking.openURL('app://app/root'); 
    }
  }