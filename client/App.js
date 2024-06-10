import { LogBox } from "react-native";
import AllProviders from "./app/contexts/provider";
import Root from "./app/Root";
// import * as dotenv from 'react-native-dotenv';

// dotenv.config(); // Load environment variables

// Đoạn này để ẩn warning slider
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

// Đoạn này ẩn warning Notification
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <AllProviders>
      <Root />
    </AllProviders>
  );
}
