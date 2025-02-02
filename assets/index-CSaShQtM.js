
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as u}from"./index.vue_vue_type_script_setup_true_lang-By6yHxyk.js";import{_ as f}from"./index.vue_vue_type_script_setup_true_lang-3Yu1E9T9.js";import{d,Q as k,aJ as g,o as x,a as M,i as n,w as t,M as a,ck as C,m as $}from"./bootstrap-aYN_ym_b.js";import{b as m}from"./route-block-B_A1xBdJ.js";import"./index-CbsWY-kb.js";const j=d({__name:"index",setup(w){const s=k();function r(){s.getPermissions().then(()=>{C({title:"当前用户权限",dangerouslyUseHTMLString:!0,message:s.permissions.map(e=>`<p>${e}</p>`).join("")})})}function p(e){window.open(e,"_blank")}return(e,o)=>{const c=$,i=g("ElButton"),l=f,_=u;return x(),M("div",null,[n(l,{title:"Mock",content:"通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档"},{default:t(()=>[n(i,{onClick:o[0]||(o[0]=B=>p("http://mockjs.com/"))},{icon:t(()=>[n(c,{name:"i-ep:link"})]),default:t(()=>[o[1]||(o[1]=a(" Mock.js 官网 "))]),_:1})]),_:1}),n(_,null,{default:t(()=>[n(i,{onClick:r},{default:t(()=>o[2]||(o[2]=[a(" 测试：获取用户权限 ")])),_:1})]),_:1})])}}});typeof m=="function"&&m(j);export{j as default};
