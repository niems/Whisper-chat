/* used on path= /profile
    determines if the user's token is valid before allowing profile access */
import env from '../../env';

export default function verifyAccountGet() {
  return new Promise((resolve, reject) => {
    //const verificationURL = 'http://localhost:8080/verify-token';
    //const verificationURL = 'https://afternoon-springs-45644.herokuapp.com/verify-token';
    const verificationURL = env.serverDomain + 'verify-token';
    const referrer = env.domain + 'profile';

    const verifyOptions = {
      method: 'GET',
      credentials: 'include',
      referrerPolicy: 'no-referrer-when-downgrade',
      //? referrer: referrer,
      //? referrer: 'https://niems.github.io/whisper-chat/profile',
      //? referrerPolicy: 'origin-when-cross-origin'
    };

    fetch(verificationURL, verifyOptions)
      .then(res => {
        console.log(`verifyAccountGet() response headers: ${JSON.stringify(res.headers)}\n`);
        resolve(res);
      })
      .catch(err => reject(err));
  });
}
