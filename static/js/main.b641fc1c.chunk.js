(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){"use strict";var a=n(0),i=n.n(a).a.createContext({isUserAuthenticated:{status:!1,username:""},authenticate:function(){},signout:function(){}});e.a=i},16:function(t,e,n){"use strict";var a=n(0),i=n.n(a).a.createContext({isActive:!1,msg:"",newNotification:function(){}});e.a=i},21:function(t,e,n){t.exports=n(33)},26:function(t,e,n){},30:function(t,e,n){},33:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),c=n(19),o=n.n(c),r=n(96),u=(n(26),n(7)),s=n(8),l=n(11),h=n(9),m=n(10),p=n(3),v=n(100),f=n(98),d=n(6),b=n(12);function g(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"authentication",e=decodeURIComponent(document.cookie).split(";"),n=t+"=",a=new RegExp(n),i=0;i<e.length;i++)if(a.test(e[i]))return e[i].substring(n.length+1)}function w(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"authenticated";return document.cookie="".concat(t,"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"),g(t)}var E=n(91),j=function(){return i.a.createElement(b.a.Consumer,null,function(t){var e=t.isUserAuthenticated;return i.a.createElement("main",{id:"homepage",className:"wrapper main"},i.a.createElement("header",null,i.a.createElement("div",{className:"row space-between"},i.a.createElement(E.a,{className:"link-to",to:"".concat(d.a.routePath,"create-account")},"Create Account"),e.status?i.a.createElement(E.a,{className:"link-to",to:"".concat(d.a.routePath,"profile")},"Profile"):i.a.createElement(E.a,{className:"link-to",to:"".concat(d.a.routePath,"login")},"Login")),i.a.createElement("h1",null,"Whisper chat"),i.a.createElement("p",null,"App description here...")))})},A=n(16),O=function(t){var e=t.isActive,n=t.msg,a=t.duration,c=t.type;return e?i.a.createElement("p",{className:"notification ".concat(c),style:{animationDuration:"".concat(a,"ms")}},n):null},k=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(l.a)(this,Object(h.a)(e).call(this,t))).state={isActive:!1,msg:"",duration:0,type:""},n.timerID=null,n.newNotification=n.newNotification.bind(Object(p.a)(Object(p.a)(n))),n.newNotificationSetup=n.newNotificationSetup.bind(Object(p.a)(Object(p.a)(n))),n.previousNotificationActive=n.previousNotificationActive.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(e,t),Object(s.a)(e,[{key:"newNotification",value:function(t,e){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";this.previousNotificationActive().then(function(){return n.newNotificationSetup(t,e,a)}).catch(function(t){return console.error(t)})}},{key:"newNotificationSetup",value:function(t,e,n){var a=this;this.setState({isActive:!0,msg:t,duration:e,type:n}),this.timerID=setTimeout(function(){a.setState({isActive:!1,msg:"",duration:0,type:""})},e)}},{key:"previousNotificationActive",value:function(){var t=this;return new Promise(function(e){t.state.isActive?(clearTimeout(t.timerID),t.timerID=null,t.setState({isActive:!1},function(){e()})):e()})}},{key:"render",value:function(){return i.a.createElement(A.a.Provider,{value:{isActive:this.state.isActive,msg:this.state.msg,newNotification:this.newNotification}},this.props.children,i.a.createElement(O,{isActive:this.state.isActive,msg:this.state.msg,duration:this.state.duration,type:this.state.type}))}}]),e}(a.Component),y=(n(30),Object(a.lazy)(function(){return n.e(1).then(n.bind(null,97))})),N=Object(a.lazy)(function(){return n.e(2).then(n.bind(null,95))}),P=Object(a.lazy)(function(){return n.e(3).then(n.bind(null,99))}),S=Object(a.lazy)(function(){return n.e(4).then(n.bind(null,92))}),U=function(t){function e(t){var n;Object(u.a)(this,e),n=Object(l.a)(this,Object(h.a)(e).call(this,t));var a=g("username");return n.state={isUserAuthenticated:{status:void 0!==a,username:void 0===a?"":a}},n.authenticate=n.authenticate.bind(Object(p.a)(Object(p.a)(n))),n.signout=n.signout.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(e,t),Object(s.a)(e,[{key:"authenticate",value:function(t){this.setState({isUserAuthenticated:{status:!0,username:t}})}},{key:"signout",value:function(){w("token"),w("username"),this.setState({isUserAuthenticated:{status:!1,username:""}})}},{key:"render",value:function(){return i.a.createElement("div",{id:"app"},i.a.createElement(k,null,i.a.createElement(b.a.Provider,{value:{isUserAuthenticated:this.state.isUserAuthenticated,authenticate:this.authenticate,signout:this.signout}},i.a.createElement(a.Suspense,{fallback:i.a.createElement("div",null,"Loading...")},i.a.createElement(v.a,null,i.a.createElement(f.a,{path:"".concat(d.a.routePath,"create-account"),component:y}),i.a.createElement(f.a,{path:"".concat(d.a.routePath,"login"),component:N}),i.a.createElement(f.a,{path:"".concat(d.a.routePath,"profile"),component:P}),i.a.createElement(f.a,{exact:!0,path:d.a.routePath,component:j}),i.a.createElement(f.a,{component:S}))))))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(r.a,null,i.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},6:function(t,e,n){"use strict";var a={isProduction:!0,routePath:"/whisper-chat/",domain:"https://niems.github.io".concat("/whisper-chat/"),authenticationServer:"https://whisper-auth-45644.herokuapp.com/",applicationServer:"https://whisper-45644.herokuapp.com/"};e.a=a}},[[21,9,8]]]);
//# sourceMappingURL=main.b641fc1c.chunk.js.map