
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as M,aN as H,aO as K,b1 as R,r as d,Z as $,G as E,e as f,o as g,f as k,i as u,h as l,K as U,j as e,w as _,Y as v,O as P,X as S,M as X,t as y,_ as Y,z as Z,U as q}from"./index-RH8yPTKC.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";const Q={class:"icon-picker-dialog-body"},W={class:"icon-label"},ee={class:"name"},le={class:"total"},ne={class:"main-container"},oe={class:"search-bar"},ae={class:"list-icon"},te=["onClick","onMouseover"],se=M({name:"IconPicker",__name:"index",props:H({size:{default:"default"}},{modelValue:{default:""},modelModifiers:{}}),emits:["update:modelValue"],setup(w){const i=K(w,"modelValue"),V=R(),o=d(!1),p=d($.some(r=>r.prefix===i.value.split(":")[0])?i.value.split(":")[0]:$[0].prefix),a=d(""),c=d({page:1,pageSize:29}),m=E(()=>{let r=$.filter(t=>t.prefix===p.value)[0].icons;return a.value&&(r=r.filter(t=>t.includes(a.value))),r}),z=E(()=>m.value.slice((c.value.page-1)*c.value.pageSize,(c.value.page-1)*c.value.pageSize+c.value.pageSize));function x(){c.value.page=1}const s=d(""),I=d(0),h=E(()=>[I.value<18?"top":"bottom",I.value%6>=3?"left":"right"].join("-"));function T(r,t){s.value=r,I.value=t}function B(){s.value="",I.value=0}function N(r){i.value=r,o.value=!1}function D(){i.value="",o.value=!1}return(r,t)=>{const b=Y,L=f("ElTabPane"),j=f("ElTabs"),F=f("ElInput"),O=f("ElPagination"),A=f("ElDialog");return g(),k(P,null,[u("div",{class:U(["icon-picker",{empty:i.value==="",[`icon-picker--${r.size}`]:!0,"is-disabled":e(V).disabled===!0}]),onClick:t[0]||(t[0]=n=>o.value=!0)},[l(b,{name:i.value!==""&&i.value!=null?i.value:"i-ep:plus"},null,8,["name"])],2),l(A,{modelValue:e(o),"onUpdate:modelValue":t[4]||(t[4]=n=>v(o)?o.value=n:null),width:"600px","show-close":!0,"append-to-body":""},{default:_(()=>[u("div",Q,[l(j,{modelValue:e(p),"onUpdate:modelValue":t[1]||(t[1]=n=>v(p)?p.value=n:null),"tab-position":"left",class:"demo-tabs",onTabChange:x},{default:_(()=>[(g(!0),k(P,null,S(e($),n=>(g(),X(L,{key:n.prefix,name:n.prefix},{label:_(()=>[u("div",W,[u("div",ee,y(n.info.name),1),u("div",le,y(n.info.total)+" 个 ",1)])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"]),u("div",ne,[u("div",oe,[l(F,{modelValue:e(a),"onUpdate:modelValue":t[2]||(t[2]=n=>v(a)?a.value=n:null),size:"large",placeholder:"搜索...",clearable:""},{prefix:_(()=>[l(b,{name:"i-ep:search"})]),_:1},8,["modelValue"])]),u("div",ae,[u("span",{class:"empty list-icon-item",onClick:D},[l(b,{name:"i-ep:delete",size:28})]),(g(!0),k(P,null,S(e(z),(n,C)=>(g(),k("span",{key:C,class:"list-icon-item",onClick:G=>N(`${e(p)}:${n}`),onMouseover:G=>T(`${e(p)}:${n}`,C+1),onMouseout:B},[l(b,{name:`${e(p)}:${n}`,size:28},null,8,["name"])],40,te))),128)),u("div",{class:U(["list-icon-preview-item",e(s)&&e(h)])},[l(b,{name:e(s),size:108},null,8,["name"])],2)]),l(O,{"current-page":e(c).page,"onUpdate:currentPage":t[3]||(t[3]=n=>e(c).page=n),layout:"prev, pager, next","page-size":e(c).pageSize,total:e(m).length,"pager-count":5,background:""},null,8,["current-page","page-size","total"])])])]),_:1},8,["modelValue"])],64)}}}),ie=Z(se,[["__scopeId","data-v-675e3474"]]),ue={mb4:""},de=M({name:"ComponentExampleIconpicker",__name:"iconpicker.demo",setup(w){const i=d(""),V=d("ep:success-filled"),o=d("");return(p,a)=>{const c=J,m=ie,z=q,x=f("ElSpace");return g(),k("div",null,[l(c,{title:"图标选择器",content:"IconPicker"}),l(z,null,{default:_(()=>[u("div",ue,[l(m,{modelValue:e(i),"onUpdate:modelValue":a[0]||(a[0]=s=>v(i)?i.value=s:null)},null,8,["modelValue"])]),u("div",null,[l(m,{modelValue:e(V),"onUpdate:modelValue":a[1]||(a[1]=s=>v(V)?V.value=s:null)},null,8,["modelValue"])])]),_:1}),l(z,{title:"尺寸"},{default:_(()=>[l(x,null,{default:_(()=>[l(m,{modelValue:e(o),"onUpdate:modelValue":a[2]||(a[2]=s=>v(o)?o.value=s:null),size:"small"},null,8,["modelValue"]),l(m,{modelValue:e(o),"onUpdate:modelValue":a[3]||(a[3]=s=>v(o)?o.value=s:null)},null,8,["modelValue"]),l(m,{modelValue:e(o),"onUpdate:modelValue":a[4]||(a[4]=s=>v(o)?o.value=s:null),size:"large"},null,8,["modelValue"])]),_:1})]),_:1})])}}});export{de as default};
