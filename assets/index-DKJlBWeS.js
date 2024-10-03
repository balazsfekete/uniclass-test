(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const we=(e,t)=>e===t,_e=Symbol("solid-track"),U={equals:we};let oe=de;const O=1,F=2,ce={owned:null,cleanups:null,context:null,owner:null};var b=null;let Q=null,me=null,p=null,v=null,$=null,V=0;function D(e,t){const n=p,r=b,s=e.length===0,l=t===void 0?r:t,o=s?ce:{owned:null,cleanups:null,context:l?l.context:null,owner:l},i=s?e:()=>e(()=>B(()=>G(o)));b=o,p=null;try{return P(i,!0)}finally{p=n,b=r}}function k(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),ae(n,s));return[fe.bind(n),r]}function m(e,t,n){const r=Z(e,t,!1,O);q(r)}function Ce(e,t,n){oe=Ee;const r=Z(e,t,!1,O);r.user=!0,$?$.push(r):q(r)}function W(e,t,n){n=n?Object.assign({},U,n):U;const r=Z(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,q(r),fe.bind(r)}function B(e){if(p===null)return e();const t=p;p=null;try{return e()}finally{p=t}}function ue(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function fe(){if(this.sources&&this.state)if(this.state===O)q(this);else{const e=v;v=null,P(()=>H(this),!1),v=e}if(p){const e=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(e)):(p.sources=[this],p.sourceSlots=[e]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function ae(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&P(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],o=Q&&Q.running;o&&Q.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?v.push(l):$.push(l),l.observers&&he(l)),o||(l.state=O)}if(v.length>1e6)throw v=[],new Error},!1)),t}function q(e){if(!e.fn)return;G(e);const t=V;Se(e,e.value,t)}function Se(e,t,n){let r;const s=b,l=p;p=b=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=O,e.owned&&e.owned.forEach(G),e.owned=null),e.updatedAt=n+1,ge(o)}finally{p=l,b=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ae(e,r):e.value=r,e.updatedAt=n)}function Z(e,t,n,r=O,s){const l={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:b?b.context:null,pure:n};return b===null||b!==ce&&(b.owned?b.owned.push(l):b.owned=[l]),l}function M(e){if(e.state===0)return;if(e.state===F)return H(e);if(e.suspense&&B(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<V);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===O)q(e);else if(e.state===F){const r=v;v=null,P(()=>H(e,t[0]),!1),v=r}}function P(e,t){if(v)return e();let n=!1;t||(v=[]),$?n=!0:$=[],V++;try{const r=e();return Ae(n),r}catch(r){n||($=null),v=null,ge(r)}}function Ae(e){if(v&&(de(v),v=null),e)return;const t=$;$=null,t.length&&P(()=>oe(t),!1)}function de(e){for(let t=0;t<e.length;t++)M(e[t])}function Ee(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:M(r)}for(t=0;t<n;t++)M(e[t])}function H(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===O?r!==t&&(!r.updatedAt||r.updatedAt<V)&&M(r):s===F&&H(r,t)}}}function he(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=F,n.pure?v.push(n):$.push(n),n.observers&&he(n))}}function G(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),o=n.observerSlots.pop();r<s.length&&(l.sourceSlots[o]=r,s[r]=l,n.observerSlots[r]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)G(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function xe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ge(e,t=b){throw xe(e)}const $e=Symbol("fallback");function J(e){for(let t=0;t<e.length;t++)e[t]()}function Le(e,t,n={}){let r=[],s=[],l=[],o=0,i=t.length>1?[]:null;return ue(()=>J(l)),()=>{let u=e()||[],f=u.length,a,c;return u[_e],B(()=>{let h,g,w,L,N,C,S,x,T;if(f===0)o!==0&&(J(l),l=[],r=[],s=[],o=0,i&&(i=[])),n.fallback&&(r=[$e],s[0]=D(ye=>(l[0]=ye,n.fallback())),o=1);else if(o===0){for(s=new Array(f),c=0;c<f;c++)r[c]=u[c],s[c]=D(d);o=f}else{for(w=new Array(f),L=new Array(f),i&&(N=new Array(f)),C=0,S=Math.min(o,f);C<S&&r[C]===u[C];C++);for(S=o-1,x=f-1;S>=C&&x>=C&&r[S]===u[x];S--,x--)w[x]=s[S],L[x]=l[S],i&&(N[x]=i[S]);for(h=new Map,g=new Array(x+1),c=x;c>=C;c--)T=u[c],a=h.get(T),g[c]=a===void 0?-1:a,h.set(T,c);for(a=C;a<=S;a++)T=r[a],c=h.get(T),c!==void 0&&c!==-1?(w[c]=s[a],L[c]=l[a],i&&(N[c]=i[a]),c=g[c],h.set(T,c)):l[a]();for(c=C;c<f;c++)c in w?(s[c]=w[c],l[c]=L[c],i&&(i[c]=N[c],i[c](c))):s[c]=D(d);s=s.slice(0,o=f),r=u.slice(0)}return s});function d(h){if(l[c]=h,i){const[g,w]=k(c);return i[c]=w,t(u[c],g)}return t(u[c])}}}function E(e,t){return B(()=>e(t||{}))}const Oe=e=>`Stale read from <${e}>.`;function pe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return W(Le(()=>e.each,e.children,t||void 0))}function z(e){const t=e.keyed,n=W(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return W(()=>{const r=n();if(r){const s=e.children;return typeof s=="function"&&s.length>0?B(()=>s(t?r:()=>{if(!B(n))throw Oe("Show");return e.when})):s}return e.fallback},void 0,void 0)}function Ne(e,t,n){let r=n.length,s=t.length,l=r,o=0,i=0,u=t[s-1].nextSibling,f=null;for(;o<s||i<l;){if(t[o]===n[i]){o++,i++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===o){const a=l<r?i?n[i-1].nextSibling:n[l-i]:u;for(;i<l;)e.insertBefore(n[i++],a)}else if(l===i)for(;o<s;)(!f||!f.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[i]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--l],a),t[s]=n[l]}else{if(!f){f=new Map;let c=i;for(;c<l;)f.set(n[c],c++)}const a=f.get(t[o]);if(a!=null)if(i<a&&a<l){let c=o,d=1,h;for(;++c<s&&c<l&&!((h=f.get(t[c]))==null||h!==a+d);)d++;if(d>a-i){const g=t[o];for(;i<a;)e.insertBefore(n[i++],g)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const ee="_$DX_DELEGATE";function Be(e,t,n,r={}){let s;return D(l=>{s=l,t===document?e():y(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function j(e,t,n){let r;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},l=()=>(r||(r=s())).cloneNode(!0);return l.cloneNode=l,l}function be(e,t=window.document){const n=t[ee]||(t[ee]=new Set);for(let r=0,s=e.length;r<s;r++){const l=e[r];n.has(l)||(n.add(l),t.addEventListener(l,Ie))}}function _(e,t){t==null?e.removeAttribute("class"):e.className=t}function Y(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let l,o;for(l=0,o=s.length;l<o;l++){const i=s[l];!i||i==="undefined"||t[i]||(te(e,i,!1),delete n[i])}for(l=0,o=r.length;l<o;l++){const i=r[l],u=!!t[i];!i||i==="undefined"||n[i]===u||!u||(te(e,i,!0),n[i]=u)}return n}function Te(e,t,n){return B(()=>e(t,n))}function y(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return K(e,t,r,n);m(s=>K(e,t(),s,n),r)}function te(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,l=r.length;s<l;s++)e.classList.toggle(r[s],n)}function Ie(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function K(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(o){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=I(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=I(e,n,r);else{if(l==="function")return m(()=>{let i=t();for(;typeof i=="function";)i=i();n=K(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],u=n&&Array.isArray(n);if(X(i,t,n,s))return m(()=>n=K(e,i,n,r,!0)),()=>n;if(i.length===0){if(n=I(e,n,r),o)return n}else u?n.length===0?ne(e,i,r):Ne(e,n,i):(n&&I(e),ne(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=I(e,n,r,t);I(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function X(e,t,n,r){let s=!1;for(let l=0,o=t.length;l<o;l++){let i=t[l],u=n&&n[e.length],f;if(!(i==null||i===!0||i===!1))if((f=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))s=X(e,i,u)||s;else if(f==="function")if(r){for(;typeof i=="function";)i=i();s=X(e,Array.isArray(i)?i:[i],Array.isArray(u)?u:[u])||s}else e.push(i),s=!0;else{const a=String(i);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return s}function ne(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function I(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(s!==i){const u=i.parentNode===e;!l&&!o?u?e.replaceChild(s,i):e.insertBefore(s,n):u&&i.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}const ke="_app_1r1js_1",je="_searchBar_1r1js_79",se={app:ke,searchBar:je},qe="/uniclass-test/assets/data-Bs6kqaZ0.txt",ie=e=>{const[t,n]=k(e);return{get:t,set:n}},Pe="_node_8i74u_1",Re="_nodeOpen_8i74u_15",De="_header_8i74u_31",Ue="_headerHasChildren_8i74u_51",Fe="_details_8i74u_75",Me="_disappear_8i74u_1",He="_open_8i74u_89",Ke="_appear_8i74u_1",Ve="_braceLine_8i74u_151",Ge="_children_8i74u_193",A={node:Pe,nodeOpen:Re,header:De,headerHasChildren:Ue,details:Fe,disappear:Me,open:He,appear:Ke,braceLine:Ve,children:Ge};var Qe=j("<div>"),Ye=j("<div><div>"),re=j("<div><div><div></div><div></div><div>");const We={rootMargin:"0px",threshold:1},Xe=(e,t)=>{e.forEach(n=>{n.isIntersecting&&n.target.dispatchEvent(new CustomEvent("visible"))})},le=new IntersectionObserver(Xe,We);function Ze(e){return E(ve,{get children(){return e.node.resultChildren.get()},get query(){return e.query}})}function ve(e){return(()=>{var t=Qe();return y(t,E(pe,{get each(){return e.children},children:n=>E(Je,{node:n,get query(){return e.query}})})),m(()=>_(t,A.children)),t})()}function Je(e){const[t,n]=k(!0),r=()=>n(i=>!i),[s,l]=k(!1),o=i=>{le.observe(i),ue(()=>le.unobserve(i))};return E(z,{get when(){return e.node.resultChildren.get().length>0},get fallback(){return(()=>{var i=re(),u=i.firstChild,f=u.firstChild,a=f.nextSibling,c=a.nextSibling;return y(f,()=>e.node.subId),y(a,()=>e.node.name),y(c,()=>e.node.fullId),m(d=>{var h=A.node,g=A.header;return h!==d.e&&_(i,d.e=h),g!==d.t&&_(u,d.t=g),d},{e:void 0,t:void 0}),i})()},get children(){var i=re(),u=i.firstChild,f=u.firstChild,a=f.nextSibling,c=a.nextSibling;return Te(o,i),i.addEventListener("visible",()=>l(!0)),u.$$click=r,y(f,()=>e.node.subId),y(a,()=>e.node.name),y(c,()=>e.node.fullId),y(i,E(z,{get when(){return s()},get children(){var d=Ye(),h=d.firstChild;return h.$$click=r,y(d,E(ve,{get children(){return e.node.resultChildren.get()},get query(){return e.query}}),null),m(g=>{var w=A.details,L={[A.open]:t()},N=A.braceLine;return w!==g.e&&_(d,g.e=w),g.t=Y(d,L,g.t),N!==g.a&&_(h,g.a=N),g},{e:void 0,t:void 0,a:void 0}),d}}),null),m(d=>{var h=A.node,g={[A.nodeOpen]:t()},w=A.header,L={[A.headerHasChildren]:e.node.resultChildren.get().length>0};return h!==d.e&&_(i,d.e=h),d.t=Y(i,g,d.t),w!==d.a&&_(u,d.a=w),d.o=Y(u,L,d.o),d},{e:void 0,t:void 0,a:void 0,o:void 0}),i}})}be(["click"]);const ze="_filters_dbfrd_1",et="_button_dbfrd_23",tt="_chips_dbfrd_47",R={filters:ze,button:et,chips:tt};var nt=j("<div><button>Select all</button><button>Deselect all"),st=j("<button><div></div><div>");function it(e){return(()=>{var t=nt(),n=t.firstChild,r=n.nextSibling;return y(t,E(pe,{get each(){return e.node.children},children:s=>(()=>{var l=st(),o=l.firstChild,i=o.nextSibling;return y(o,()=>s.subId),y(i,()=>s.name),m(()=>_(l,R.chips)),l})()}),n),m(s=>{var l=R.filters,o=R.button,i=R.button;return l!==s.e&&_(t,s.e=l),o!==s.t&&_(n,s.t=o),i!==s.a&&_(r,s.a=i),s},{e:void 0,t:void 0,a:void 0}),t})()}var rt=j("<div><header><h1>Uniclass Browser</h1><input placeholder=Search></header><main></main><footer>Tables updated on 20 September 2024<br><a href=https://uniclass.thenbs.com/>Uniclass by NBS</a> licensed under&nbsp;<a href=https://creativecommons.org/licenses/by-nd/4.0/>CC BY-ND 4.0</a><br>Rendition by Balázs Fekete licensed under&nbsp;<a href=https://creativecommons.org/licenses/by-sa/4.0/>CC BY-SA 4.0");function lt(){const e=(o,i,u)=>({fullId:o,subId:i,name:u,lowerCaseName:u.toLowerCase(),lowerCaseFullId:o.toLowerCase(),isResult:ie(!1),resultChildren:ie([]),children:[]}),[t,n]=k(e("","","")),r=(o,i,u,f)=>{if(u.length===1)o.children.push(e(i,u[0],f));else{const a=u.shift(),c=o.children.find(d=>d.subId===a);r(c,i,u,f)}};fetch(qe).then(o=>o.text()).then(o=>{const i=e("","","");o.split(/\r?\n/).forEach(u=>{const[f,a]=u.split(/ (.*)/);r(i,f,f.split("_"),a)}),n(i)});const[s,l]=k("Project");return Ce(()=>{const o=t(),i=s().toLowerCase().split(" "),u=f=>{const a=i.every(d=>f.lowerCaseName.indexOf(d)!=-1||f.lowerCaseFullId.indexOf(d)!=-1);f.isResult.set(a);const c=[];if(f.children?.forEach(d=>{u(d)&&c.push(d)}),f.resultChildren.set(c),a||c.length>0)return!0};u(o)}),(()=>{var o=rt(),i=o.firstChild,u=i.firstChild,f=u.nextSibling,a=i.nextSibling;return f.$$input=c=>l(c.target.value),y(i,E(it,{get node(){return t()}}),null),y(a,E(Ze,{get node(){return t()},get query(){return s()}})),m(c=>{var d=se.app,h=se.searchBar;return d!==c.e&&_(o,c.e=d),h!==c.t&&_(f,c.t=h),c},{e:void 0,t:void 0}),m(()=>f.value=s()),o})()}be(["input"]);const ot=document.getElementById("root");Be(()=>E(lt,{}),ot);
