
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as C}from"./index-aozd6uSs.js";import{d as v,b as w,u as B,a as E,r as M,D as r,o as S,c as h,j as e,w as t,s as l,f as _,M as N,_ as $,N as z}from"./index-nFO8NRRw.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";import{_ as L}from"./index.vue_vue_type_script_setup_true_lang-BGJ1nThW.js";import{u as R}from"./useTabbar-B4O-lyC_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const I=v({name:"StandardModuleExampleEdit",__name:"detail",setup(V){const c=w(),a=B(),m=E(),u=R(),i=M();function p(){var o;(o=i.value)==null||o.submit(()=>{N.emit("get-data-list"),n()})}function d(){n()}function n(){c.settings.tabbar.enable&&c.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"standardModuleExampleList"}):m.push({name:"standardModuleExampleList"})}return(o,j)=>{const f=$,s=r("el-button"),b=T,g=r("el-col"),x=r("el-row"),k=z,y=C;return S(),h("div",null,[e(b,{title:_(a).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(s,{size:"default",round:"",onClick:n},{icon:t(()=>[e(f,{name:"ep:arrow-left"})]),default:t(()=>[l(" 返回 ")]),_:1})]),_:1},8,["title"]),e(k,null,{default:t(()=>[e(x,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:_(a).params.id,ref_key:"form",ref:i,type:_(a).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(y,null,{default:t(()=>[e(s,{type:"primary",size:"large",onClick:p},{default:t(()=>[l(" 提交 ")]),_:1}),e(s,{size:"large",onClick:d},{default:t(()=>[l(" 取消 ")]),_:1})]),_:1})])}}});export{I as default};
