
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as f,r as c,ay as d,aw as m,aH as _,o as s,f as g,w as l,h as C,L as k,a as p,F as v,k as x,M as h,e as B}from"./bootstrap-BssOdyNs.js";const E=f({__name:"auto-height-demo",setup(w){const r=c([]),[u,n]=d({onCancel(){n.close()},onConfirm(){m.info("onConfirm",{position:"top-center"})},onOpenChange(t){t&&i(10)}});function i(t){n.setState({loading:!0}),setTimeout(()=>{r.value=Array.from({length:t},(e,o)=>o+1),n.setState({loading:!1})},2e3)}return(t,e)=>{const o=_("ElButton");return s(),g(B(u),{title:"自动计算高度","title-tooltip":"标题提示内容"},{"prepend-footer":l(()=>[C(o,{link:"",onClick:e[0]||(e[0]=a=>i(6))},{default:l(()=>e[1]||(e[1]=[k(" 点击更新数据 ")])),_:1})]),default:l(()=>[(s(!0),p(v,null,x(r.value,a=>(s(),p("div",{key:a,class:"h-[220px] w-full flex-center bg-zinc-100 even:bg-zinc-200"},h(a),1))),128))]),_:1})}}});export{E as _};
