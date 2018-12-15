export function getCookie(cname = 'authentication') {
  const decodedCookie = decodeURIComponent(document.cookie); //gets the cookie if it exists
  const cookieComponents = decodedCookie.split(';'); //pieces of the cookie
  let name = cname + '='; //name of cookie to get
  const nameRegExp = new RegExp(name);

  //searches for cookie
  for (let i = 0; i < cookieComponents.length; i++) {
    //cookie is found
    if (nameRegExp.test(cookieComponents[i])) {
      return cookieComponents[i].substring(name.length + 1); //returns the value for the cookie
    }
  }

  return undefined; //cookie not found
}

export function setCookie(cname = 'authenticated', cvalue = false) {
  const path = '/';
  const date = new Date(); //used to set the cookie expiration date
  date.setHours(date.getHours() + 2); //new expiration date set for 2 hours
  const expires = date.toUTCString();

  cvalue = encodeURIComponent(cvalue);
  document.cookie = `${cname}=${cvalue}; expires=${expires}; path=${path}`;
}

export function deleteCookie(cname = 'authenticated') {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  return getCookie(cname);
}
