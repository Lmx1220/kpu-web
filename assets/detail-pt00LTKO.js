
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as y}from"./index-qjMtdEMa.js";import{d as C,b as w,u as B,a as E,r as S,G as l,o as h,c as M,j as e,w as t,t as r,f as _,N,_ as z,O as T,l as $}from"./index-D8CVJ9uq.js";import{_ as D}from"./index.vue_vue_type_script_setup_true_lang-CwqCei2-.js";import{D as L}from"./index-BUYojNSu.js";import{u as R}from"./useTabbar-BT8Tbh1A.js";const V=C({name:"StandardModuleExampleEdit",__name:"detail",setup(j){const c=w(),a=B(),m=E(),u=R(),i=S();function d(){var n;(n=i.value)==null||n.submit(()=>{N.emit("get-data-list"),o()})}function p(){o()}function o(){c.settings.tabbar.enable&&c.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"standardModuleExampleList"}):m.push({name:"standardModuleExampleList"})}return(n,F)=>{const f=z,s=l("el-button"),b=D,g=l("el-col"),x=l("el-row"),k=T,v=y;return h(),M("div",null,[e(b,{title:_(a).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(s,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"ep:arrow-left"})]),default:t(()=>[r(" 返回 ")]),_:1})]),_:1},8,["title"]),e(k,null,{default:t(()=>[e(x,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:_(a).params.id,ref_key:"form",ref:i,type:_(a).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(s,{type:"primary",size:"large",onClick:d},{default:t(()=>[r(" 提交 ")]),_:1}),e(s,{size:"large",onClick:p},{default:t(()=>[r(" 取消 ")]),_:1})]),_:1})])}}}),H=$(V,[["__scopeId","data-v-02fbd316"]]);export{H as default};
