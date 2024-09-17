
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{b5 as U,b6 as A,b7 as $,b8 as R,b9 as F,aV as H,r as m,ba as K,d as O,aA as z,N as E,b as G,aY as J,y as q,l as W,z as S,A as P,o as Q,c as X,j as i,w as u,f as n,aK as Z,aF as x,e as r,aG as ee,C as te,p as w,t as f,ae as ne,D as ae,aH as oe,ad as se,aL as re,af as ie,_ as le,m as ce}from"./index-D4b_dGnp.js";import{_ as ue}from"./_plugin-vue_export-helper-DlAUqK2U.js";function de(e,t){return U(t,function(a){return e[a]})}function B(e){return e==null?[]:de(e,A(e))}var fe=Math.floor,me=Math.random;function I(e,t){return e+fe(me()*(t-e+1))}function C(e){var t=e.length;return t?e[I(0,t-1)]:void 0}function pe(e){return C(B(e))}function ke(e){var t=$(e)?C:pe;return t(e)}function j(e,t){var a=-1,c=e.length,p=c-1;for(t=t===void 0?c:t;++a<t;){var o=I(a,p),k=e[o];e[o]=e[a],e[a]=k}return e.length=t,e}function ge(e){return j(R(e))}function ve(e){return j(B(e))}function he(e){var t=$(e)?ge:ve;return t(e)}const L=F().format("YYYY-MM-DD"),D=H("bing",()=>{const e=m([]);async function t(){JSON.parse(localStorage.getItem(`backgroundList-${L}`))||await K({url:"https://api.vuejs-core.cn/getBingImage",method:"get"}).then(({data:a})=>{e.value=a.data,Object.keys(localStorage).forEach(c=>{c.startsWith("backgroundList")&&localStorage.removeItem(c)}),localStorage.setItem(`backgroundList-${L}`,JSON.stringify(a.data))})}return{backgroundList:e,setBackgroundList:t}});D().setBackgroundList();const _e={class:"flex-center cursor-pointer px-2 py-1"},be={class:"screen-lock"},ye={class:"screen-lock-content"},Se={class:"screen-lock-content-title"},xe=["src"],we={class:"screen-lock-content-form"},Le={class:"mb-4 flex items-center justify-center"},M="https://cdn.jsdelivr.net/gh/chuzhixin/image/vab-image-lock/",Me=O({name:"Lock",__name:"index",setup(e){const t={mounted(d){var s;(s=d.querySelector("input"))==null||s.focus()}},{t:a}=z(),c="kpu-web",p=E(),o=G();function k(){o.lock=!0}function N(){o.lock=!1}const V=D(),h=m(`${M}${Math.round(31*Math.random())}.jpg`),l=J({background:"#a0cfff",backgroundSize:"100%",filter:"blur(5px)",transform:"scale(1.05)",transition:"all 3s  ease-in-out"});function _(){l.transform="scale(1.05)",l.transition="none",h.value=ke(he(V.backgroundList))||`${M}${Math.round(31*Math.random())}.jpg`,l.background=`fixed url(${h.value}) center`,setTimeout(()=>{l.transform="scale(1.2)",l.transition="all 3s  ease-in-out"},0)}const Y=m(),g=m({password:"123456"});async function b(){g.value.password==="123456"?await N():ie.error("请输入正确的密码",{zIndex:2001})}return q(()=>o.lock,()=>{setTimeout(()=>{o.lock?l.transform="scale(1.2)":l.transform="scale(1.05)"},500)},{immediate:!0}),W(()=>{setTimeout(()=>{_()},50),S("alt+l",d=>{o.settings.toolbar.lock&&o.settings.navSearch.enableHotkeys&&(d.preventDefault(),o.lock=!0)})}),P(()=>{S.unbind("alt+l")}),(d,s)=>{const v=le,T=ce;return Q(),X("div",_e,[i(v,{name:"i-ri:lock-line",onClick:k}),i(n(re),{as:"template",appear:"",show:n(o).lock},{default:u(()=>[i(n(Z),{class:"lock-drawer fixed inset-0 z-2000 flex backdrop-filter-none",onClose:s[2]||(s[2]=y=>n(o).lock=!1)},{default:u(()=>[i(n(x),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0",appear:""},{default:u(()=>s[3]||(s[3]=[r("div",{class:"fixed inset-0 bg-black/25"},null,-1)])),_:1}),i(n(x),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0",appear:""},{default:u(()=>[i(n(ee),{class:"overflow-hidden! p-0!",relative:"","w-full":"","w-screen":"",flex:"","flex-1":"","flex-col":"","bg-white":"","dark-bg-stone-8":"","focus-outline-none":""},{default:u(()=>[r("div",be,[r("div",{id:"screen-lock-background",class:"screen-lock-background",style:te(n(l))},null,4),r("div",ye,[r("div",Se,[r("img",{width:"180px",src:n(p).avatar,alt:""},null,8,xe),i(v,{name:"i-ri:lock-2-line",class:"i-ri:lock-2-line"}),w(" "+f(n(a)(n(c)))+" "+f(n(a)("屏幕已锁定")),1)]),r("div",we,[r("div",{ref_key:"formRef",ref:Y,onSubmit:s[1]||(s[1]=ne(()=>{},["prevent"]))},[r("div",Le,[ae(r("input",{"onUpdate:modelValue":s[0]||(s[0]=y=>n(g).password=y),class:"form-input",autocomplete:"off",placeholder:"请输出密码123456",type:"password",onKeyup:se(b,["enter"])},null,544),[[oe,n(g).password],[t]]),i(T,{class:"form-button","native-type":"submit",type:"primary",onClick:b},{default:u(()=>[i(v,{name:"i-ri:rotate-lock-2-line",class:"i-ri:rotate-lock-2-line"}),w(" "+f(n(a)("解锁")),1)]),_:1})])],544)]),r("span",{onClick:_},f(n(a)("切换壁纸")),1)])])]),_:1})]),_:1})]),_:1})]),_:1},8,["show"])])}}}),Ie=ue(Me,[["__scopeId","data-v-4f470972"]]);export{Ie as default};
