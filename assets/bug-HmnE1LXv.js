
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as $,b as B,r as V,A as L,G as s,W as N,o as l,c as r,j as t,w as n,t as i,f as m,e as f,v as _,I as D,a2 as H,_ as I,O as j}from"./index-fOXGxjjY.js";import{_ as M}from"./index.vue_vue_type_script_setup_true_lang-B6BWcwhA.js";const O={key:0},P={key:0},A={style:{"white-space":"pre-wrap"}},G=["title"],J={key:1},W={key:1},K=$({__name:"bug",setup(q){const v="production",k=B(),p=V(""),b=L(()=>p.value?[JSON.parse(p.value)]:[]);function g(c){switch(H(()=>{p.value=sessionStorage.getItem("errorLog")||""}),c){case 1:a=abc;break;case 2:testMethod();break}}function h(c){window.open(c,"_blank")}return(c,o)=>{const E=I,u=s("ElButton"),y=M,w=s("ElTag"),d=s("ElTableColumn"),C=s("ElLink"),T=s("ElTable"),S=j,x=N("timeago");return l(),r("div",null,[t(y,{title:"错误日志",content:"错误日志通过 Vue 提供的全局错误钩子 errorHandler 进行拦截，如果需要上报给后端，需自行实现"},{default:n(()=>[t(u,{onClick:o[0]||(o[0]=e=>h("https://cn.vuejs.org/api/application.html#app-config-errorhandler"))},{icon:n(()=>[t(E,{name:"i-ep:link"})]),default:n(()=>[i(" Vue errorHandler 说明 ")]),_:1})]),_:1}),t(S,null,{default:n(()=>[m(v)!=="development"?(l(),r("div",O,[m(k).settings.app.enableErrorLog?(l(),r("div",P,[t(u,{type:"danger",onClick:o[1]||(o[1]=e=>g(1))},{default:n(()=>[i(" 模拟触发错误1 ")]),_:1}),t(u,{type:"danger",onClick:o[2]||(o[2]=e=>g(2))},{default:n(()=>[i(" 模拟触发错误2 ")]),_:1}),t(T,{data:m(b),border:""},{default:n(()=>[t(d,{label:"错误信息",width:"200",align:"center"},{default:n(({row:e})=>[f("div",null,_(e.err.message),1),t(w,{type:"danger"},{default:n(()=>[i(_(e.info),1)]),_:2},1024)]),_:1}),t(d,{label:"错误详情"},{default:n(({row:e})=>[f("div",A,_(e.err.stack),1)]),_:1}),t(d,{label:"错误链接",width:"200",align:"center"},{default:n(({row:e})=>[t(C,{href:e.url,target:"_blank"},{default:n(()=>[i(_(e.url),1)]),_:2},1032,["href"])]),_:1}),t(d,{label:"时间",prop:"datetime",width:"200",align:"center"},{default:n(({row:e})=>[D(f("span",{title:e.datetime},null,8,G),[[x,e.datetime]])]),_:1})]),_:1},8,["data"])])):(l(),r("div",J," 请到 /src/settings.ts 里打开错误日志功能，再进入该页面查看演示 "))])):(l(),r("div",W," 当前为开发环境，该功能关闭演示 "))]),_:1})])}}});export{K as default};
