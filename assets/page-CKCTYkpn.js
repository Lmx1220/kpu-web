
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as N,a as V,C as b,r as v,A as g,e as u,o as B,f as C,h as o,w as p,i as d,j as f,Y as k,q as x,U as w,z as D}from"./index-4WfM3T31.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-BldwxBJD.js";const $={class:"block"},h={class:"block"},I={class:"block"},K=N({name:"KeepAliveExamplePage",__name:"page",setup(P){const E=V(),m=b(),l=v(!1),c=v(1);function r(n){let e;switch(n){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return g((n,e)=>{var s,i;const t=(i=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:i.default.name;l.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(n.name)?t&&m.add(t):t&&m.remove(t)}),(n,e)=>{const t=S,s=u("ElSwitch"),i=u("ElInputNumber"),_=u("ElButton"),A=w;return B(),C("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(A,null,{default:p(()=>[d("div",$,[o(s,{modelValue:f(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",h,[o(i,{modelValue:f(c),"onUpdate:modelValue":e[1]||(e[1]=a=>k(c)?c.value=a:null)},null,8,["modelValue"])]),d("div",I,[o(_,{onClick:e[2]||(e[2]=a=>r(1))},{default:p(()=>[x(" 进入同级路由页面 ")]),_:1}),o(_,{onClick:e[3]||(e[3]=a=>r(2))},{default:p(()=>[x(" 进入下级路由页面 ")]),_:1})])]),_:1})])}}}),j=D(K,[["__scopeId","data-v-4c353979"]]);export{j as default};
