import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import { uniffiInitAsync } from 'react-native-uniffi_test';

uniffiInitAsync().then(() => {
  AppRegistry.registerComponent(appName, () => App);
});
