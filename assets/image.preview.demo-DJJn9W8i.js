
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as h,z as d,D as l,o as g,h as w,w as s,e as b,j as e,G as v,f as _,_ as x,c as k,N as T,Q as m}from"./index-nFO8NRRw.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as y}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";const E={class:"image-slot"},I=h({name:"ImagePreview",__name:"index",props:{src:{},width:{default:200},height:{default:200}},setup(i){const t=i,c=d(()=>typeof t.width=="string"?t.width:`${t.width}px`),p=d(()=>typeof t.height=="string"?t.height:`${t.height}px`);return(n,r)=>{const a=x,o=l("ElImage");return g(),w(o,{src:n.src,fit:"cover",style:v(`width:${_(c)};height:${_(p)};`),"preview-src-list":[n.src],"preview-teleported":""},{error:s(()=>[b("div",E,[e(a,{name:"image-load-fail"})])]),_:1},8,["src","style","preview-src-list"])}}}),N=$(I,[["__scopeId","data-v-bb23448d"]]),S=h({__name:"image.preview.demo",setup(i){const t=[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles",src:"https://kpu-web.github.io/logo.png"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles",src:"https://kpu-web.github.io/logo.png"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles",src:"https://kpu-web.github.io/logo.png"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles",src:"https://kpu-web.github.io/logo.png"}];return(c,p)=>{const n=y,r=N,a=T,o=l("ElTableColumn"),u=l("ElTable");return g(),k("div",null,[e(n,{title:"图片预览",content:"ImagePreview"}),e(a,null,{default:s(()=>[e(r,{src:"https://kpu-web.github.io/logo.png",width:200})]),_:1}),e(a,{title:"图片加载失败时"},{default:s(()=>[e(r,{src:"http://www.baidu.com",width:"100px",height:"100px"})]),_:1}),e(a,{title:"结合 el-table 使用"},{default:s(()=>[e(u,{data:t,style:{width:"100%"}},{default:s(()=>[e(o,{prop:"date",label:"日期",width:"180",fixed:"left"}),e(o,{prop:"name",label:"姓名",width:"180"}),e(o,{prop:"address",label:"地址"}),e(o,{label:"图片"},{default:s(({row:f})=>[e(r,{src:f.src,width:"100px",height:"100px"},null,8,["src"])]),_:1})]),_:1})]),_:1})])}}});typeof m=="function"&&m(S);export{S as default};
