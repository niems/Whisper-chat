import generalAccountPost from './generalAccountPost';

export default function loginPost(data) {
    const loginURL = 'http://localhost:8080/login';
    return generalAccountPost(data, loginURL);
}