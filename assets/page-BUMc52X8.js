
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,a as A,x as b,r as v,m as g,G as u,o as B,c as w,j as o,w as p,e as d,f,Z as k,t as x,O as C,l as D}from"./index-fOXGxjjY.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-B6BWcwhA.js";const $={class:"block"},I={class:"block"},K={class:"block"},P=V({name:"KeepAliveExamplePage",__name:"page",setup(R){const E=A(),c=b(),l=v(!1),i=v(1);function r(n){let e;switch(n){case 1:e="keepAliveExampleDetail";break;case 2:e="keepAliveExampleNestedDetail";break}E.push({name:e})}return g((n,e)=>{var s,m;const t=(m=(s=e.matched.at(-1))==null?void 0:s.components)==null?void 0:m.default.name;l.value&&["keepAliveExampleDetail","keepAliveExampleNestedDetail"].includes(n.name)?t&&c.add(t):t&&c.remove(t)}),(n,e)=>{const t=S,s=u("ElSwitch"),m=u("ElInputNumber"),_=u("ElButton"),N=C;return B(),w("div",null,[o(t,{title:"页面缓存",content:"除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。"}),o(N,null,{default:p(()=>[d("div",$,[o(s,{modelValue:f(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),"active-text":"开启缓存","inactive-text":"关闭缓存"},null,8,["modelValue"])]),d("div",I,[o(m,{modelValue:f(i),"onUpdate:modelValue":e[1]||(e[1]=a=>k(i)?i.value=a:null)},null,8,["modelValue"])]),d("div",K,[o(_,{onClick:e[2]||(e[2]=a=>r(1))},{default:p(()=>[x(" 进入同级路由页面 ")]),_:1}),o(_,{onClick:e[3]||(e[3]=a=>r(2))},{default:p(()=>[x(" 进入下级路由页面 ")]),_:1})])]),_:1})])}}}),j=D(P,[["__scopeId","data-v-4c353979"]]);export{j as default};
