import generalAccountPost from './generalAccountPost';
import env from '../../env';

export default function loginPost(data) {
  //const loginURL = 'http://localhost:8080/login';
  //const loginURL = 'https://afternoon-springs-45644.herokuapp.com/login';
  //const loginURL = env.serverDomain + 'login';
  const loginURL = env.authenticationServer + 'login';
  return generalAccountPost(data, loginURL);
}
