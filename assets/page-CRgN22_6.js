
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-BYjOVmS1.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-CjtEiaWg.js";import{d as A,l as g,z as B,r as v,t as w,L as u,o as C,b as K,j as o,w as r,e as d,f,ah as k,x,s as D}from"./index-putfknEa.js";const S={class:"block"},$={class:"block"},I={class:"block"},P=A({name:"KeepAliveExamplePage",__name:"page",setup(R){const E=g(),i=B(),n=v(!1),p=v(1);function c(a){let e;switch(a){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return w((a,e)=>{var s,m;const t=(m=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:m.default.name;n.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(a.name)?t&&i.add(t):t&&i.remove(t)}),(a,e)=>{const t=b,s=u("ElSwitch"),m=u("ElInputNumber"),_=u("ElButton"),N=V;return C(),K("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(N,null,{default:r(()=>[d("div",S,[o(s,{modelValue:f(n),"onUpdate:modelValue":e[0]||(e[0]=l=>k(n)?n.value=l:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",$,[o(m,{modelValue:f(p),"onUpdate:modelValue":e[1]||(e[1]=l=>k(p)?p.value=l:null)},null,8,["modelValue"])]),d("div",I,[o(_,{onClick:e[2]||(e[2]=l=>c(1))},{default:r(()=>e[4]||(e[4]=[x(" 进入同级路由页面 ")])),_:1}),o(_,{onClick:e[3]||(e[3]=l=>c(2))},{default:r(()=>e[5]||(e[5]=[x(" 进入下级路由页面 ")])),_:1})])]),_:1})])}}}),z=D(P,[["__scopeId","data-v-979e26c1"]]);export{z as default};
