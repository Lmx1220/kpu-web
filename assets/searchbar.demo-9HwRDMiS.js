
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as I,r as F,B as k,o as $,c as D,j as l,w as e,f as t,D as i,p as m,t as j,M,_ as O,L as N,G as s,O as C}from"./index-D4b_dGnp.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-DOArMO_u.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-CWUnK7Ve.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S=I({name:"ComponentExampleSearchbar",__name:"searchbar.demo",setup(G){const d=F({name:"",department_id:"",department_job_id:"",role_id:"",check1:!0,check2:!1});function B(g){M({message:g?"收起":"展开"})}return(g,a)=>{const z=R,y=k("ElInput"),n=k("ElFormItem"),p=k("ElCol"),V=k("ElRow"),u=k("ElOption"),b=k("ElSelect"),v=k("ElCheckbox"),U=O,_=k("ElButton"),E=k("ElForm"),w=P,x=N;return $(),D("div",null,[l(z,{title:"搜索面板",content:"SearchBar"}),l(x,null,{default:e(()=>[l(w,null,{default:e(({fold:r})=>[l(E,{model:t(d),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(p,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[0]||(a[0]=o=>t(d).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(p,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[1]||(a[1]=o=>t(d).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[2]||(a[2]=o=>t(d).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[3]||(a[3]=o=>t(d).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),i(l(V,null,{default:e(()=>[l(p,{span:24},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(v,{value:!0},{default:e(()=>a[30]||(a[30]=[m(" 备选项 ")])),_:1}),l(v,{value:!1},{default:e(()=>a[31]||(a[31]=[m(" 备选项 ")])),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),l(n,null,{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[32]||(a[32]=m(" 筛选 "))]),_:1}),l(_,null,{default:e(()=>a[33]||(a[33]=[m("导出")])),_:1}),l(_,{type:"primary",link:""},{default:e(()=>a[34]||(a[34]=[m(" 查看已导出记录 ")])),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(x,{title:"默认展开"},{default:e(()=>[l(w,{fold:!1},{default:e(({fold:r})=>[l(E,{model:t(d),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(p,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[4]||(a[4]=o=>t(d).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(p,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[5]||(a[5]=o=>t(d).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[6]||(a[6]=o=>t(d).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[7]||(a[7]=o=>t(d).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),i(l(V,null,{default:e(()=>[l(p,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:t(d).check1,"onUpdate:modelValue":a[8]||(a[8]=o=>t(d).check1=o)},{default:e(()=>a[35]||(a[35]=[m(" 备选项 ")])),_:1},8,["modelValue"]),l(v,{modelValue:t(d).check2,"onUpdate:modelValue":a[9]||(a[9]=o=>t(d).check2=o)},{default:e(()=>a[36]||(a[36]=[m(" 备选项 ")])),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),l(n,null,{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[37]||(a[37]=m(" 筛选 "))]),_:1}),l(_,null,{default:e(()=>a[38]||(a[38]=[m("导出")])),_:1}),l(_,{type:"primary",link:""},{default:e(()=>a[39]||(a[39]=[m(" 查看已导出记录 ")])),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(x,{title:"显示背景"},{default:e(()=>[l(w,{background:""},{default:e(({fold:r})=>[l(E,{model:t(d),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(p,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[10]||(a[10]=o=>t(d).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(p,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[11]||(a[11]=o=>t(d).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[12]||(a[12]=o=>t(d).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[13]||(a[13]=o=>t(d).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),i(l(V,null,{default:e(()=>[l(p,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{value:!0},{default:e(()=>a[40]||(a[40]=[m(" 备选项 ")])),_:1}),l(v,{value:!1},{default:e(()=>a[41]||(a[41]=[m(" 备选项 ")])),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),l(n,null,{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[42]||(a[42]=m(" 筛选 "))]),_:1}),l(_,null,{default:e(()=>a[43]||(a[43]=[m("导出")])),_:1}),l(_,{type:"primary",link:""},{default:e(()=>a[44]||(a[44]=[m(" 查看已导出记录 ")])),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(x,{title:"切换事件"},{default:e(()=>[l(w,{onToggle:B},{default:e(({fold:r})=>[l(E,{model:t(d),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(p,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[14]||(a[14]=o=>t(d).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(p,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[15]||(a[15]=o=>t(d).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[16]||(a[16]=o=>t(d).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(p,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[17]||(a[17]=o=>t(d).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),i(l(V,null,{default:e(()=>[l(p,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{value:!0},{default:e(()=>a[45]||(a[45]=[m(" 备选项 ")])),_:1}),l(v,{value:!1},{default:e(()=>a[46]||(a[46]=[m(" 备选项 ")])),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!r]]),l(n,null,{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[47]||(a[47]=m(" 筛选 "))]),_:1}),l(_,null,{default:e(()=>a[48]||(a[48]=[m("导出")])),_:1}),l(_,{type:"primary",link:""},{default:e(()=>a[49]||(a[49]=[m(" 查看已导出记录 ")])),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(x,{title:"自定义切换按钮（搭配自定义 grid 布局）"},{default:e(()=>[l(w,{"show-toggle":!1},{default:e(({fold:r,toggle:o})=>[l(E,{model:t(d),size:"default","label-width":"120px",inline:"",class:"search-form"},{default:e(()=>[l(n,{label:"姓名 / 手机号",class:"search-form-item-name"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[18]||(a[18]=f=>t(d).name=f),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1}),i(l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[19]||(a[19]=f=>t(d).department_id=f),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!r]]),i(l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[20]||(a[20]=f=>t(d).department_job_id=f),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!r]]),i(l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[21]||(a[21]=f=>t(d).role_id=f),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!r]]),i(l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:t(d).check1,"onUpdate:modelValue":a[22]||(a[22]=f=>t(d).check1=f)},{default:e(()=>a[50]||(a[50]=[m(" 备选项 ")])),_:1},8,["modelValue"]),l(v,{modelValue:t(d).check2,"onUpdate:modelValue":a[23]||(a[23]=f=>t(d).check2=f)},{default:e(()=>a[51]||(a[51]=[m(" 备选项 ")])),_:1},8,["modelValue"])]),_:2},1536),[[s,!r]]),l(n,null,{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[52]||(a[52]=m(" 筛选 "))]),_:1}),l(_,{link:"",onClick:o},{icon:e(()=>[l(U,{name:r?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])]),default:e(()=>[m(" "+j(r?"展开":"收起"),1)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["model"])]),_:1})]),_:1}),l(x,{title:"自定义切换按钮（搭配 el-row 组件）"},{default:e(()=>[l(w,{"show-toggle":!1},{default:e(({fold:r,toggle:o})=>[l(E,{model:t(d),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(p,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(y,{modelValue:t(d).name,"onUpdate:modelValue":a[24]||(a[24]=f=>t(d).name=f),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),i(l(p,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(b,{modelValue:t(d).department_id,"onUpdate:modelValue":a[25]||(a[25]=f=>t(d).department_id=f),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!r]]),i(l(p,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(b,{modelValue:t(d).department_job_id,"onUpdate:modelValue":a[26]||(a[26]=f=>t(d).department_job_id=f),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!r]]),i(l(p,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(b,{modelValue:t(d).role_id,"onUpdate:modelValue":a[27]||(a[27]=f=>t(d).role_id=f),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!r]]),i(l(p,{span:6},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:t(d).check1,"onUpdate:modelValue":a[28]||(a[28]=f=>t(d).check1=f)},{default:e(()=>a[53]||(a[53]=[m(" 备选项 ")])),_:1},8,["modelValue"]),l(v,{modelValue:t(d).check2,"onUpdate:modelValue":a[29]||(a[29]=f=>t(d).check2=f)},{default:e(()=>a[54]||(a[54]=[m(" 备选项 ")])),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!r]]),l(p,{span:6,offset:6},{default:e(()=>[l(n,{"label-width":"0",class:"action-box"},{default:e(()=>[l(_,{type:"primary"},{icon:e(()=>[l(U,{name:"i-ep:search"})]),default:e(()=>[a[55]||(a[55]=m(" 筛选 "))]),_:1}),l(_,{link:"",onClick:o},{icon:e(()=>[l(U,{name:r?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])]),default:e(()=>[m(" "+j(r?"展开":"收起"),1)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["model"])]),_:1})]),_:1})])}}});typeof C=="function"&&C(S);const J=T(S,[["__scopeId","data-v-30c7812f"]]);export{J as default};