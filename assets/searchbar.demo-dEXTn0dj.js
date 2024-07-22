
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as z,r as B,e as c,o as I,f as F,h as l,w as e,j as d,k as i,q as m,t as g,y as $,_ as D,U as M,v as s,z as N,V as j}from"./index-RH8yPTKC.js";import{_ as O}from"./index.vue_vue_type_script_setup_true_lang-CsjkSR36.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";const C=z({name:"ComponentExampleSearchbar",__name:"searchbar.demo",setup(R){const a=B({name:"",department_id:"",department_job_id:"",role_id:"",check1:!0,check2:!1});function h(x){$({message:x?"收起":"展开"})}return(x,t)=>{const S=P,U=c("ElInput"),n=c("ElFormItem"),_=c("ElCol"),V=c("ElRow"),u=c("ElOption"),f=c("ElSelect"),v=c("ElCheckbox"),k=D,b=c("ElButton"),y=c("ElForm"),E=O,w=M;return I(),F("div",null,[l(S,{title:"搜索面板",content:"SearchBar"}),l(w,null,{default:e(()=>[l(E,null,{default:e(({fold:p})=>[l(y,{model:d(a),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(_,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[0]||(t[0]=o=>d(a).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(_,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[1]||(t[1]=o=>d(a).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[2]||(t[2]=o=>d(a).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[3]||(t[3]=o=>d(a).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),i(l(V,null,{default:e(()=>[l(_,{span:24},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(v,{value:!0},{default:e(()=>[m(" 备选项 ")]),_:1}),l(v,{value:!1},{default:e(()=>[m(" 备选项 ")]),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),l(n,null,{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,null,{default:e(()=>[m("导出")]),_:1}),l(b,{type:"primary",link:""},{default:e(()=>[m(" 查看已导出记录 ")]),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(w,{title:"默认展开"},{default:e(()=>[l(E,{fold:!1},{default:e(({fold:p})=>[l(y,{model:d(a),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(_,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[4]||(t[4]=o=>d(a).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(_,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[5]||(t[5]=o=>d(a).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[6]||(t[6]=o=>d(a).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[7]||(t[7]=o=>d(a).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),i(l(V,null,{default:e(()=>[l(_,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:d(a).check1,"onUpdate:modelValue":t[8]||(t[8]=o=>d(a).check1=o)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"]),l(v,{modelValue:d(a).check2,"onUpdate:modelValue":t[9]||(t[9]=o=>d(a).check2=o)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),l(n,null,{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,null,{default:e(()=>[m("导出")]),_:1}),l(b,{type:"primary",link:""},{default:e(()=>[m(" 查看已导出记录 ")]),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(w,{title:"显示背景"},{default:e(()=>[l(E,{background:""},{default:e(({fold:p})=>[l(y,{model:d(a),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(_,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[10]||(t[10]=o=>d(a).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(_,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[11]||(t[11]=o=>d(a).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[12]||(t[12]=o=>d(a).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[13]||(t[13]=o=>d(a).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),i(l(V,null,{default:e(()=>[l(_,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{value:!0},{default:e(()=>[m(" 备选项 ")]),_:1}),l(v,{value:!1},{default:e(()=>[m(" 备选项 ")]),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),l(n,null,{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,null,{default:e(()=>[m("导出")]),_:1}),l(b,{type:"primary",link:""},{default:e(()=>[m(" 查看已导出记录 ")]),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(w,{title:"切换事件"},{default:e(()=>[l(E,{onToggle:h},{default:e(({fold:p})=>[l(y,{model:d(a),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(_,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[14]||(t[14]=o=>d(a).name=o),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),i(l(V,null,{default:e(()=>[l(_,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[15]||(t[15]=o=>d(a).department_id=o),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[16]||(t[16]=o=>d(a).department_job_id=o),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(_,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[17]||(t[17]=o=>d(a).role_id=o),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),i(l(V,null,{default:e(()=>[l(_,{span:24},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{value:!0},{default:e(()=>[m(" 备选项 ")]),_:1}),l(v,{value:!1},{default:e(()=>[m(" 备选项 ")]),_:1})]),_:1})]),_:1})]),_:2},1536),[[s,!p]]),l(n,null,{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,null,{default:e(()=>[m("导出")]),_:1}),l(b,{type:"primary",link:""},{default:e(()=>[m(" 查看已导出记录 ")]),_:1})]),_:1})]),_:2},1032,["model"])]),_:1})]),_:1}),l(w,{title:"自定义切换按钮（搭配自定义 grid 布局）"},{default:e(()=>[l(E,{"show-toggle":!1},{default:e(({fold:p,toggle:o})=>[l(y,{model:d(a),size:"default","label-width":"120px",inline:"",class:"search-form"},{default:e(()=>[l(n,{label:"姓名 / 手机号",class:"search-form-item-name"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[18]||(t[18]=r=>d(a).name=r),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1}),i(l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[19]||(t[19]=r=>d(a).department_id=r),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!p]]),i(l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[20]||(t[20]=r=>d(a).department_job_id=r),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!p]]),i(l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[21]||(t[21]=r=>d(a).role_id=r),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:2},1536),[[s,!p]]),i(l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:d(a).check1,"onUpdate:modelValue":t[22]||(t[22]=r=>d(a).check1=r)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"]),l(v,{modelValue:d(a).check2,"onUpdate:modelValue":t[23]||(t[23]=r=>d(a).check2=r)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"])]),_:2},1536),[[s,!p]]),l(n,null,{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,{link:"",onClick:o},{icon:e(()=>[l(k,{name:p?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])]),default:e(()=>[m(" "+g(p?"展开":"收起"),1)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["model"])]),_:1})]),_:1}),l(w,{title:"自定义切换按钮（搭配 el-row 组件）"},{default:e(()=>[l(E,{"show-toggle":!1},{default:e(({fold:p,toggle:o})=>[l(y,{model:d(a),size:"default","label-width":"120px"},{default:e(()=>[l(V,null,{default:e(()=>[l(_,{span:12},{default:e(()=>[l(n,{label:"姓名 / 手机号"},{default:e(()=>[l(U,{modelValue:d(a).name,"onUpdate:modelValue":t[24]||(t[24]=r=>d(a).name=r),placeholder:"请输入姓名或者手机号，支持模糊查询",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),i(l(_,{span:6},{default:e(()=>[l(n,{label:"部门"},{default:e(()=>[l(f,{modelValue:d(a).department_id,"onUpdate:modelValue":t[25]||(t[25]=r=>d(a).department_id=r),clearable:"",placeholder:"请选择部门"},{default:e(()=>[l(u,{label:"技术部",value:1}),l(u,{label:"设计部",value:2}),l(u,{label:"行政部",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!p]]),i(l(_,{span:6},{default:e(()=>[l(n,{label:"职位"},{default:e(()=>[l(f,{modelValue:d(a).department_job_id,"onUpdate:modelValue":t[26]||(t[26]=r=>d(a).department_job_id=r),clearable:"",placeholder:"请选择职位"},{default:e(()=>[l(u,{label:"程序员",value:1}),l(u,{label:"设计师",value:2}),l(u,{label:"人事",value:3})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!p]]),i(l(_,{span:6},{default:e(()=>[l(n,{label:"角色"},{default:e(()=>[l(f,{modelValue:d(a).role_id,"onUpdate:modelValue":t[27]||(t[27]=r=>d(a).role_id=r),clearable:"",placeholder:"请选择角色"},{default:e(()=>[l(u,{label:"主管",value:1}),l(u,{label:"普通职员",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!p]]),i(l(_,{span:6},{default:e(()=>[l(n,{label:"复选框"},{default:e(()=>[l(v,{modelValue:d(a).check1,"onUpdate:modelValue":t[28]||(t[28]=r=>d(a).check1=r)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"]),l(v,{modelValue:d(a).check2,"onUpdate:modelValue":t[29]||(t[29]=r=>d(a).check2=r)},{default:e(()=>[m(" 备选项 ")]),_:1},8,["modelValue"])]),_:1})]),_:2},1536),[[s,!p]]),l(_,{span:6,offset:6},{default:e(()=>[l(n,{"label-width":"0",class:"action-box"},{default:e(()=>[l(b,{type:"primary"},{icon:e(()=>[l(k,{name:"i-ep:search"})]),default:e(()=>[m(" 筛选 ")]),_:1}),l(b,{link:"",onClick:o},{icon:e(()=>[l(k,{name:p?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])]),default:e(()=>[m(" "+g(p?"展开":"收起"),1)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["model"])]),_:1})]),_:1})])}}});typeof j=="function"&&j(C);const A=N(C,[["__scopeId","data-v-d741692e"]]);export{A as default};
