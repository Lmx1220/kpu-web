
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-ia1rdtXp.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-CJRusrx0.js";import{d as A,j as g,b2 as B,r as v,ar as w,aH as u,o as C,a as K,h as o,w as r,b as d,e as f,Q as k,L as x,q as D}from"./bootstrap-BssOdyNs.js";import"./index-CI4shd_A.js";const S={class:"block"},$={class:"block"},I={class:"block"},P=A({name:"KeepAliveExamplePage",__name:"page",setup(R){const E=g(),i=B(),l=v(!1),p=v(1);function c(n){let e;switch(n){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return w((n,e)=>{var s,m;const t=(m=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:m.default.name;l.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(n.name)?t&&i.add(t):t&&i.remove(t)}),(n,e)=>{const t=V,s=u("ElSwitch"),m=u("ElInputNumber"),_=u("ElButton"),b=N;return C(),K("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(b,null,{default:r(()=>[d("div",S,[o(s,{modelValue:f(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",$,[o(m,{modelValue:f(p),"onUpdate:modelValue":e[1]||(e[1]=a=>k(p)?p.value=a:null)},null,8,["modelValue"])]),d("div",I,[o(_,{onClick:e[2]||(e[2]=a=>c(1))},{default:r(()=>e[4]||(e[4]=[x(" 进入同级路由页面 ")])),_:1}),o(_,{onClick:e[3]||(e[3]=a=>c(2))},{default:r(()=>e[5]||(e[5]=[x(" 进入下级路由页面 ")])),_:1})])]),_:1})])}}}),q=D(P,[["__scopeId","data-v-108eeb84"]]);export{q as default};
