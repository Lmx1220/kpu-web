
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as u,O as f,I as d,o as k,c as g,h as o,w as e,q as a,bh as x,_ as M,M as C,P as c}from"./index-DSYfRqq8.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-CtMictQB.js";const $=u({__name:"index",setup(j){const s=f();function m(){s.getPermissions().then(()=>{x({title:"当前用户权限",dangerouslyUseHTMLString:!0,message:s.permissions.map(t=>`<p>${t}</p>`).join("")})})}function r(t){window.open(t,"_blank")}return(t,n)=>{const l=M,i=d("ElButton"),_=P,p=C;return k(),g("div",null,[o(_,{title:"Mock",content:"通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档"},{default:e(()=>[o(i,{onClick:n[0]||(n[0]=v=>r("http://mockjs.com/"))},{icon:e(()=>[o(l,{name:"i-ep:link"})]),default:e(()=>[n[1]||(n[1]=a(" Mock.js 官网 "))]),_:1})]),_:1}),o(p,null,{default:e(()=>[o(i,{onClick:m},{default:e(()=>n[2]||(n[2]=[a(" 测试：获取用户权限 ")])),_:1})]),_:1})])}}});typeof c=="function"&&c($);export{$ as default};
