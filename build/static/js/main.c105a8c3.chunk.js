(this["webpackJsonpclien-chat-video"]=this["webpackJsonpclien-chat-video"]||[]).push([[0],{106:function(e,t,c){},138:function(e,t){},140:function(e,t){},156:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(9),s=c.n(a),l=(c(106),c(12)),r=c(59),i=c.n(r),j=c(57),o=c.n(j),b=c(55),u=c.n(b),d=c(91),m=c(92),O=c(56),x=c.n(O),h=c(2),f=Object(n.createContext)(),v=Object(m.io)("http://localhost:5005"),p=function(e){var t=e.children,c=Object(n.useState)(null),a=Object(l.a)(c,2),s=a[0],r=a[1],i=Object(n.useState)(""),j=Object(l.a)(i,2),o=j[0],b=j[1],m=Object(n.useState)({}),O=Object(l.a)(m,2),p=O[0],N=O[1],g=Object(n.useState)(!1),C=Object(l.a)(g,2),y=C[0],w=C[1],S=Object(n.useState)(!1),k=Object(l.a)(S,2),A=k[0],E=k[1],I=Object(n.useState)(""),R=Object(l.a)(I,2),U=R[0],V=R[1],D=Object(n.useState)(!0),F=Object(l.a)(D,2),M=F[0],z=F[1],P=Object(n.useRef)(),H=Object(n.useRef)(),J=Object(n.useRef)();Object(n.useEffect)((function(){(function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({video:!0,audio:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}})()(M).then((function(e){r(e),P.current.srcObject=e}))}),[M]),Object(n.useEffect)((function(){v.on("conn",(function(e){return b(e)})),v.on("callUser",(function(e){var t=e.from,c=e.name,n=e.signal;N({isReceivedCall:!0,from:t,name:c,signal:n})}))}),[]);return Object(h.jsx)(f.Provider,{value:{call:p,callAccepted:y,myVideo:P,userVideo:H,idConnect:o,stream:s,name:U,callEnded:A,setName:V,callUser:function(e){var t=new x.a({initiator:!0,trickle:!1,stream:s});t.on("signal",(function(t){v.emit("callUser",{userToCall:e,signalData:t,from:o,name:U})})),t.on("stream",(function(e){H.current.srcObject=e})),v.on("callAccepted",(function(e){w(!0),t.signal(e)})),J.current=t},answerCall:function(){w(!0);var e=new x.a({initiator:!1,trickle:!1,stream:s});e.on("signal",(function(e){v.emit("answerCall",{signal:e,to:p.from})})),e.on("stream",(function(e){H.current.srcObject=e})),e.signal(p.signal),J.current=e},leaveCall:function(){E(!0),J.current.destroy(),window.location.reload()},setMic:z,mic:M},children:t})},N=function(){return Object(n.useContext)(f)},g=function(){var e=N(),t=e.mic,c=e.setMic,a=e.call,s=e.callAccepted,r=e.myVideo,j=e.userVideo,b=e.stream,u=e.name,d=e.callEnded,m=Object(n.useState)(!0),O=Object(l.a)(m,2),x=O[0],f=O[1],v=Object(n.useState)("mx-auto col-md-8 col-sm-12 p-3"),p=Object(l.a)(v,2),g=p[0],C=p[1];Object(n.useEffect)((function(){s&&C("mx-auto col-md-6 col-sm-12 p-3")}),[s]);return Object(h.jsx)("div",{className:"col-md-12",children:Object(h.jsxs)("div",{className:"row",children:[b&&Object(h.jsxs)("div",{className:g,children:[Object(h.jsx)("div",{children:Object(h.jsxs)("h4",{children:["Your Name: ",u||"name"]})}),Object(h.jsx)("video",{className:"w-100 border border-success",ref:r,playsInline:!0,autoPlay:!0}),Object(h.jsx)("div",{className:"mt-2 text-center",children:Object(h.jsx)("button",{className:"btn btn-outline-secondary",onClick:function(){c(!t)},children:t?Object(h.jsxs)(h.Fragment,{children:["mute ",Object(h.jsx)(o.a,{})]}):Object(h.jsxs)(h.Fragment,{children:["unmute ",Object(h.jsx)(i.a,{})]})})})]}),s&&!d&&Object(h.jsxs)("div",{className:g,children:[Object(h.jsx)("div",{children:Object(h.jsx)("h4",{children:a.name||"boss"})}),Object(h.jsx)("video",{className:"w-100 border border-success",ref:j,playsInline:!0,autoPlay:!0,muted:x}),Object(h.jsx)("div",{className:"mt-2 text-center",children:Object(h.jsx)("button",{className:"btn btn-outline-secondary",onClick:function(){return f(!x)},children:x?Object(h.jsxs)(h.Fragment,{children:["unmute ",Object(h.jsx)(i.a,{})]}):Object(h.jsxs)(h.Fragment,{children:["mute ",Object(h.jsx)(o.a,{})]})})})]})]})})},C=c(98),y=c(190),w=c(191),S=c(192),k=c(193),A=function(e){var t=e.children,c=N(),a=c.callAccepted,s=c.idConnect,r=c.name,i=c.callEnded,j=c.setName,o=c.callUser,b=c.leaveCall,u=Object(n.useState)(""),d=Object(l.a)(u,2),m=d[0],O=d[1];return Object(h.jsxs)("div",{className:"mt-3 col-md-12",children:[Object(h.jsx)("div",{className:"mb-2",children:t}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-md-6 col-sm-12 p-3",children:Object(h.jsxs)("form",{className:"bg-light p-3 rounded",children:[Object(h.jsx)("h4",{className:" mb-3",children:"Account Info"}),Object(h.jsx)(k.a,{label:"Name",value:r,onChange:function(e){return j(e.target.value)},fullWidth:!0}),Object(h.jsx)(C.CopyToClipboard,{text:s,children:Object(h.jsxs)("button",{type:"button",className:"w-100 btn btn-primary mt-3",children:["Copy your ID ",Object(h.jsx)(y.a,{fontSize:"large"})]})})]})}),Object(h.jsx)("div",{className:"col-md-6 col-sm-12 p-3",children:Object(h.jsxs)("form",{className:"bg-light p-3 rounded",children:[Object(h.jsx)("h4",{className:"mb-3",children:"Make a call"}),Object(h.jsx)(k.a,{label:"ID to call",value:m,onChange:function(e){return O(e.target.value)},fullWidth:!0}),a&&!i?Object(h.jsxs)("button",{type:"button",className:"w-100 btn btn-danger mt-3",onClick:b,children:["Hang up ",Object(h.jsx)(w.a,{fontSize:"large"})]}):Object(h.jsxs)("button",{type:"button",className:"w-100 btn btn-success mt-3",onClick:function(){return o(m)},children:["Call ",Object(h.jsx)(S.a,{fontSize:"large"})]})]})})]})]})},E=function(){var e=N(),t=e.call,c=e.callAccepted,n=e.answerCall;return Object(h.jsx)("div",{className:"mb-5",children:t.isReceivedCall&&!c&&Object(h.jsxs)("div",{className:"d-flex justify-content-center",children:[Object(h.jsxs)("h3",{children:[t.name," is calling: "]}),Object(h.jsx)("button",{className:"mx-3 btn btn-secondary",onClick:n,children:"Answer"})]})})};var I=function(){return Object(h.jsxs)("div",{className:"container mt-4",children:[Object(h.jsx)("div",{className:"text-center",children:Object(h.jsx)("h1",{children:"Video chat (Hi\u1ec7n c\xf2)"})}),Object(h.jsx)("div",{children:Object(h.jsx)(g,{})}),Object(h.jsx)("div",{children:Object(h.jsx)(A,{children:Object(h.jsx)(E,{})})})]})};s.a.render(Object(h.jsx)(p,{children:Object(h.jsx)(I,{})}),document.getElementById("root"))}},[[156,1,2]]]);
//# sourceMappingURL=main.c105a8c3.chunk.js.map