import generalAccountPost from './generalAccountPost';

export default function loginPost(data) {
  //const loginURL = 'http://localhost:8080/login';
  const loginURL = 'https://git.heroku.com/afternoon-springs-45644.git';
  return generalAccountPost(data, loginURL);
}
