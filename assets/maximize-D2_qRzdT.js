
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as _,b as r,D as l,o as u,c as p,j as e,w as a,s as f,t as d,f as g,e as n,N as x}from"./index-nFO8NRRw.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";import{u as S}from"./useMainPage-CIIJrTG_.js";import"./useTabbar-B4O-lyC_.js";const z=n("p",null,"同时框架还提供全局函数，可自由控制主页面是否最大化。",-1),B=n("p",null,"可通过双击标签页，或在标签页上右键并选择“最大化”进入。",-1),v=_({__name:"maximize",setup(M){const t=r(),o=S();function s(){o.maximize(!t.mainPageMaximizeStatus)}return(h,C)=>{const i=P,m=l("ElButton"),c=x;return u(),p("div",null,[e(i,{title:"主页面最大化",content:"扩大可视范围和操作区域，能更专注于主页面上的操作"}),e(c,null,{default:a(()=>[z,B,e(m,{onClick:s},{default:a(()=>[f(d(g(t).mainPageMaximizeStatus?"开启":"退出")+"最大化 ",1)]),_:1})]),_:1})])}}});export{v as default};
