
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,j as b,s as A,r as _,l as g,I as p,o as B,c as w,h as o,w as c,a as d,b as f,Z as k,q as x,M as C,k as D}from"./index-DSYfRqq8.js";import{_ as I}from"./index.vue_vue_type_script_setup_true_lang-CtMictQB.js";const S={class:"block"},$={class:"block"},K={class:"block"},P=V({name:"KeepAliveExamplePage",__name:"page",setup(R){const E=b(),m=A(),n=_(!1),u=_(1);function r(a){let e;switch(a){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return g((a,e)=>{var s,i;const t=(i=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:i.default.name;n.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(a.name)?t&&m.add(t):t&&m.remove(t)}),(a,e)=>{const t=I,s=p("ElSwitch"),i=p("ElInputNumber"),v=p("ElButton"),N=C;return B(),w("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(N,null,{default:c(()=>[d("div",S,[o(s,{modelValue:f(n),"onUpdate:modelValue":e[0]||(e[0]=l=>k(n)?n.value=l:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",$,[o(i,{modelValue:f(u),"onUpdate:modelValue":e[1]||(e[1]=l=>k(u)?u.value=l:null)},null,8,["modelValue"])]),d("div",K,[o(v,{onClick:e[2]||(e[2]=l=>r(1))},{default:c(()=>e[4]||(e[4]=[x(" 进入同级路由页面 ")])),_:1}),o(v,{onClick:e[3]||(e[3]=l=>r(2))},{default:c(()=>e[5]||(e[5]=[x(" 进入下级路由页面 ")])),_:1})])]),_:1})])}}}),j=D(P,[["__scopeId","data-v-92307cc6"]]);export{j as default};
