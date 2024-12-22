import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('AiMovieCast', () => App);
AppRegistry.runApplication('AiMovieCast', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
