
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index-T4VrS35i.js";import{d as w,u as B,i as E,j as M,r as S,I as l,o as $,c as z,h as e,w as t,q as i,b as _,L,_ as N,M as T}from"./index-BWACZs8a.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-C0-eEszm.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-CEGlVd7T.js";import{u as j}from"./useTabbar-CX4O3h5r.js";const H=w({name:"StandardModuleExampleEdit",__name:"detail",setup(q){const m=B(),o=E(),c=M(),p=j(),u=S();function d(){var s;(s=u.value)==null||s.submit(()=>{L.emit("get-data-list"),a()})}function f(){a()}function a(){m.settings.tabbar.enable&&m.settings.tabbar.mergeTabsBy!=="activeMenu"?p.close({name:"standardModuleExampleList"}):c.push({name:"standardModuleExampleList"})}return(s,n)=>{const b=N,r=l("el-button"),g=R,x=l("el-col"),k=l("el-row"),y=T,C=v;return $(),z("div",null,[e(g,{title:_(o).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[n[0]||(n[0]=i(" 返回 "))]),_:1})]),_:1},8,["title"]),e(y,null,{default:t(()=>[e(k,null,{default:t(()=>[e(x,{md:24,lg:16},{default:t(()=>[e(V,{id:_(o).params.id,ref_key:"form",ref:u,type:_(o).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:d},{default:t(()=>n[1]||(n[1]=[i(" 提交 ")])),_:1}),e(r,{size:"large",onClick:f},{default:t(()=>n[2]||(n[2]=[i(" 取消 ")])),_:1})]),_:1})])}}});export{H as default};
