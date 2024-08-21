
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,h as f,aX as R,aY as T,aR as U,aZ as A,B as K,e as q,o as r,M as S,w as X,f as i,K as k,L as Y,i as g,N as u,a1 as B,q as O,t as z,O as N,T as Z,r as G}from"./index-De2lUAjd.js";var J=Object.defineProperty,Q=Object.defineProperties,W=Object.getOwnPropertyDescriptors,$=Object.getOwnPropertySymbols,x=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,P=(e,s,t)=>s in e?J(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,d=(e,s)=>{for(var t in s||(s={}))x.call(s,t)&&P(e,t,s[t]);if($)for(var t of $(s))ee.call(s,t)&&P(e,t,s[t]);return e},C=(e,s)=>Q(e,W(s));const j={},se=function(e,s){j[e]=s},v=V({name:"Icon",props:{name:String,color:String},computed:{svg(){if(this.name)return j[this.name]}},render(e){const s=this.svg;if(!s)return console.warn(`The name of '${this.name}' could not be found.`),f("span",{class:"m-svg-icon"},null);const t={color:this.color?this.color:s.fill?s.fill:null};return f("span",{class:["m-svg-icon","m-svg-icon--"+this.name]},[f("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:s.viewBox,style:t,class:s.class},[s.defs&&f("defs",{innerHTML:s.defs},null),s.path&&f("path",{fill:"currentColor",d:s.path},null),s.html&&f("g",{innerHTML:s.html},null),this.$slots.default])])}});v.add=se;const _={name:"error",fill:"#F56C6C",viewBox:"0 0 1024 1024",path:"M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"},H={name:"info",fill:"#1CADF2",viewBox:"0 0 1024 1024",path:"M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72z M581,673.9 c-33.2,49.9-67,88.3-123.8,88.3c-38.8-6.3-54.7-34.1-46.3-62.4L484,457.6c1.8-5.9-1.2-12.3-6.6-14.2c-5.4-1.9-15.9,5.1-25.1,15.1 l-44.2,53.2c-1.2-8.9-0.1-23.7-0.1-29.6c33.2-49.9,87.8-89.2,124.8-89.2c35.2,3.6,51.8,31.7,45.7,62.6l-73.6,243.3 c-1,5.5,1.9,11.1,6.9,12.8c5.4,1.9,16.8-5.1,26-15.1l44.2-53.1C583,652.3,581,667.9,581,673.9z M571.2,357.6 c-28,0-50.6-20.4-50.6-50.4c0-30,22.7-50.3,50.6-50.3c28,0,50.6,20.4,50.6,50.3C621.8,337.3,599.1,357.6,571.2,357.6z"},I={name:"success",fill:"#17B77E",viewBox:"0 0 1024 1024",path:"M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"},E={name:"warning",fill:"#FFC603",viewBox:"0 0 1024 1024",path:"M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M510,770.8 c30.4,0,55-24.6,55-55s-24.6-55-55-55s-55,24.6-55,55S479.6,770.8,510,770.8z M509.8,255.3c-39.3,0-71.2,31.9-71.2,71.2 c0,3.1,0.2,6.2,0.6,9.3L472.4,588c2.5,19.3,18.9,33.7,38.4,33.7c19.4,0,35.8-14.4,38.2-33.7l31.8-252.2c5-39.2-22.8-75-62-79.9 C515.9,255.5,512.8,255.3,509.8,255.3z"},D={name:"loading",viewBox:"0 0 50 50",html:'<g stroke="#f2f2f2" stroke-width="3.5"  stroke-linecap="round" fill="none"><circle cx="25" cy="25" r="20" class="m-loading-icon-bg-path"></circle><circle cx="25" cy="25" r="20" stroke="#20a0ff" stroke-dasharray="90, 150" stroke-dashoffset="0" class="m-loading-icon-active-path"><animate attributeName="stroke-dasharray" dur="1.5s" values="1,200;90,150;90,150" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" dur="1.5s" values="0;-40px;-120px" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/></circle></g>'};v.add(_.name,_);v.add(H.name,H);v.add(I.name,I);v.add(E.name,E);v.add(D.name,D);var te=(e,s)=>{const t=e.__vccOpts||e;for(const[l,c]of s)t[l]=c;return t};function oe(e,s){const t=G(0);return t.value=window.setTimeout(e,s),{stop(){window.clearTimeout(t.value)}}}const ne=V({components:{Icon:v},name:"m-message",emits:["close","destroy","collapsed"],props:{id:String,type:{type:String,default:"info"},title:String,message:String,iconURL:String,duration:{type:Number,default:3e3},isCollapsed:Boolean,collapsable:Boolean,supportHTML:Boolean,width:String,className:String,wrapperClassName:String,closable:Boolean,stopTimerOnHover:{type:Boolean,default:!0}},setup(e,{expose:s,emit:t}){const l=U({visible:!0,collapsed:e.isCollapsed,timer:null});let c;const p=()=>{e.duration<0||({stop:c}=oe(()=>{a()},e.duration))},o=()=>{c==null||c()},a=()=>{l.visible=!1},m=()=>{l.collapsed=!l.collapsed,t("collapsed",l.collapsed)},h=()=>{l.visible=!1},w=()=>{e.stopTimerOnHover&&o()},y=()=>{e.stopTimerOnHover&&p()};return A(()=>{o()}),K(()=>{p()}),s({close:a}),{state:l,handleClearTimer:w,handleStartTimer:y,triggerCollapse:m,handleClose:h}}}),ae=["id"],le={key:0,class:"m-message-icons"},re=["src"],ie={class:"m-message-content"},ce={key:0,class:"m-message--title"},de=["innerHTML"],me={key:0,class:"m-message--description"},ue={class:"m-message--control"},pe=g("svg",{viewBox:"0 0 35 35",width:"20",height:"20",version:"1.1",fill:"currentColor"},[g("path",{d:"M9.4,13.9c-0.2,0.2-0.2,0.6,0,0.8l8.1,8.1l0,0l0,0l8.1-8.1c0.2-0.2,0.2-0.6,0-0.8l-1.3-1.3 c-0.2-0.2-0.6-0.2-0.8,0l-5.5,5.5c-0.2,0.2-0.6,0.2-0.8,0l-5.5-5.5c-0.2-0.2-0.6-0.2-0.8,0L9.4,13.9z"})],-1),fe=[pe],ge=g("svg",{viewBox:"0 0 35 35",width:"20",height:"20",version:"1.1",fill:"currentColor"},[g("path",{d:"M19.5,17.5l5.1,5.1l-2,2l-5.1-5.1l-5.1,5.1l-2-2l5.1-5.1l-5.1-5.1l2-2l5.1,5.1l5.1-5.1l2,2L19.5,17.5z"})],-1),ve=[ge];function he(e,s,t,l,c,p){const o=q("icon");return r(),S(Z,{name:"m-message-fade",appear:"",mode:"in-out",onBeforeLeave:s[4]||(s[4]=a=>e.$emit("close")),onAfterLeave:s[5]||(s[5]=a=>e.$emit("destroy"))},{default:X(()=>[e.state.visible?(r(),i("div",{key:0,class:k(["m-message-wrapper",e.wrapperClassName]),id:e.id,style:Y({width:e.width})},[g("div",{class:k(["m-message",e.className]),onMouseenter:s[2]||(s[2]=(...a)=>e.handleClearTimer&&e.handleClearTimer(...a)),onMouseleave:s[3]||(s[3]=(...a)=>e.handleStartTimer&&e.handleStartTimer(...a))},[e.iconURL||e.type?(r(),i("div",le,[e.iconURL?(r(),i("img",{key:0,src:e.iconURL,class:"m-message--icon"},null,8,re)):e.type?(r(),S(o,{key:1,name:e.type,class:"m-message--icon"},null,8,["name"])):u("",!0)])):u("",!0),g("div",ie,[e.title||e.$slots.title?(r(),i("div",ce,[B(e.$slots,"title",{},()=>[O(z(e.title),1)])])):u("",!0),e.supportHTML&&e.message?(r(),i(N,{key:1},[e.state.collapsed?u("",!0):(r(),i("div",{key:0,class:"m-message--description",innerHTML:e.message},null,8,de))],64)):(r(),i(N,{key:2},[e.state.collapsed?u("",!0):(r(),i("div",me,[B(e.$slots,"default",{},()=>[O(z(e.message),1)])]))],64))]),g("div",ue,[e.collapsable&&(e.title||e.$slots.title)?(r(),i("button",{key:0,class:k(["m-message--button m-message--arrow-down",{"is-collapsed":e.state.collapsed}]),onClick:s[0]||(s[0]=(...a)=>e.triggerCollapse&&e.triggerCollapse(...a))},fe,2)):u("",!0),e.closable?(r(),i("button",{key:1,class:"m-message--button m-message--close",onClick:s[1]||(s[1]=(...a)=>e.handleClose&&e.handleClose(...a))},ve)):u("",!0)])],34)],14,ae)):u("",!0)]),_:3})}var ye=te(ne,[["render",he]]);const L=[];let Ce=0;const b={};let F={};const we={stopTimerOnHover:!0,duration:3e3},n=e=>{const s="m-message-"+Ce++,t=C(d(d(d({},we),F),e),{id:s});delete t.hasMask,delete t.position,delete t.zIndex;const l=e.position||"top-center",c=e.hasMask||!1,p=l+(c?"-mask":"");let o=b[p];o?o.count++:(o=b[p]={el:document.createElement("div"),count:1},o.el.className=["m-message-container","is-"+l,c?"has-mask":""].filter(function(y){return!!y}).join(" "),document.body.appendChild(o.el)),e.zIndex&&(o.el.style.zIndex=String(e.zIndex));let a=null;R(e.message)?(a={default:()=>e.message},t.message=""):typeof e.message=="function"&&(a={default:e.message},t.message="");const m=f(ye,t,a),h=document.createElement("div");m.appContext=e.ctx||n._context||null,m.props.onClose=e.onClose,m.props.onDestroy=()=>{o.count--,o.count===0&&(delete b[p],o.el.remove()),T(null,h)},T(m,h),l.indexOf("bottom")===0&&o.el.firstChild?o.el.insertBefore(h.firstElementChild,o.el.firstChild):o.el.appendChild(h.firstElementChild);const w={id:s,close(){var y,M;(M=(y=m==null?void 0:m.component)==null?void 0:y.exposed)==null||M.close()}};return L.push(w),w};n.success=(e,s)=>n(C(d({},s),{type:"success",message:e}));n.info=(e,s)=>n(C(d({},s),{type:"info",message:e}));n.warning=(e,s)=>n(C(d({},s),{type:"warning",message:e}));n.error=(e,s)=>n(C(d({},s),{type:"error",message:e}));n.loading=(e,s)=>n(C(d({},s),{type:"loading",message:e}));n.closeAll=function(){for(let e=L.length-1;e>=0;e--)L[e].close()};n.setDefault=e=>{F=d({},e)};const ke=(e,s)=>(e.install=s,e);var Le=ke(n,function(e,s={}){n._context=e._context,e.config.globalProperties["$"+(s.name||"mmessage")]=n,s.defaultOptions&&n.setDefault(s.defaultOptions)});export{Le as i};