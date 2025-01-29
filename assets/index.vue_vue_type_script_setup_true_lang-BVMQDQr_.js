
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{c as d}from"./standardModuleExample-XDG-j1S3.js";import{d as h,r as m,aa as x,bE as p,aJ as n,cd as y,U as I,e as l,o as w,a as C,i as f,w as _}from"./bootstrap-CKvMAU9X.js";var s=(o=>(o.ADD="add",o.COPY="copy",o.DELETE="delete",o.EDIT="edit",o.VIEW="view",o))(s||{});const W=h({__name:"index",props:{id:{default:""},type:{default:s.VIEW}},setup(o,{expose:v}){const a=o,e=m({loading:!1,form:{id:a.id,title:""},rules:{title:[{required:!0,message:"请输入",trigger:"blur"}]}}),u=m();x(()=>{e.value.form.id!==""&&c()});function c(){e.value.loading=!0,d.detail(e.value.form.id).then(t=>{e.value.loading=!1,e.value.form=t})}return v({submit(t){var r;(r=u.value)==null||r.validate(i=>{i&&(a.type===s.ADD?d.save(e.value.form).then(()=>{p.success({message:"新增成功",center:!0}),t&&t()}):a.type===s.EDIT?d.update(e.value.form).then(()=>{p.success({message:"编辑成功",center:!0}),t&&t()}):t&&t(!1))})}}),(t,r)=>{const i=n("el-input"),g=n("el-form-item"),D=n("el-form"),E=y("loading");return I((w(),C("div",null,[f(D,{ref_key:"form",ref:u,model:l(e).form,rules:l(e).rules,"label-width":"120px","label-suffix":"："},{default:_(()=>[f(g,{label:"标题",prop:"title"},{default:_(()=>[f(i,{modelValue:l(e).form.title,"onUpdate:modelValue":r[0]||(r[0]=V=>l(e).form.title=V),disabled:t.type===l(s).VIEW,placeholder:"请输入"},null,8,["modelValue","disabled"])]),_:1})]),_:1},8,["model","rules"])])),[[E,l(e).loading]])}}});export{s as A,W as _};
