(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{40:function(e,t,n){"use strict";var o=n(0),a=n.n(o),r=n(91),s=n(6);t.a=function(){return a.a.createElement(r.a,{to:s.a.routePath,className:"navigate home abs-top-left"},a.a.createElement("img",{src:"./assets/svg/placeholder/round-back-arrow.svg",alt:"navigate back to homepage"}))}},41:function(e,t,n){"use strict";var o=function(e){return e.length<4||e.length>15?(console.log("Invalid username: must be 4 - 15 characters long."),!1):!/\W+/.test(e)||(console.log("Invalid username: can ONLY contain letters, numbers, and an underscores (_)"),!1)},a=function(e){return e.length<6||e.length>12?(console.log("Invalid password: must be 6 - 12 characters long"),!1):/[a-zA-Z]+/.test(e)?/\d+/.test(e)?/\s+/.test(e)?(console.log("Invalid password: cannot include spaces"),!1):!!/\W+/.test(e)||(console.log("Invalid password: MUST include at least 1 symbol"),!1):(console.log("Invalid password: must include at least 1 number"),!1):(console.log("Invalid password: must include at least 1 letter"),!1)};t.a=function(e){var t=e.username,n=e.password;return!!o(t)&&!!a(n)}},42:function(e,t,n){"use strict";function o(e,t){return new Promise(function(n,o){var a=Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&");return fetch(t,{method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded"},referrer:"no-referrer",referrerPolicy:"no-referrer-when-downgrade",body:a}).then(function(e){return console.log("response status: ".concat(e.status," | type: ").concat(typeof e.status)),console.log("\theaders: ".concat(JSON.stringify(e.headers),"\n")),404===e.status?(console.log("\t-404 status - rejecteddddd"),o("404 status - rejecteddddd")):n(e)}).catch(function(e){return o(e)})})}n.d(t,"a",function(){return o})},60:function(e,t,n){"use strict";var o=n(0),a=n.n(o),r=n(1),s=n.n(r),c=n(5),i=n.n(c),u=n(4),l=n.n(u),p=n(13),d=n(17),f=n.n(d),h={},m=0,b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"/"===e?e:function(e){var t=e,n=h[t]||(h[t]={});if(n[e])return n[e];var o=f.a.compile(e);return m<1e4&&(n[e]=o,m++),o}(e)(t,{pretty:!0})},g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};var v=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,e.apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},t.prototype.componentWillMount=function(){l()(this.context.router,"You should not use <Redirect> outside a <Router>"),this.isStatic()&&this.perform()},t.prototype.componentDidMount=function(){this.isStatic()||this.perform()},t.prototype.componentDidUpdate=function(e){var t=Object(p.b)(e.to),n=Object(p.b)(this.props.to);Object(p.c)(t,n)?i()(!1,"You tried to redirect to the same route you're currently on: \""+n.pathname+n.search+'"'):this.perform()},t.prototype.computeTo=function(e){var t=e.computedMatch,n=e.to;return t?"string"===typeof n?b(n,t.params):g({},n,{pathname:b(n.pathname,t.params)}):n},t.prototype.perform=function(){var e=this.context.router.history,t=this.props.push,n=this.computeTo(this.props);t?e.push(n):e.replace(n)},t.prototype.render=function(){return null},t}(a.a.Component);v.propTypes={computedMatch:s.a.object,push:s.a.bool,from:s.a.string,to:s.a.oneOfType([s.a.string,s.a.object]).isRequired},v.defaultProps={push:!1},v.contextTypes={router:s.a.shape({history:s.a.shape({push:s.a.func.isRequired,replace:s.a.func.isRequired}).isRequired,staticContext:s.a.object}).isRequired};var w=v;t.a=w},95:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(91),s=n(6),c=n(40),i=n(7),u=n(8),l=n(11),p=n(9),d=n(10),f=n(3),h=n(60),m=n(12),b=n(16),g=n(41),v=n(42);var w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).state={username:"",password:"",loginSuccessful:!1},n.usernameRef=a.a.createRef(),n.passwordRef=a.a.createRef(),n.focusInput=n.focusInput.bind(Object(f.a)(Object(f.a)(n))),n.redirectPath=s.a.routePath+"profile",n.onChange=n.onChange.bind(Object(f.a)(Object(f.a)(n))),n.onSubmit=n.onSubmit.bind(Object(f.a)(Object(f.a)(n))),n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.usernameRef.current.focus()}},{key:"componentWillUnmount",value:function(){this.state.loginSuccessful&&this.props.authenticate(this.state.username)}},{key:"focusInput",value:function(e){console.log("id: ".concat(e.target.id))}},{key:"onChange",value:function(e){switch(e.preventDefault(),e.target.id){case"username":this.setState({username:e.target.value});break;case"password":this.setState({password:e.target.value});break;default:console.log('ID "'.concat(e.target.id,'" not found - no action taken'))}}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var n=this.state,o=n.username,a=n.password;Object(g.a)({username:o,password:a})?(this.props.newNotification("Verifying account...",5e3),function(e){var t=s.a.authenticationServer+"login";return Object(v.a)(e,t)}({username:o,password:a}).then(function(e){return e.json()}).then(function(e){!0===e.accountExists?t.setState({loginSuccessful:!0}):t.props.newNotification("Invalid username and/or password...",5e3,"error")}).catch(function(){t.props.newNotification("Failed to connect to server",5e3,"error")})):console.log("invalid fields...no action taken")}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{onSubmit:this.onSubmit},a.a.createElement("input",{id:"username",className:"rounded-border",type:"text",placeholder:"username",value:this.state.username,onChange:this.onChange,ref:this.usernameRef,required:!0}),a.a.createElement("input",{id:"password",className:"rounded-border",type:"password",placeholder:"password",value:this.state.password,onChange:this.onChange,ref:this.passwordRef,required:!0}),a.a.createElement("button",{id:"submit",type:"submit",onClick:this.onSubmit},"SIGN IN")),this.state.loginSuccessful?a.a.createElement(h.a,{to:this.redirectPath}):null)}}]),t}(o.Component),y=function(e){return a.a.createElement(b.a.Consumer,null,function(t){var n=t.newNotification;return a.a.createElement(m.a.Consumer,null,function(t){var o=t.authenticate;return a.a.createElement(w,Object.assign({},e,{authenticate:o,newNotification:n}))})})};t.default=function(){return a.a.createElement("article",{id:"login",className:"wrapper center"},a.a.createElement(c.a,null),a.a.createElement("h1",null,"Login"),a.a.createElement(y,null),a.a.createElement("p",{className:"related-info"},"Think you have an account? We'll just see...",a.a.createElement("br",null),"Or create a new account"," ",a.a.createElement(r.a,{to:"".concat(s.a.routePath,"create-account"),className:"link-to-default"},"here")))}}}]);
//# sourceMappingURL=2.ff396e5a.chunk.js.map