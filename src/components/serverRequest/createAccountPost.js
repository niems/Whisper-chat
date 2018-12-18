import generalAccountPost from './generalAccountPost';

export default function createAccountPost(data) {
  //const authenticationURL = 'http://localhost:8080/create-account';
  const authenticationURL = 'https://git.heroku.com/afternoon-springs-45644.git';
  return generalAccountPost(data, authenticationURL);
}
