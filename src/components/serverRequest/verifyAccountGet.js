/* used on path= /profile
    determines if the user's token is valid before allowing profile access */
export default function verifyAccountGet() {
  return new Promise((resolve, reject) => {
    //const verificationURL = 'http://localhost:8080/verify-token';
    const verificationURL = 'https://afternoon-springs-45644.herokuapp.com/verify-token';


    const verifyOptions = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(verificationURL, verifyOptions)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}
