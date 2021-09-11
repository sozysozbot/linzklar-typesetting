(()=>{"use strict";var t={325:(t,e)=>{e.intToExcelCol=function(t){for(var e,r="",s=Math.floor(Math.abs(t));s>0;)e=(s-1)%26,r=String.fromCharCode(65+e)+r,s=parseInt((s-e)/26);return r},e.excelColToInt=function(t){for(var e=t.toUpperCase().split(""),r=0,s=0;s<e.length;s++)r+=(e[s].charCodeAt(0)-64)*Math.pow(26,e.length-s-1);return r}},195:()=>{},721:(t,e,r)=>{t.exports=r(192)},921:t=>{var e=2*Math.PI;function r(t,e,r,s){var a=t*r+e*s;return a>1&&(a=1),a<-1&&(a=-1),(t*s-e*r<0?-1:1)*Math.acos(a)}function s(t,e){var r=4/3*Math.tan(e/4),s=Math.cos(t),a=Math.sin(t),h=Math.cos(t+e),i=Math.sin(t+e);return[s,a,s-a*r,a+s*r,h+i*r,i-h*r,h,i]}t.exports=function(t,a,h,i,n,M,o,l,c){var u=Math.sin(c*e/360),v=Math.cos(c*e/360),f=v*(t-h)/2+u*(a-i)/2,p=-u*(t-h)/2+v*(a-i)/2;if(0===f&&0===p)return[];if(0===o||0===l)return[];o=Math.abs(o),l=Math.abs(l);var d=f*f/(o*o)+p*p/(l*l);d>1&&(o*=Math.sqrt(d),l*=Math.sqrt(d));var m=function(t,s,a,h,i,n,M,o,l,c){var u=c*(t-a)/2+l*(s-h)/2,v=-l*(t-a)/2+c*(s-h)/2,f=M*M,p=o*o,d=u*u,m=v*v,x=f*p-f*m-p*d;x<0&&(x=0),x/=f*m+p*d;var _=(x=Math.sqrt(x)*(i===n?-1:1))*M/o*v,g=x*-o/M*u,y=c*_-l*g+(t+a)/2,w=l*_+c*g+(s+h)/2,k=(u-_)/M,b=(v-g)/o,C=(-u-_)/M,A=(-v-g)/o,q=r(1,0,k,b),$=r(k,b,C,A);return 0===n&&$>0&&($-=e),1===n&&$<0&&($+=e),[y,w,q,$]}(t,a,h,i,n,M,o,l,u,v),x=[],_=m[2],g=m[3],y=Math.max(Math.ceil(Math.abs(g)/(e/4)),1);g/=y;for(var w=0;w<y;w++)x.push(s(_,g)),_+=g;return x.map((function(t){for(var e=0;e<t.length;e+=2){var r=t[e+0],s=t[e+1],a=v*(r*=o)-u*(s*=l),h=u*r+v*s;t[e+0]=a+m[0],t[e+1]=h+m[1]}return t}))}},954:t=>{var e=1e-10,r=Math.PI/180;function s(t,e,r){if(!(this instanceof s))return new s(t,e,r);this.rx=t,this.ry=e,this.ax=r}s.prototype.transform=function(t){var s=Math.cos(this.ax*r),a=Math.sin(this.ax*r),h=[this.rx*(t[0]*s+t[2]*a),this.rx*(t[1]*s+t[3]*a),this.ry*(-t[0]*a+t[2]*s),this.ry*(-t[1]*a+t[3]*s)],i=h[0]*h[0]+h[2]*h[2],n=h[1]*h[1]+h[3]*h[3],M=((h[0]-h[3])*(h[0]-h[3])+(h[2]+h[1])*(h[2]+h[1]))*((h[0]+h[3])*(h[0]+h[3])+(h[2]-h[1])*(h[2]-h[1])),o=(i+n)/2;if(M<e*o)return this.rx=this.ry=Math.sqrt(o),this.ax=0,this;var l=h[0]*h[1]+h[2]*h[3],c=o+(M=Math.sqrt(M))/2,u=o-M/2;return this.ax=Math.abs(l)<e&&Math.abs(c-n)<e?90:180*Math.atan(Math.abs(l)>Math.abs(c-n)?(c-i)/l:l/(c-n))/Math.PI,this.ax>=0?(this.rx=Math.sqrt(c),this.ry=Math.sqrt(u)):(this.ax+=90,this.rx=Math.sqrt(u),this.ry=Math.sqrt(c)),this},s.prototype.isDegenerate=function(){return this.rx<e*this.ry||this.ry<e*this.rx},t.exports=s},480:t=>{function e(){if(!(this instanceof e))return new e;this.queue=[],this.cache=null}e.prototype.matrix=function(t){return 1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]||(this.cache=null,this.queue.push(t)),this},e.prototype.translate=function(t,e){return 0===t&&0===e||(this.cache=null,this.queue.push([1,0,0,1,t,e])),this},e.prototype.scale=function(t,e){return 1===t&&1===e||(this.cache=null,this.queue.push([t,0,0,e,0,0])),this},e.prototype.rotate=function(t,e,r){var s,a,h;return 0!==t&&(this.translate(e,r),s=t*Math.PI/180,a=Math.cos(s),h=Math.sin(s),this.queue.push([a,h,-h,a,0,0]),this.cache=null,this.translate(-e,-r)),this},e.prototype.skewX=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,0,Math.tan(t*Math.PI/180),1,0,0])),this},e.prototype.skewY=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,Math.tan(t*Math.PI/180),0,1,0,0])),this},e.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],1===this.queue.length)return this.cache;for(var t=1;t<this.queue.length;t++)this.cache=(e=this.cache,r=this.queue[t],[e[0]*r[0]+e[2]*r[1],e[1]*r[0]+e[3]*r[1],e[0]*r[2]+e[2]*r[3],e[1]*r[2]+e[3]*r[3],e[0]*r[4]+e[2]*r[5]+e[4],e[1]*r[4]+e[3]*r[5]+e[5]]);var e,r;return this.cache},e.prototype.calc=function(t,e,r){var s;return this.queue.length?(this.cache||(this.cache=this.toArray()),[t*(s=this.cache)[0]+e*s[2]+(r?0:s[4]),t*s[1]+e*s[3]+(r?0:s[5])]):[t,e]},t.exports=e},665:t=>{var e={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},r=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function s(t){return t>=48&&t<=57}function a(t){this.index=0,this.path=t,this.max=t.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function h(t){for(;t.index<t.max&&(10===(e=t.path.charCodeAt(t.index))||13===e||8232===e||8233===e||32===e||9===e||11===e||12===e||160===e||e>=5760&&r.indexOf(e)>=0);)t.index++;var e}function i(t){var e=t.path.charCodeAt(t.index);return 48===e?(t.param=0,void t.index++):49===e?(t.param=1,void t.index++):void(t.err="SvgPath: arc flag can be 0 or 1 only (at pos "+t.index+")")}function n(t){var e,r=t.index,a=r,h=t.max,i=!1,n=!1,M=!1,o=!1;if(a>=h)t.err="SvgPath: missed param (at pos "+a+")";else if(43!==(e=t.path.charCodeAt(a))&&45!==e||(e=++a<h?t.path.charCodeAt(a):0),s(e)||46===e){if(46!==e){if(i=48===e,e=++a<h?t.path.charCodeAt(a):0,i&&a<h&&e&&s(e))return void(t.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+r+")");for(;a<h&&s(t.path.charCodeAt(a));)a++,n=!0;e=a<h?t.path.charCodeAt(a):0}if(46===e){for(o=!0,a++;s(t.path.charCodeAt(a));)a++,M=!0;e=a<h?t.path.charCodeAt(a):0}if(101===e||69===e){if(o&&!n&&!M)return void(t.err="SvgPath: invalid float exponent (at pos "+a+")");if(43!==(e=++a<h?t.path.charCodeAt(a):0)&&45!==e||a++,!(a<h&&s(t.path.charCodeAt(a))))return void(t.err="SvgPath: invalid float exponent (at pos "+a+")");for(;a<h&&s(t.path.charCodeAt(a));)a++}t.index=a,t.param=parseFloat(t.path.slice(r,a))+0}else t.err="SvgPath: param should start with 0..9 or `.` (at pos "+a+")"}function M(t){var r,s;s=(r=t.path[t.segmentStart]).toLowerCase();var a=t.data;if("m"===s&&a.length>2&&(t.result.push([r,a[0],a[1]]),a=a.slice(2),s="l",r="m"===r?"l":"L"),"r"===s)t.result.push([r].concat(a));else for(;a.length>=e[s]&&(t.result.push([r].concat(a.splice(0,e[s]))),e[s]););}function o(t){var r,s,a,o,l,c,u=t.max;if(t.segmentStart=t.index,s=97==(32|(r=t.path.charCodeAt(t.index))),function(t){switch(32|t){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}(r))if(o=e[t.path[t.index].toLowerCase()],t.index++,h(t),t.data=[],o){for(a=!1;;){for(l=o;l>0;l--){if(!s||3!==l&&4!==l?n(t):i(t),t.err.length)return;t.data.push(t.param),h(t),a=!1,t.index<u&&44===t.path.charCodeAt(t.index)&&(t.index++,h(t),a=!0)}if(!a){if(t.index>=t.max)break;if(!((c=t.path.charCodeAt(t.index))>=48&&c<=57||43===c||45===c||46===c))break}}M(t)}else M(t);else t.err="SvgPath: bad command "+t.path[t.index]+" (at pos "+t.index+")"}t.exports=function(t){var e=new a(t),r=e.max;for(h(e);e.index<r&&!e.err.length;)o(e);return e.err.length?e.result=[]:e.result.length&&("mM".indexOf(e.result[0][0])<0?(e.err="SvgPath: string should start with `M` or `m`",e.result=[]):e.result[0][0]="M"),{err:e.err,segments:e.result}}},192:(t,e,r)=>{var s=r(665),a=r(94),h=r(480),i=r(921),n=r(954);function M(t){if(!(this instanceof M))return new M(t);var e=s(t);this.segments=e.segments,this.err=e.err,this.__stack=[]}M.from=function(t){if("string"==typeof t)return new M(t);if(t instanceof M){var e=new M("");return e.err=t.err,e.segments=t.segments.map((function(t){return t.slice()})),e.__stack=t.__stack.map((function(t){return h().matrix(t.toArray())})),e}throw new Error("SvgPath.from: invalid param type "+t)},M.prototype.__matrix=function(t){var e,r=this;t.queue.length&&this.iterate((function(s,a,h,i){var M,o,l,c;switch(s[0]){case"v":o=0===(M=t.calc(0,s[1],!0))[0]?["v",M[1]]:["l",M[0],M[1]];break;case"V":o=(M=t.calc(h,s[1],!1))[0]===t.calc(h,i,!1)[0]?["V",M[1]]:["L",M[0],M[1]];break;case"h":o=0===(M=t.calc(s[1],0,!0))[1]?["h",M[0]]:["l",M[0],M[1]];break;case"H":o=(M=t.calc(s[1],i,!1))[1]===t.calc(h,i,!1)[1]?["H",M[0]]:["L",M[0],M[1]];break;case"a":case"A":var u=t.toArray(),v=n(s[1],s[2],s[3]).transform(u);if(u[0]*u[3]-u[1]*u[2]<0&&(s[5]=s[5]?"0":"1"),M=t.calc(s[6],s[7],"a"===s[0]),"A"===s[0]&&s[6]===h&&s[7]===i||"a"===s[0]&&0===s[6]&&0===s[7]){o=["a"===s[0]?"l":"L",M[0],M[1]];break}o=v.isDegenerate()?["a"===s[0]?"l":"L",M[0],M[1]]:[s[0],v.rx,v.ry,v.ax,s[4],s[5],M[0],M[1]];break;case"m":c=a>0,o=["m",(M=t.calc(s[1],s[2],c))[0],M[1]];break;default:for(o=[l=s[0]],c=l.toLowerCase()===l,e=1;e<s.length;e+=2)M=t.calc(s[e],s[e+1],c),o.push(M[0],M[1])}r.segments[a]=o}),!0)},M.prototype.__evaluateStack=function(){var t,e;if(this.__stack.length){if(1===this.__stack.length)return this.__matrix(this.__stack[0]),void(this.__stack=[]);for(t=h(),e=this.__stack.length;--e>=0;)t.matrix(this.__stack[e].toArray());this.__matrix(t),this.__stack=[]}},M.prototype.toString=function(){var t,e,r=[];this.__evaluateStack();for(var s=0;s<this.segments.length;s++)e=this.segments[s][0],t=s>0&&"m"!==e&&"M"!==e&&e===this.segments[s-1][0],r=r.concat(t?this.segments[s].slice(1):this.segments[s]);return r.join(" ").replace(/ ?([achlmqrstvz]) ?/gi,"$1").replace(/ \-/g,"-").replace(/zm/g,"z m")},M.prototype.translate=function(t,e){return this.__stack.push(h().translate(t,e||0)),this},M.prototype.scale=function(t,e){return this.__stack.push(h().scale(t,e||0===e?e:t)),this},M.prototype.rotate=function(t,e,r){return this.__stack.push(h().rotate(t,e||0,r||0)),this},M.prototype.skewX=function(t){return this.__stack.push(h().skewX(t)),this},M.prototype.skewY=function(t){return this.__stack.push(h().skewY(t)),this},M.prototype.matrix=function(t){return this.__stack.push(h().matrix(t)),this},M.prototype.transform=function(t){return t.trim()?(this.__stack.push(a(t)),this):this},M.prototype.round=function(t){var e,r=0,s=0,a=0,h=0;return t=t||0,this.__evaluateStack(),this.segments.forEach((function(i){var n=i[0].toLowerCase()===i[0];switch(i[0]){case"H":case"h":return n&&(i[1]+=a),a=i[1]-i[1].toFixed(t),void(i[1]=+i[1].toFixed(t));case"V":case"v":return n&&(i[1]+=h),h=i[1]-i[1].toFixed(t),void(i[1]=+i[1].toFixed(t));case"Z":case"z":return a=r,void(h=s);case"M":case"m":return n&&(i[1]+=a,i[2]+=h),a=i[1]-i[1].toFixed(t),h=i[2]-i[2].toFixed(t),r=a,s=h,i[1]=+i[1].toFixed(t),void(i[2]=+i[2].toFixed(t));case"A":case"a":return n&&(i[6]+=a,i[7]+=h),a=i[6]-i[6].toFixed(t),h=i[7]-i[7].toFixed(t),i[1]=+i[1].toFixed(t),i[2]=+i[2].toFixed(t),i[3]=+i[3].toFixed(t+2),i[6]=+i[6].toFixed(t),void(i[7]=+i[7].toFixed(t));default:return e=i.length,n&&(i[e-2]+=a,i[e-1]+=h),a=i[e-2]-i[e-2].toFixed(t),h=i[e-1]-i[e-1].toFixed(t),void i.forEach((function(e,r){r&&(i[r]=+i[r].toFixed(t))}))}})),this},M.prototype.iterate=function(t,e){var r,s,a,h=this.segments,i={},n=!1,M=0,o=0,l=0,c=0;if(e||this.__evaluateStack(),h.forEach((function(e,r){var s=t(e,r,M,o);Array.isArray(s)&&(i[r]=s,n=!0);var a=e[0]===e[0].toLowerCase();switch(e[0]){case"m":case"M":return M=e[1]+(a?M:0),o=e[2]+(a?o:0),l=M,void(c=o);case"h":case"H":return void(M=e[1]+(a?M:0));case"v":case"V":return void(o=e[1]+(a?o:0));case"z":case"Z":return M=l,void(o=c);default:M=e[e.length-2]+(a?M:0),o=e[e.length-1]+(a?o:0)}})),!n)return this;for(a=[],r=0;r<h.length;r++)if(void 0!==i[r])for(s=0;s<i[r].length;s++)a.push(i[r][s]);else a.push(h[r]);return this.segments=a,this},M.prototype.abs=function(){return this.iterate((function(t,e,r,s){var a,h=t[0],i=h.toUpperCase();if(h!==i)switch(t[0]=i,h){case"v":return void(t[1]+=s);case"a":return t[6]+=r,void(t[7]+=s);default:for(a=1;a<t.length;a++)t[a]+=a%2?r:s}}),!0),this},M.prototype.rel=function(){return this.iterate((function(t,e,r,s){var a,h=t[0],i=h.toLowerCase();if(h!==i&&(0!==e||"M"!==h))switch(t[0]=i,h){case"V":return void(t[1]-=s);case"A":return t[6]-=r,void(t[7]-=s);default:for(a=1;a<t.length;a++)t[a]-=a%2?r:s}}),!0),this},M.prototype.unarc=function(){return this.iterate((function(t,e,r,s){var a,h,n,M=[],o=t[0];return"A"!==o&&"a"!==o?null:("a"===o?(h=r+t[6],n=s+t[7]):(h=t[6],n=t[7]),0===(a=i(r,s,h,n,t[4],t[5],t[1],t[2],t[3])).length?[["a"===t[0]?"l":"L",t[6],t[7]]]:(a.forEach((function(t){M.push(["C",t[2],t[3],t[4],t[5],t[6],t[7]])})),M))})),this},M.prototype.unshort=function(){var t,e,r,s,a,h=this.segments;return this.iterate((function(i,n,M,o){var l,c=i[0],u=c.toUpperCase();n&&("T"===u?(l="t"===c,"Q"===(r=h[n-1])[0]?(t=r[1]-M,e=r[2]-o):"q"===r[0]?(t=r[1]-r[3],e=r[2]-r[4]):(t=0,e=0),s=-t,a=-e,l||(s+=M,a+=o),h[n]=[l?"q":"Q",s,a,i[1],i[2]]):"S"===u&&(l="s"===c,"C"===(r=h[n-1])[0]?(t=r[3]-M,e=r[4]-o):"c"===r[0]?(t=r[3]-r[5],e=r[4]-r[6]):(t=0,e=0),s=-t,a=-e,l||(s+=M,a+=o),h[n]=[l?"c":"C",s,a,i[1],i[2],i[3],i[4]]))})),this},t.exports=M},94:(t,e,r)=>{var s=r(480),a={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},h=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,i=/[\s,]+/;t.exports=function(t){var e,r,n=new s;return t.split(h).forEach((function(t){if(t.length)if(void 0===a[t])switch(r=t.split(i).map((function(t){return+t||0})),e){case"matrix":return void(6===r.length&&n.matrix(r));case"scale":return void(1===r.length?n.scale(r[0],r[0]):2===r.length&&n.scale(r[0],r[1]));case"rotate":return void(1===r.length?n.rotate(r[0],0,0):3===r.length&&n.rotate(r[0],r[1],r[2]));case"translate":return void(1===r.length?n.translate(r[0],0):2===r.length&&n.translate(r[0],r[1]));case"skewX":return void(1===r.length&&n.skewX(r[0]));case"skewY":return void(1===r.length&&n.skewY(r[0]))}else e=t})),n}},4:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.glyphs=void 0,e.glyphs={々:["M-1.4514-2.0714l2.6895 1.631s-2.2757-0.1599-2.5712 0.6111c-0.4719 1.3756 1.2767 1.8975 2.5646 2.206"],一:["M0.0037-3.2358v6.368"],七:["M1.1188-3.2435v6.4222","M-1.0312-2.3235v3.8283","M3.0588-0.4235h-6.0213"],三:["M1.7076-3.2273v6.4222","M-0.0874-2.4073v4.3716","M-1.9174-2.4073v4.3716"],上:["M-2.7103 2.4566h5.5999","M0.0897-2.9754v5.4837"],下:["M2.8126-2.5435h-5.5999","M0.0126 2.8865v-5.4837"],之:["M-0.0807-1.0826s-0.2847 0.9498-1.6169 1.7899","M-0.1382-0.9226l1.7117 1.4091"],二:["M-1.2813-2.3965v3.8281","M1.3987-3.316v6.422"],五:["M3.0759 0.1627h-6.0213"],人:["M-2.7213-1.4512h5.231","M-0.2213-1.0252l3.1621 3.8025","M0.0187-2.9322s0.0797 4.3335-2.7938 5.8405"],値:["M2.4158-2.992s-1.8449 1.8738-5.0045 3.3243","M-1.7542-2.512l4.4775 2.6905","M2.1958-0.492s-2.019 2.7268-5.0045 3.6028","M-1.3042 0.528l4.4775 2.6905"],傾:["M-1.6629-1.9214l4.3514-1.0057","M-1.6629-1.9214s0.2757 4.4142-1.5177 5.083"],全:["M2.7897-2.9635v6.1691","M-2.8103-2.9635v6.1691","M2.7897-2.9635h-5.6015","M2.7897 2.6965h-5.6015","M-2.1803-1.4135h4.1866","M1.9997-1.4135s-0.6914 0.8553-2.3134 1.9027","M-1.4003-0.7935l2.3582 2.5657"],八:["M1.7628-3.2497v6.4222","M3.2738-0.3217h-6.4222","M-0.0322-2.4367v4.3716","M-1.8622-2.4367v4.3716"],六:["M0.0612-3.2291v6.4222","M3.0712-0.0181h-6.0213"],兵:["M-1.8729-1.2517h4.3228","M-0.0379-2.8477s0.0797 4.3335-2.7938 5.8405","M-0.2779-0.9407l3.1621 3.8024","M-1.6729-2.4012s0.1063 1.6502-0.8768 2.367"],再:["M-2.4377-1.9209l1.2016 2.3178","M2.5373-2.5499s-1.3458 4.0767-3.1483 5.3985"],冬:["M-0.0263-2.9321s-0.5392 1.8149-3.062 3.4198","M-0.1363-2.6121l3.2417 2.6924","M-1.8613-0.0571v3.18","M2.0287-0.0571v3.18","M2.0287-0.0571h-3.8905","M0.0637-0.0471v2.7271","M2.0287 2.6779h-3.8905","M2.0287 1.3429h-3.8905"],処:["M-2.3767-2.0164h4.8724","M-3.1317 2.0236h6.384"],別:["M-1.1403-3.0573s0.2923 5.3603-1.6089 6.036","M0.5197-3.0773v4.7673s-0.0906 1.1418 0.6373 1.1418c0.7011 0 1.7927-0.0115 1.7927-0.0115l-0.5517-1.8685","M-0.3703-0.9373s-1.9235 1.2797-2.9545 1.7794","M0.7797-1.2773l1.8494 1.5706"],助:["M-1.1236-2.5289s-0.0367 1.8733-0.0367 3.1118c0 2.0868-1.6428 2.3775-1.6428 2.3774","M1.0974-2.5289v5.779","M2.3949-2.5414h-5.099","M3.1744 0.2456h-6.422"],十:["M-2.6613-2.7063l3.5062-0.0082s-3.3895 2.8384-3.3894 4.0377c0 1.6815 1.909 1.2935 5.281 1.2936","M2.7337 2.6167l-0.7678-2.8989"],友:["M-3.1876-1.1314h1.9795","M-2.1011-2.5614s0.0365 3.8763-1.2793 5.224","M-2.2181-0.6614l1.0136 1.798","M-1.1906-1.9064h1.8995","M-1.0381-0.9264l0.2534 2.2558","M0.6209-1.3164h2.2975","M1.5959-2.9164s0.0424 4.3335-1.4848 5.8405","M1.4689-1.0064l1.6806 3.8025","M0.4144-1.8814s-0.0965 2.7185-0.6275 3.9332","M-1.3856 2.3936l2.289-0.6509"],同:["M-2.0446-2.3764v2.1061","M2.0957-2.3764v2.1061","M2.0957-2.3764h-4.1403","M2.0957-0.5634h-4.1403","M0.0057-3.3209v6.669","M-2.7264 0.2061v2.1061","M2.7777 0.2061v2.1061","M2.7777 0.2061h-5.504","M2.7777 2.0191h-5.504"],周:["M-1.0852-3.2189s-0.0367 2.5171-0.0367 3.7553c0 2.0866-1.6428 2.3772-1.6428 2.3772","M1.1358-3.2189v6.4222","M3.2138 0.8901h-6.4222","M2.4338-1.5439h-5.0993"],四:["M2.7488-3.1854s-2.2968 3.4579-5.7145 6.0857","M-1.7912-2.1644l3.9924 3.9924"],囲:["M2.8138-2.9586v6.1691","M-2.7882-2.9586v6.1691","M2.8138-2.9586h-5.6015","M2.8138 2.7064h-5.6015","M-2.0522-1.1036h4.1866","M-0.0232-2.1816s0.0595 2.9241-2.0836 3.9408","M-0.1802-0.7726l2.3582 2.5657"],地:["M-2.039-1.6684h4.2279","M-0.509-1.7244s-0.4882 3.3028-1.771 4.5856","M-1.029-3.3169s-0.256 0.7941-1.0118 1.6484","M2.186-1.6684l-1.1351 4.3293","M1.051 2.6606l-2.1044-1.2149","M-3.264 2.9276h6.3845"],夏:["M-2.1213-2.2895l5.214 2.755","M-0.8563-2.9995l1.2359 0.682","M-1.8613-0.0245v3.18","M2.5337-2.8645s-2.4694 1.9572-5.6655 3.3596","M2.0287-0.0245v3.18","M2.0287-0.0245h-3.8905","M0.0637-0.0095v2.7271","M2.0287 2.7155h-3.8905","M2.0287 1.3755h-3.8905"],始:["M-2.0842-2.4131v3.82","M2.1558-2.4131h-4.2357","M2.1558-2.4131v3.82","M2.1558-0.7321h-4.2357","M0.0158-2.3971v3.276","M2.1558 0.8759h-4.2357","M-3.1742 2.4929h6.3847"],字:["M-2.3995-3.0142h4.8227","M2.4195-3.0142s-2.2968 1.9086-5.7145 3.3591","M-1.9345-2.5462l4.8432 2.6905","M-2.0475-0.2502h3.3548","M1.3075-0.2502s-1.426 2.0031-4.4949 3.4536","M-0.3105 0.1388v2.2498s-0.0866 0.7377 0.6091 0.7377c0.6702 0 2.8357-0.0116 2.8357-0.0116l-0.5272-1.8837","M1.4065 0.5318l1.9159 1.1061"],守:["M-0.4272-2.5772v4.0783","M-2.8322-2.5772v4.0783","M-0.4272-2.5772h-2.4051","M-0.4272 0.9968h-2.4051","M-0.3972-1.2912h3.6125","M1.3528-3.2652s0.0513 4.7069-1.7979 6.3437","M1.2178-0.9982l2.0348 4.1301","M-1.6522-2.5772v3.6216"],官:["M-0.802-3.1353l1.3236 1.3319","M-2.732-1.7593h5.6525","M-2.742-0.0698h2.695","M-1.262-1.2593s0.0497 3.2296-1.7418 4.3526","M-1.422 0.3212l1.3799 1.498","M0.213-0.0698h2.695","M1.358-1.2593s0.0497 3.2296-1.7418 4.3526","M1.208 0.1617l1.9713 2.8338"],定:["M-2.342-1.7057v2.571h3.1565","M0.808-1.7057v2.9567","M-0.777-2.8172s-0.0279 2.1601-0.0279 3.9244c0 1.2564-1.0226 1.8386-1.8584 1.8387","M2.253-3.3597v6.7185"],将:["M-2.5827-1.9688h4.9511","M-0.1027-3.2488s0.0913 3.463-3.1999 4.6672","M-0.3427-1.8688l3.6217 3.0386","M-1.9927 1.3012h3.6851","M-0.0727-0.5988v3.7957","M-2.5827-1.9688h4.9511","M-0.1027-3.2488s0.0913 3.463-3.1999 4.6672","M-0.3427-1.8688l3.6217 3.0386","M-1.9927 1.3012h3.6851","M-0.0727-0.5988v3.7957"],小:["M-2.532-2.8546h4.8677","M-2.922-0.0872h5.6525","M-0.097-2.8541v5.8665"],巫:["M-2.5264-2.035v2.691","M2.5041-2.035h-5.03","M2.5041-2.035v2.691","M2.5041 0.2817h-5.03","M0.0901-3.2117s0.4062 5.74-3.2281 6.1075","M0.1021 0.9172l2.9115 1.848"],弓:["M-2.184-2.4988h4.2692","M2.086-2.4988l-0.9579 4.999","M-2.489-0.0418h4.8728","M-0.744-2.4843s0.1417 2.5986-1.2048 4.9373","M-3.174 2.4837h6.3845"],律:["M-3.022 1.9105v-3.8754","M-1.317 1.0755l0.8686 0.7507v-3.4052h-2.5782","M-1.717-3.1765v6.368","M0.073-1.991h2.6293","M0.288-0.863l0.3508 2.6059","M2.438-1.9655s-0.1336 3.1404-0.8686 4.5436","M-0.252 2.6135h3.2804"],心:["M-2.589-2.5864l1.3922 2.4246","M2.666-2.7664s-0.5056 1.6664-1.8056 2.5765","M3.051-0.1914h-6.1035","M0.001-3.1814s0.2841 5.507-3.2434 6.323","M-0.544 0.0836l3.671 3.0429"],戦:["M-2.757-2.5803s0.0663 1.6502-0.5467 2.367","M-2.862-1.4308h2.695","M-1.387-3.0268s0.0497 4.3335-1.7418 5.8405","M-1.542-0.9058l1.3799 2.01","M0.213-2.5803s0.0663 1.6502-0.5467 2.367","M0.088-1.4308h2.695","M1.233-3.0268s0.0497 4.3335-1.7418 5.8405","M1.083-1.1198l1.9713 3.8024"],抗:["M-2.8767-2.2097h2.0031","M-0.8717-2.2097l-0.4494 4.0734","M-2.2017-2.1967s0.0665 2.3462-0.5653 4.4578","M-3.3267 2.3213l2.9722-0.6005","M-3.0167 0.0063h2.2863","M-0.7567-2.7837h3.3983","M0.2183-2.7837s0.0486 4.667-1.2523 5.74","M1.6883-1.3497v3.3601s0.0387 0.7731 0.5581 0.7731c0.5002 0 0.9001-0.0118 0.9001-0.0118l-0.3936-1.9095","M0.1683-1.3497h1.5199"],撃:["M-1.9499-1.5935v2.653h4.1549","M2.1961-1.5935v3.325","M0.1071-2.3935s-0.0367 2.4471-0.0367 3.7114c0 0.9003-1.346 1.583-2.4461 1.583","M-3.1589-2.8235h6.3112"],春:["M-0.4013-2.8606s-1.2442 2.2782-2.9061 3.2622","M-2.8063-2.2356l2.3504 2.0291","M-1.6463-0.5806v3.7177","M-0.2013-1.8656v4.5373","M-1.6463 3.1344l-0.801-0.8241","M-1.3063 0.3444l1.0696 1.3289","M-2.3813 0.2744s-0.3234 1.2282-0.829 2.326","M2.7937-1.8656v4.5373","M2.7937-1.8656h-2.9961","M1.2787-1.8456v3.891","M2.7937 2.0394h-2.9961","M2.7937 0.1294h-2.9961"],時:["M-1.978-2.8639v2.8197","M1.932-2.8639h-3.9055","M1.932-2.8639v2.8197","M1.932-1.6239h-3.9055","M-0.048-2.8519v2.4181","M1.932-0.4359h-3.9055","M-3.178 0.7851h6.232","M-1.518-0.1739v2.9242h2.994","M1.472-0.1739v3.3628"],普:["M-1.158-2.5471s-0.7678 1.4623-1.657 1.7766","M-1.158-0.9601s-0.7678 1.4623-1.657 1.7766","M-0.598-0.1421s-0.6826 1.9265-2.4741 3.0495","M2.462-1.9241s-1.3524 1.782-2.8096 2.3111","M0.152-3.1411v3.7294s-0.1257 2.2193 1.3178 2.2193c0.7146 0 1.4265-0.0118 1.4265-0.0118l-0.5623-2.1457"],木:["M-2.5389-2.6134l1.3736 2.3887","M2.6431-2.7914s-0.4988 1.6418-1.7813 2.5384","M3.0231-0.2524h-6.0213","M0.0121-3.1954v6.4222","M0.0221-0.3784s-1.3818 2.3331-3.3538 3.0176","M0.0221-0.2614l3.1022 3.0858"],机:["M-2.747-2.2755h4.8677","M-1.297-2.272s0.2979 4.3354-1.64 5.026","M0.398-2.2955v3.7295s-0.0923 1.1669 0.6496 1.1669c0.7147 0 1.8274-0.0118 1.8273-0.0118l-0.5622-1.9095"],来:["M0.6948-0.7288l0.9614 0.6291v-2.8539h-2.8538","M-1.1912-0.0988v-3.1693","M-0.9762-0.4088s-0.0409 0.9529-0.0409 1.8195c0 1.4604-1.8313 1.6638-1.8313 1.6638","M1.4998-0.0088v3.2903","M3.3748 1.4412h-6.4221","M1.4998-0.0088h-2.4567","M2.5508-1.5188h-4.8094","M1.4998 3.2812l-1.2436-0.6625"],横:["M-0.8927-3.1004v6.0544l-1.1358-0.6558","M-0.2837-0.9134s-1.3651 1.7986-2.836 2.3327","M0.6783-3.1004v6.2214","M0.6253-0.6404l2.3839 1.3819"],激:["M-1.7289-0.2682v1.8045h4.1548","M2.4161-0.2682v2.0752","M0.3271-1.0482s-0.0367 1.5161-0.0367 2.7544c0 0.8818-1.346 1.2905-2.446 1.2905","M-2.0169-3.0352h4.8228","M2.8061-3.0352s-2.2968 1.9086-5.7145 3.3591","M-1.6229-2.5672l4.8432 2.6905"],無:["M-1.5179-1.5526l3.1682 3.1682"],片:["M-2.7019-2.2804h5.5999","M0.0981-2.2174v4.4458","M-2.2219-0.7994v3.0514h4.6738","M2.4421-0.7994v3.5092"],獣:["M-1.9862-1.8206h4.8617","M-0.5437-1.8006s0.1417 1.8927-1.2048 3.9701","M-1.8987-2.6556s-0.185 1.8943-1.2884 3.9735","M2.8763-1.8206l-1.1351 4.9447","M0.9913-1.8056s0.1417 2.097-1.2048 4.3985","M1.7413 3.1244l-2.1044-1.215"],玄:["M-1.6613-2.9355s-0.2902 1.7313-1.6483 3.2623","M-1.7213-2.6345l1.7451 2.5684","M-1.6463-1.596v4.6565","M-0.4513-0.435s-0.3234 1.2282-0.829 2.3261","M-1.6463 3.0605l-0.801-0.8241","M-2.8913 0.0925l0.6892 1.5605","M1.2687-3.2065s-0.4821 1.9993-1.6272 3.1424","M2.6037-2.4505s-1.1216 4.646-2.968 5.543","M0.4337-0.52l2.8964 3.7211","M2.6037-2.4505l-1.5062 0.0261"],王:["M-0.8772-3.2353l1.3236 1.3319","M-2.8107-1.8593h5.6525","M-2.5912-0.2163h4.9999","M-0.0947-1.4923s0.0922 3.464-3.2314 4.6685","M-0.3372-0.1183l3.6573 3.0395"],皇:["M2.3368-2.0635v4.1114","M-2.1302-2.0635v4.1114","M2.3368-2.0635h-4.4673","M2.3368 1.4765h-4.4673","M-3.1092-0.2735h6.3844","M0.0838-3.3335v6.6546"],秋:["M-1.5613-2.5633v5.232l-1.155-0.5667","M-1.5463-0.3433s-0.7661 0.8113-1.6743 1.6875","M-3.1413-1.4633l1.0471 0.6045","M-1.3113-0.9133l1.0471-0.6044","M-0.0713 0.9717l-1.4272-0.8636","M2.5487-3.1333v6.368","M0.4237-2.5483v3.7687","M3.2587 0.3617l-3.6906 1.2506"],筆:["M0.8073 1.1288l1.8046 0.8357v-3.7907h-5.3563","M-2.7327 1.9688v-4.2096","M-0.0227-3.1212v6.368"],縦:["M-0.7792-2.9942l1.3114 1.3296","M-2.6964-1.6212h5.6004","M2.9456-0.4104h-5.6002","M0.1456 3.0146v-3.4553"],而:["M2.9418-0.8729l-5.8162 1.5584","M0.3618-3.3189v6.4222","M0.3618 3.1031l-1.9686-1.1366"],船:["M-1.6567-2.6576v3.0474h3.5655","M1.8983-2.6576v3.5046","M-1.0967 0.5717s-0.6378 1.486-1.6688 1.9892","M-3.0967-1.6583h6.3845","M1.2433 0.5762l1.3799 2.01"],色:["M-0.2246-3.165s-0.7777 1.9608-2.6251 3.0818","M1.9294-2.425s-1.8094 4.5565-4.7882 5.4362","M-1.5686-0.525l4.6725 3.6494","M1.9294-2.425l-2.4299 0.0256"],虎:["M-3.0214-2.5996h1.6655","M-1.3564-2.5996s-0.2258 1.8943-1.5723 3.9735","M-1.5064-1.7633h4.4925","M2.9886-1.7633l-1.135 4.9447","M1.8536 3.1812l-2.1044-1.215","M-0.2864-1.7458s0.1417 1.8927-1.2048 3.9701","M1.2486-1.7493s0.1417 2.097-1.2048 4.3985"],行:["M-1.4817-3.0226v2.571h2.7212","M-2.5817-2.1826h4.8728","M-1.8267-0.1876v2.9242h3.5655","M1.2333-3.0226v2.9567","M1.7283-0.1876v3.3629","M-3.2667 0.7724h6.3845"],術:["M-2.9005-1.7092v2.571h2.7276","M-0.1805-1.7092v2.9567","M-1.5505-2.8202s-0.0241 2.1601-0.0241 3.9244c0 1.2563-0.8836 1.8386-1.6058 1.8386","M0.3145-1.7092v2.571h2.7276","M3.0345-1.7092v2.9567","M1.6595-3.3627v6.7185"],赤:["M-0.3663-0.6973s-0.7863 1.2165-2.654 1.9119","M-1.9613-2.6663l4.5293 2.6013","M-0.8563-3.3013l1.2359 0.682","M1.8137-0.2373s-1.8293 2.8268-4.8409 3.3726","M1.8137-0.2373l-2.4566 0.0159","M2.5337-3.1628s-2.1479 1.8454-5.344 3.2477","M-1.7213 0.9372l4.724 2.264"],躍:["M-0.882-3.1391l1.2217 0.7054","M2.468-2.9961s-2.1234 1.9086-5.283 3.3591","M-1.972-2.4831l4.4775 2.6905","M-3.342 0.7159h6.6218","M-1.462-0.3641v3.2939h2.994","M1.528-0.3641v3.7881"],車:["M-2.8497-0.4973v-1.8708h5.6978v1.8708","M2.0233-0.9455v4.0066","M-2.0168-0.9455v4.0066","M2.0233-0.9455h-4.0384","M2.0233 2.5039h-4.0384","M-0.0142-0.9285v3.436","M3.2273 0.7766h-6.4451"],闇:["M-0.0992-3.0584s-0.5392 1.8149-3.0621 3.4199","M-0.2082-2.7434l3.2417 2.6924","M-0.0737-1.6544v4.8814","M-0.0737 3.2271l-1.488-0.8639","M-2.3882 0.1156l1.2803 1.6359","M2.1423-0.4379s-0.6007 1.2875-1.5401 2.4384"],集:["M-2.8142-1.5114h2.695","M-1.3347-2.9064s0.0497 3.7859-1.7418 5.1025","M-1.4942-1.0514l1.3799 1.7561","M0.1393-1.5114h2.695","M1.2828-2.9064s0.0497 3.7859-1.7418 5.1025","M1.1338-1.2364l1.9713 3.322","M-2.8072 2.7236h5.6525"],須:["M-1.6162-2.2104v4.8367l-1.1358-0.5239","M-1.6022-0.1594s-0.7534 0.75-1.6465 1.56","M-0.1632-2.3344h-2.9338","M-3.1702-1.1974l1.0296 0.5588","M-1.3692-0.6874l1.0296-0.5588","M-0.1522 1.1656l-1.4035-0.7984","M2.1478 1.5896l1.1446 0.5051v-2.2911h-3.3973","M-0.0972 2.1516v-2.6075","M1.5288-3.1404v6.368","M0.1908-2.5724v1.5533h2.6872","M2.8718-2.5724v1.7863"],馬:["M-3.0026-2.8167h4.8547","M-1.4326-2.8167s-0.2258 1.9979-1.5723 4.1906","M-1.6426-1.7083h2.9684","M-2.0276-0.5793h4.9402","M2.9124-0.5793l-1.135 3.7605","M1.7774 3.1812l-2.1044-0.924","M-0.3626-0.5658s0.1417 1.4394-1.2048 3.0193","M1.1724-0.5683s0.1417 1.5948-1.2048 3.3451"]}},607:function(t,e,r){var s=this&&this.__createBinding||(Object.create?function(t,e,r,s){void 0===s&&(s=r),Object.defineProperty(t,s,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,s){void 0===s&&(s=r),t[s]=e[r]}),a=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),h=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&s(e,t,r);return a(e,t),e},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(r(721)),M=h(r(325)),o=r(4),l=t=>""===(t=t.trim())?void 0:"┌┏「".includes(t)?{is_special:!0,char:"topleft"}:"└┗L".includes(t)?{is_special:!0,char:"bottomleft"}:"┘┛」".includes(t)?{is_special:!0,char:"bottomright"}:{is_special:!1,char:t};document.getElementById("convert").onclick=()=>{const t=document.getElementById("raw_input").value,e=document.getElementById("column_spacing_percentage").value,r=document.getElementById("horizontal").checked,s=(t=>{var e,r,s;const a=t.map((t=>t.map(l))),h=[];for(let t=0;t<a.length;t++)for(let i=0;i<a[t].length;i++){const n=a[t][i];if(n&&!n.is_special){console.log(n.char);const o=null===(e=a[t])||void 0===e?void 0:e[i-1],l=null===(r=a[t+1])||void 0===r?void 0:r[i],c=null===(s=a[t+1])||void 0===s?void 0:s[i-1];if((null==o?void 0:o.is_special)&&"topleft"===(null==o?void 0:o.char)&&(null==l?void 0:l.is_special)&&"bottomright"===(null==l?void 0:l.char)&&(null==c?void 0:c.is_special)&&"bottomleft"===(null==c?void 0:c.char))h.push({char:n.char,x_from:i-1,x_until:i+1,y_from:t,y_until:t+2});else{if((null==o?void 0:o.is_special)&&"topleft"===(null==o?void 0:o.char)||(null==l?void 0:l.is_special)&&"bottomright"===(null==l?void 0:l.char)||(null==c?void 0:c.is_special)&&"bottomleft"===(null==c?void 0:c.char))throw console.log(o,l,c),new Error(`二倍サイズの文字を構成する枠線が不完全です。文字：${n.char}、文字の場所：${M.intToExcelCol(i+1)}${t+1}`);h.push({char:n.char,x_from:i,x_until:i+1,y_from:t,y_until:t+1})}}}return h})(t.split("\n").map((t=>t.split("\t")))),{svg:a,x_max:h,y_max:i,x_min:c,y_min:u}=((t,e,r)=>{const s=6.75383,a=r?s:s*(1+e),h=r?s*(1+e):s,i=Math.max(...t.map((t=>t.y_until))),l=Math.max(...t.map((t=>t.x_until)));return r?t.sort(((t,e)=>t.y_from<e.y_from?-1:t.y_from>e.y_from?1:t.x_from-e.x_from)):t.sort(((t,e)=>t.x_until>e.x_until?-1:t.x_until<e.x_until?1:t.y_from-e.y_from)),{svg:`<g fill="none" stroke="#000" stroke-width=".265" id="glyphs">\n    ${t.map((t=>{var e;const r=null!==(e=o.glyphs[t.char])&&void 0!==e?e:["M-2.4-3.2v6.4","M-1.6-3.2v6.4","M-0.8-3.2v6.4","M 0.0-3.2v6.4","M 0.8-3.2v6.4","M 1.6-3.2v6.4","M 2.4-3.2v6.4","M-3.2-2.4h6.4","M-3.2-1.6h6.4","M-3.2-0.8h6.4","M-3.2 0.0h6.4","M-3.2 0.8h6.4","M-3.2 1.6h6.4","M-3.2 2.4h6.4"],s=t.x_until-t.x_from==1&&t.y_until-t.y_from==1,i=s?`${M.intToExcelCol(t.x_from+1)}${t.y_from+1}`:`${M.intToExcelCol(t.x_from+1)}${t.y_from+1}:${M.intToExcelCol(t.x_until)}${t.y_until}`;return`<g id="${t.char}${i}">\n${r.map((e=>`<path d="${(0,n.default)(e).scale(s?1:2).translate(a*(t.x_from+t.x_until)/2,h*(t.y_from+t.y_until)/2).round(4).toString()}" />\n`)).join("\n\t\t")}</g>`})).join("\n")}\n    </g>`,x_max:l*a,y_max:i*h,x_min:-a/2,y_min:-h/2}})(s,Number(e)/100,r);document.getElementById("raw_output").value=`<?xml version="1.0" encoding="UTF-8"?>\n    <svg width="${h-c}mm" height="${i-u}mm" version="1.1" viewBox="${c} ${u} ${h-c} ${i-u}" xmlns="http://www.w3.org/2000/svg">\n    ${a}\n    </svg>`,document.getElementById("svg_output").innerHTML=a,document.getElementById("svg_output").setAttributeNS(null,"width",h-c+"mm"),document.getElementById("svg_output").setAttributeNS(null,"height",i-u+"mm"),document.getElementById("svg_output").setAttributeNS(null,"viewBox",`${c} ${u} ${h-c} ${i-u}`)}}},e={};function r(s){var a=e[s];if(void 0!==a)return a.exports;var h=e[s]={exports:{}};return t[s].call(h.exports,h,h.exports,r),h.exports}r(607),r(195)})();