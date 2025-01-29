
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-CjgLcnfR.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-Cmc5FAQ9.js";import{d as A,k as g,b5 as B,r as v,as as w,aI as u,o as C,a as K,i as o,w as r,b as d,e as f,R as k,M as x,s as D}from"./bootstrap-CFLGDgEx.js";import"./index-CWw-wBac.js";const I={class:"block"},R={class:"block"},S={class:"block"},$=A({name:"KeepAliveExamplePage",__name:"page",setup(P){const E=g(),m=B(),l=v(!1),p=v(1);function c(n){let e;switch(n){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return w((n,e)=>{var s,i;const t=(i=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:i.default.name;l.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(n.name)?t&&m.add(t):t&&m.remove(t)}),(n,e)=>{const t=V,s=u("ElSwitch"),i=u("ElInputNumber"),_=u("ElButton"),b=N;return C(),K("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(b,null,{default:r(()=>[d("div",I,[o(s,{modelValue:f(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",R,[o(i,{modelValue:f(p),"onUpdate:modelValue":e[1]||(e[1]=a=>k(p)?p.value=a:null)},null,8,["modelValue"])]),d("div",S,[o(_,{onClick:e[2]||(e[2]=a=>c(1))},{default:r(()=>e[4]||(e[4]=[x(" 进入同级路由页面 ")])),_:1}),o(_,{onClick:e[3]||(e[3]=a=>c(2))},{default:r(()=>e[5]||(e[5]=[x(" 进入下级路由页面 ")])),_:1})])]),_:1})])}}}),T=D($,[["__scopeId","data-v-108eeb84"]]);export{T as default};
