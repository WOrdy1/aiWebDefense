import Config from 'react-native-config';
//import axios from 'axios';
const ENV = Config.ENV || 'development';
let BASE_URL: string;

switch (ENV) {
  case 'production':
    BASE_URL = Config.API_URL_PROD || '';
    break;
  case 'staging':
    BASE_URL = Config.API_URL_STAGE || '';
    break;
  default:
    BASE_URL = Config.API_URL_DEV || '';
    break;
}
