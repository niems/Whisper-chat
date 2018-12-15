import generalAccountPost from './generalAccountPost';

export default function createAccountPost(data) {
  const authenticationURL = 'http://localhost:8080/create-account';
  return generalAccountPost(data, authenticationURL);
}
