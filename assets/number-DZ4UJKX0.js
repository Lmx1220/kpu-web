
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as c,bg as l,I as p,o as d,c as f,h as e,w as o,a as b,t as g,b as B,q as u,_ as C,M as N}from"./index-DI_iSbuB.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-DN1ItRwK.js";const P=c({__name:"number",setup(v){const n=l();function m(){n.setNumber(n.number+1)}function r(){n.setNumber(n.number-1)}return(x,t)=>{const i=k,a=C,s=p("ElButton"),_=N;return d(),f("div",null,[e(i,{title:"数字标记",content:"搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏"}),e(_,null,{default:o(()=>[b("div",null," 当前 number 值："+g(B(n).number),1),e(s,{onClick:m},{icon:o(()=>[e(a,{name:"i-ep:plus"})]),default:o(()=>[t[0]||(t[0]=u(" 1 "))]),_:1}),e(s,{onClick:r},{default:o(()=>[e(a,{name:"i-ep:minus"}),t[1]||(t[1]=u(" 1 "))]),_:1})]),_:1})])}}});export{P as default};
