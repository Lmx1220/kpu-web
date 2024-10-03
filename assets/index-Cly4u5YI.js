
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{a_ as A,a$ as E,b0 as T,b1 as J,b2 as q,am as z,r as f,b3 as G,d as H,y as K,ax as P,O as W,b as X,aR as Q,z as Z,m as ee,A as x,B as te,o as ae,c as ne,j as l,w as d,f as a,aI as se,aD as w,S as M,e as o,aE as oe,D as re,q as $,t as k,a0 as le,G as ce,aF as ie,$ as ue,aJ as de,aX as L,a1 as fe,_ as me,p as pe,k as ke}from"./index-BSkZKgnl.js";function ge(e,t){return A(t,function(n){return e[n]})}function F(e){return e==null?[]:ge(e,E(e))}var ve=Math.floor,he=Math.random;function C(e,t){return e+ve(he()*(t-e+1))}function D(e){var t=e.length;return t?e[C(0,t-1)]:void 0}function _e(e){return D(F(e))}function be(e){var t=T(e)?D:_e;return t(e)}function j(e,t){var n=-1,c=e.length,u=c-1;for(t=t===void 0?c:t;++n<t;){var m=C(n,u),g=e[m];e[m]=e[n],e[n]=g}return e.length=t,e}function ye(e){return j(J(e))}function Se(e){return j(F(e))}function xe(e){var t=T(e)?ye:Se;return t(e)}const B=q().format("YYYY-MM-DD"),N=z("bing",()=>{const e=f([]);async function t(){JSON.parse(localStorage.getItem(`backgroundList-${B}`))||await G({url:"https://api.vuejs-core.cn/getBingImage",method:"get"}).then(({data:n})=>{e.value=n.data,Object.keys(localStorage).forEach(c=>{c.startsWith("backgroundList")&&localStorage.removeItem(c)}),localStorage.setItem(`backgroundList-${B}`,JSON.stringify(n.data))})}return{backgroundList:e,setBackgroundList:t}});N().setBackgroundList();const we={class:"flex-center cursor-pointer px-2 py-1"},Me={class:"screen-lock"},$e={class:"screen-lock-content"},Le={class:"screen-lock-content-title"},Be=["src"],Ie={class:"screen-lock-content-form"},Te={class:"mb-4 flex items-center justify-center"},I="https://cdn.jsdelivr.net/gh/chuzhixin/image/vab-image-lock/",Fe=H({name:"Lock",__name:"index",setup(e){const t={mounted(p){var s;(s=p.querySelector("input"))==null||s.focus()}},n=f({enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0"}),c=K(()=>({enter:"duration-300 ease-out",enterFrom:"-translate-y-full",enterTo:"translate-y-0",leave:"duration-200 ease-in",leaveFrom:"translate-y-0",leaveTo:"-translate-y-full"})),{t:u}=P(),m="kpu-web",g=W(),r=X();function R(){r.lock=!0,L.local.set("lock","true")}function U(){r.lock=!1,L.local.set("lock","false")}const V=N(),_=f(`${I}${Math.round(31*Math.random())}.jpg`),i=Q({background:"#a0cfff",backgroundSize:"100%",filter:"blur(5px)",transform:"scale(1.05)",transition:"all 3s  ease-in-out"});function b(){i.transform="scale(1.05)",i.transition="none",_.value=be(xe(V.backgroundList))||`${I}${Math.round(31*Math.random())}.jpg`,i.background=`fixed url(${_.value}) center`,setTimeout(()=>{i.transform="scale(1.2)",i.transition="all 3s  ease-in-out"},0)}const Y=f(),v=f({password:"123456"});async function y(){v.value.password==="123456"?await U():fe.error("请输入正确的密码",{zIndex:2001})}return Z(()=>r.lock,()=>{setTimeout(()=>{r.lock?i.transform="scale(1.2)":i.transform="scale(1.05)"},500)},{immediate:!0}),ee(()=>{setTimeout(()=>{b()},50),x("alt+l",p=>{r.settings.toolbar.lock&&r.settings.navSearch.enableHotkeys&&(p.preventDefault(),r.lock=!0)})}),te(()=>{x.unbind("alt+l")}),(p,s)=>{const h=me,O=pe;return ae(),ne("div",we,[l(h,{name:"i-ri:lock-line",onClick:R}),l(a(de),{as:"template",appear:"",show:a(r).lock},{default:d(()=>[l(a(se),{class:"lock-drawer fixed inset-0 z-2000 flex backdrop-filter-none",onClose:s[2]||(s[2]=S=>a(r).lock=!1)},{default:d(()=>[l(a(w),M({as:"template"},a(n),{class:a(n).enterFrom,appear:""}),{default:d(()=>s[3]||(s[3]=[o("div",{class:"fixed inset-0 bg-black/25"},null,-1)])),_:1},16,["class"]),l(a(w),M({as:"template"},a(c),{class:a(c).enterFrom,appear:""}),{default:d(()=>[l(a(oe),{class:"overflow-hidden! p-0!",relative:"","w-full":"","w-screen":"",flex:"","flex-1":"","flex-col":"","bg-white":"","dark-bg-stone-8":"","focus-outline-none":""},{default:d(()=>[o("div",Me,[o("div",{id:"screen-lock-background",class:"screen-lock-background",style:re(a(i))},null,4),o("div",$e,[o("div",Le,[o("img",{width:"180px",src:a(g).avatar,alt:""},null,8,Be),l(h,{name:"i-ri:lock-2-line",class:"i-ri:lock-2-line"}),$(" "+k(a(u)(a(m)))+" "+k(a(u)("屏幕已锁定")),1)]),o("div",Ie,[o("div",{ref_key:"formRef",ref:Y,onSubmit:s[1]||(s[1]=le(()=>{},["prevent"]))},[o("div",Te,[ce(o("input",{"onUpdate:modelValue":s[0]||(s[0]=S=>a(v).password=S),class:"form-input",autocomplete:"off",placeholder:"请输出密码123456",type:"password",onKeyup:ue(y,["enter"])},null,544),[[ie,a(v).password],[t]]),l(O,{class:"form-button","native-type":"submit",type:"primary",onClick:y},{default:d(()=>[l(h,{name:"i-ri:rotate-lock-2-line",class:"i-ri:rotate-lock-2-line"}),$(" "+k(a(u)("解锁")),1)]),_:1})])],544)]),o("span",{onClick:b},k(a(u)("切换壁纸")),1)])])]),_:1})]),_:1},16,["class"])]),_:1})]),_:1},8,["show"])])}}}),De=ke(Fe,[["__scopeId","data-v-d54a0c2e"]]);export{De as default};
