import generalAccountPost from './generalAccountPost';

export default function createAccountPost(data) {
  //const authenticationURL = 'http://localhost:8080/create-account';
  const authenticationURL = 'https://afternoon-springs-45644.herokuapp.com/';
  return generalAccountPost(data, authenticationURL);
}
