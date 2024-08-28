
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,bh as i,D as l,o as p,c as d,j as e,w as t,e as f,t as b,f as B,s,_ as g,N}from"./index-nFO8NRRw.js";import{_ as C}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";const P=r({__name:"number",setup(k){const n=i();function c(){n.setNumber(n.number+1)}function u(){n.setNumber(n.number-1)}return(v,x)=>{const _=C,o=g,a=l("ElButton"),m=N;return p(),d("div",null,[e(_,{title:"数字标记",content:"搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏"}),e(m,null,{default:t(()=>[f("div",null," 当前 number 值："+b(B(n).number),1),e(a,{onClick:c},{icon:t(()=>[e(o,{name:"i-ep:plus"})]),default:t(()=>[s(" 1 ")]),_:1}),e(a,{onClick:u},{default:t(()=>[e(o,{name:"i-ep:minus"}),s(" 1 ")]),_:1})]),_:1})])}}});export{P as default};
