
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as f,b as u,e as d,o as k,f as g,h as e,w as n,q as c,bd as x,_ as C,U as M,V as i}from"./index-4WfM3T31.js";import{_ as $}from"./index.vue_vue_type_script_setup_true_lang-BldwxBJD.js";const b=f({__name:"index",setup(j){const t=u();function _(){t.getPermissions().then(()=>{x({title:"当前用户权限",dangerouslyUseHTMLString:!0,message:t.permissions.map(o=>`<p>${o}</p>`).join("")})})}function m(o){window.open(o,"_blank")}return(o,s)=>{const r=C,a=d("ElButton"),l=$,p=M;return k(),g("div",null,[e(l,{title:"Mock",content:"通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档"},{default:n(()=>[e(a,{onClick:s[0]||(s[0]=v=>m("http://mockjs.com/"))},{icon:n(()=>[e(r,{name:"i-ep:link"})]),default:n(()=>[c(" Mock.js 官网 ")]),_:1})]),_:1}),e(p,null,{default:n(()=>[e(a,{onClick:_},{default:n(()=>[c(" 测试：获取用户权限 ")]),_:1})]),_:1})])}}});typeof i=="function"&&i(b);export{b as default};
