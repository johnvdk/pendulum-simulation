(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(t,a,e){},7:function(t,a,e){t.exports=e(8)},8:function(t,a,e){"use strict";e.r(a);var n=e(1),s=e(2),h=e(3),i=e(4),o=e(0),r=e.n(o),c=e(6),l=e.n(c),u=(e(13),r.a.Component,function(t){Object(i.a)(e,t);var a=Object(h.a)(e);function e(t){var s;return Object(n.a)(this,e),(s=a.call(this,t)).state={theta_1:-80*Math.PI/180,theta_2:-60*Math.PI/180,omega_1:0,omega_2:0,theta_2_path:[],E:0},s}return Object(s.a)(e,[{key:"componentDidMount",value:function(){this.draw()}},{key:"componentWillUnmount",value:function(){}},{key:"draw",value:function(){var t=this.refs.canvas,a=t.getContext("2d"),e=9.81,n=this.state.E;if(0===n)n=-e*(10350*Math.cos(this.state.theta_1)+4800*Math.cos(this.state.theta_2));else{var s=function(t,a,e,n,s,h,i,o,r){var c=Math.cos(n-e);return s*s*(i/6+o/2)*t*t+o/6*(h*h)*a*a+o/2*s*h*c*t*a-r*((i/2+o)*s*Math.cos(e)+o*h/2*Math.cos(n))}(this.state.omega_1,this.state.omega_2,this.state.theta_1,this.state.theta_2,90,120,70,80,e);console.log("E_calc is: "+s);Math.abs(s-this.state.E)}var h=this.state.theta_2_path,i=function(t,a,e,n,s,h,i,o,r,c){var l=m(h,i,a,n,t,e,o,r,c),u=t,_=f(h,i,a,n,t,e,o,r,c),v=e,M=a+.5*s*u,p=t+.5*s*l,g=n+.5*s*v,d=e+.5*s*_,b=m(h,i,M,g,p,d,o,r,c),y=p,E=f(h,i,M,g,p,d,o,r,c),w=d,k=m(h,i,M=a+.5*s*y,g=n+.5*s*w,p=t+.5*s*b,d=e+.5*s*E,o,r,c),I=t+.5*s*b,P=f(h,i,M,g,p,d,o,r,c),j=e+.5*s*E,O=m(h,i,M=a+s*I,g=n+s*j,p=t+s*k,d=e+s*P,o,r,c),C=t+s*k,S=f(h,i,M,g,p,d,o,r,c);return[t+s/6*(l+2*b+2*k+O),a+s/6*(u+2*y+2*I+C),e+s/6*(_+2*E+2*P+S),n+s/6*(v+2*w+2*j+(e+s*P))]}(this.state.omega_1,this.state.theta_1,this.state.omega_2,this.state.theta_2,.1,70,80,90,120,e);a.clearRect(0,0,2e3,2e3),a.translate(t.width/2,t.height/2),a.rotate(i[1]),_(90,70,a),a.translate(0,87),a.rotate(i[3]-i[1]),_(120,80,a),a.rotate(-i[3]+i[1]),a.translate(0,-87),a.rotate(-i[1]),a.translate(-t.width/2,-t.height/2),this.setState({theta_1:i[1],theta_2:i[3],omega_1:i[0],omega_2:i[2],theta_2_path:h.concat(i[3]),E:n}),requestAnimationFrame(this.draw.bind(this))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("canvas",{ref:"canvas",width:700,height:700}))}}]),e}(r.a.Component));function _(t,a,e){var n=a/10;e.fillStyle="black",e.fillRect(-n/2,0,n,t),e.beginPath(),e.arc(0,0,3,0*Math.PI,2*Math.PI),e.fillStyle="blue",e.fill()}function m(t,a,e,n,s,h,i,o,r){var c=n-e,l=Math.cos(c),u=Math.sin(c);return 3*(2*o*a*u*h*h+3*i*a*l*u*s*s-r*Math.sin(e)*(2*t+4*a)+3*r*a*l*Math.sin(n))/(i*(4*t+12*a-9*l*l))}function f(t,a,e,n,s,h,i,o,r){var c=n-e,l=Math.cos(c),u=Math.sin(c),_=Math.sin(e);return-3*(-3*r*t*l*_+r*Math.sin(n)*(6*a+2*t)-6*r*a*l*_+i*u*s*s*(2*t+6*a)+3*o*a*l*u*h*h)/(o*(4*t+12*a-9*l*l))}l.a.render(r.a.createElement(u,null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.fe503001.chunk.js.map