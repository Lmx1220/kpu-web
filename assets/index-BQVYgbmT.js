
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as f}from"./index.vue_vue_type_script_setup_true_lang-BYjOVmS1.js";import{_ as u}from"./index.vue_vue_type_script_setup_true_lang-CjtEiaWg.js";import{d,P as k,L as g,o as x,b as j,j as n,w as e,x as a,cc as C,_ as M,Q as c}from"./index-putfknEa.js";const P=d({__name:"index",setup($){const s=k();function m(){s.getPermissions().then(()=>{C({title:"当前用户权限",dangerouslyUseHTMLString:!0,message:s.permissions.map(t=>`<p>${t}</p>`).join("")})})}function r(t){window.open(t,"_blank")}return(t,o)=>{const l=M,i=g("ElButton"),_=u,p=f;return x(),j("div",null,[n(_,{title:"Mock",content:"通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档"},{default:e(()=>[n(i,{onClick:o[0]||(o[0]=v=>r("http://mockjs.com/"))},{icon:e(()=>[n(l,{name:"i-ep:link"})]),default:e(()=>[o[1]||(o[1]=a(" Mock.js 官网 "))]),_:1})]),_:1}),n(p,null,{default:e(()=>[n(i,{onClick:m},{default:e(()=>o[2]||(o[2]=[a(" 测试：获取用户权限 ")])),_:1})]),_:1})])}}});typeof c=="function"&&c(P);export{P as default};
