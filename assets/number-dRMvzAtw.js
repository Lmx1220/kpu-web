
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as c}from"./index.vue_vue_type_script_setup_true_lang-BYjOVmS1.js";import{d as l,cb as p,L as d,o as f,b,j as e,w as o,e as B,y as g,f as x,x as m,_ as C}from"./index-putfknEa.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-CjtEiaWg.js";const V=l({__name:"number",setup(k){const n=p();function r(){n.setNumber(n.number+1)}function u(){n.setNumber(n.number-1)}return(v,t)=>{const i=N,a=C,s=d("ElButton"),_=c;return f(),b("div",null,[e(i,{title:"数字标记",content:"搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏"}),e(_,null,{default:o(()=>[B("div",null," 当前 number 值："+g(x(n).number),1),e(s,{onClick:r},{icon:o(()=>[e(a,{name:"i-ep:plus"})]),default:o(()=>[t[0]||(t[0]=m(" 1 "))]),_:1}),e(s,{onClick:u},{default:o(()=>[e(a,{name:"i-ep:minus"}),t[1]||(t[1]=m(" 1 "))]),_:1})]),_:1})])}}});export{V as default};
