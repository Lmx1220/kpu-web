
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{bg as o,bh as u,d as P,r as g,l as V,M as D,B as p,b7 as I,D as S,f as s,o as b,c as w,j as c,w as h}from"./index-vu1a6MAo.js";const l="standardModuleExample",a="mock",n={Page:{url:`${a}/${l}/page`,method:o.POST},Save:{url:`${a}/${l}`,method:o.POST},Update:{url:`${a}/${l}`,method:o.PUT},Delete:{url:`${a}/${l}`,method:o.DELETE},Query:{url:`${a}/${l}/query`,method:o.POST},Detail:{url:`${a}/${l}/detail`,method:o.GET}};function M(e){return u.request({...n.Page,params:e})}function O(e){return u.request({...n.Save,params:e})}function U(e){return u.request({...n.Update,params:e})}function C(e){return u.request({...n.Delete,params:e})}function B(e){return u.request({...n.Query,params:e})}function L(e){return u.request({...n.Detail,params:{id:e}})}const v={page:M,save:O,update:U,remove:C,query:B,detail:L};var i=(e=>(e.ADD="add",e.COPY="copy",e.DELETE="delete",e.EDIT="edit",e.VIEW="view",e))(i||{});const Q=P({__name:"index",props:{id:{default:""},type:{default:i.VIEW}},setup(e,{expose:E}){const f=e,t=g({loading:!1,form:{id:f.id,title:""},rules:{title:[{required:!0,message:"请输入",trigger:"blur"}]}}),_=g();V(()=>{t.value.form.id!==""&&$()});function $(){t.value.loading=!0,v.detail(t.value.form.id).then(r=>{t.value.loading=!1,t.value.form=r})}return E({submit(r){var d;(d=_.value)==null||d.validate(m=>{m&&(f.type===i.ADD?v.save(t.value.form).then(()=>{D.success({message:"新增成功",center:!0}),r&&r()}):f.type===i.EDIT?v.update(t.value.form).then(()=>{D.success({message:"编辑成功",center:!0}),r&&r()}):r&&r(!1))})}}),(r,d)=>{const m=p("el-input"),q=p("el-form-item"),y=p("el-form"),T=I("loading");return S((b(),w("div",null,[c(y,{ref_key:"form",ref:_,model:s(t).form,rules:s(t).rules,"label-width":"120px","label-suffix":"："},{default:h(()=>[c(q,{label:"标题",prop:"title"},{default:h(()=>[c(m,{modelValue:s(t).form.title,"onUpdate:modelValue":d[0]||(d[0]=x=>s(t).form.title=x),disabled:r.type===s(i).VIEW,placeholder:"请输入"},null,8,["modelValue","disabled"])]),_:1})]),_:1},8,["model","rules"])])),[[T,s(t).loading]])}}});export{i as A,Q as _,v as c};
