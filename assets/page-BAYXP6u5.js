
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,a as A,q as b,r as v,k as B,B as u,o as g,c as w,j as o,w as r,e as c,f,R as k,p as x,L as C}from"./index-vu1a6MAo.js";import{_ as D}from"./index.vue_vue_type_script_setup_true_lang-CQG582G4.js";import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={class:"block"},$={class:"block"},I={class:"block"},K=V({name:"KeepAliveExamplePage",__name:"page",setup(P){const E=A(),i=b(),n=v(!1),p=v(1);function d(a){let e;switch(a){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return B((a,e)=>{var s,m;const t=(m=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:m.default.name;n.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(a.name)?t&&i.add(t):t&&i.remove(t)}),(a,e)=>{const t=D,s=u("ElSwitch"),m=u("ElInputNumber"),_=u("ElButton"),N=C;return g(),w("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(N,null,{default:r(()=>[c("div",S,[o(s,{modelValue:f(n),"onUpdate:modelValue":e[0]||(e[0]=l=>k(n)?n.value=l:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),c("div",$,[o(m,{modelValue:f(p),"onUpdate:modelValue":e[1]||(e[1]=l=>k(p)?p.value=l:null)},null,8,["modelValue"])]),c("div",I,[o(_,{onClick:e[2]||(e[2]=l=>d(1))},{default:r(()=>e[4]||(e[4]=[x(" 进入同级路由页面 ")])),_:1}),o(_,{onClick:e[3]||(e[3]=l=>d(2))},{default:r(()=>e[5]||(e[5]=[x(" 进入下级路由页面 ")])),_:1})])]),_:1})])}}}),q=R(K,[["__scopeId","data-v-92307cc6"]]);export{q as default};
