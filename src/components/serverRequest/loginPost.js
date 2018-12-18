import generalAccountPost from './generalAccountPost';

export default function loginPost(data) {
  //const loginURL = 'http://localhost:8080/login';
  const loginURL = 'https://afternoon-springs-45644.herokuapp.com/login';
  return generalAccountPost(data, loginURL);
}
