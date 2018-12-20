import generalAccountPost from './generalAccountPost';
import env from '../../env';

export default function createAccountPost(data) {
  //const authenticationURL = 'http://localhost:8080/create-account';
  //const authenticationURL = 'https://afternoon-springs-45644.herokuapp.com/create-account';
  const authenticationURL = env.serverDomain + 'create-account';
  return generalAccountPost(data, authenticationURL);
}
