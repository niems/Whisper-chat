//used for both createAccountPost() and loginPost()

export default function generalAccountPost(data, url) {
  return new Promise((resolve, reject) => {
    const encoded = Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');

    const postOptions = {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      referrer: 'no-referrer',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: encoded
    };

    return (
      fetch(url, postOptions)
        //.then(res => resolve(res))
        .then(res => {
          console.log(
            `response status: ${res.status} | type: ${typeof res.status}`
          );
          console.log(`\theaders: ${JSON.stringify(res.headers)}\n`);

          if (res.status === 404) {
            console.log('\t-404 status - rejecteddddd');
            return reject('404 status - rejecteddddd');
          }

          //* attempting to pull json from response
          return resolve(res);
        })
        .catch(err => reject(err))
    );
  });
}
