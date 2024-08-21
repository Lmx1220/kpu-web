
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as y}from"./index-XcPFUhcH.js";import{d as C,c as h,u as w,a as B,r as E,e as r,o as S,f as z,h as e,w as t,q as l,j as _,U as M,_ as N,V as T,z as V}from"./index-D6ceO_Rb.js";import{_ as $}from"./index.vue_vue_type_script_setup_true_lang-bcVZrhLq.js";import{D}from"./index-CyJDoTHp.js";import{u as L}from"./useTabbar-BPuGGY7H.js";const R=C({name:"StandardModuleExampleEdit",__name:"detail",setup(j){const c=h(),a=w(),m=B(),u=L(),i=E();function d(){var n;(n=i.value)==null||n.submit(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){c.settings.tabbar.enable&&c.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"standardModuleExampleList"}):m.push({name:"standardModuleExampleList"})}return(n,q)=>{const f=N,s=r("el-button"),b=$,g=r("el-col"),x=r("el-row"),k=T,v=y;return S(),z("div",null,[e(b,{title:_(a).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(s,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"ep:arrow-left"})]),default:t(()=>[l(" 返回 ")]),_:1})]),_:1},8,["title"]),e(k,null,{default:t(()=>[e(x,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(a).params.id,ref_key:"form",ref:i,type:_(a).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(s,{type:"primary",size:"large",onClick:d},{default:t(()=>[l(" 提交 ")]),_:1}),e(s,{size:"large",onClick:p},{default:t(()=>[l(" 取消 ")]),_:1})]),_:1})])}}}),H=V(R,[["__scopeId","data-v-02fbd316"]]);export{H as default};
