
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,bd as I,be as N,r as P,an as U,z as y,N as r,C as m,o as f,c as M,j as n,w as t,q as u,e as c,f as o,h as A,Z as F,i as S,_ as T,M as j,P as _}from"./index-BSkZKgnl.js";import{_ as q}from"./index.vue_vue_type_script_setup_true_lang-DpWBfo0M.js";const z=x({__name:"vueuse",setup(D){function d(){r.success({message:"恭喜你，这是一条成功消息"})}const k=I(()=>{d()},1e3),C=N(()=>{d()},1e3),s=P(""),{text:V,copy:b,copied:v,isSupported:g}=U();y(v,l=>{l&&r.success(`复制成功：${V.value}`)});function B(l){window.open(l,"_blank")}return(l,e)=>{const E=T,a=m("ElButton"),$=q,i=j,w=m("ElInput");return f(),M("div",null,[n($,{title:"VueUse",content:"VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。"},{default:t(()=>[n(a,{onClick:e[0]||(e[0]=p=>B("https://vueuse.org/"))},{icon:t(()=>[n(E,{name:"i-ep:link"})]),default:t(()=>[e[3]||(e[3]=u(" VueUse 官网 "))]),_:1})]),_:1}),n(i,{title:"防抖：debounce"},{default:t(()=>[e[5]||(e[5]=c("p",{class:"mt-0"}," 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 ",-1)),n(a,{onClick:o(k)},{default:t(()=>e[4]||(e[4]=[u(" 连续点击我，只会执行最后一次点击事件 ")])),_:1},8,["onClick"])]),_:1}),n(i,{title:"节流：throttle"},{default:t(()=>[e[7]||(e[7]=c("p",{class:"mt-0"}," 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 ",-1)),n(a,{onClick:o(C)},{default:t(()=>e[6]||(e[6]=[u(" 连续点击我，每一秒只会执行一次点击事件 ")])),_:1},8,["onClick"])]),_:1}),o(g)?(f(),A(i,{key:0,title:"复制：clipboard"},{default:t(()=>[n(w,{modelValue:o(s),"onUpdate:modelValue":e[2]||(e[2]=p=>F(s)?s.value=p:null),placeholder:"输入内容，并点击复制按钮"},{append:t(()=>[n(a,{onClick:e[1]||(e[1]=p=>o(b)(o(s)))},{default:t(()=>e[8]||(e[8]=[u(" 复制 ")])),_:1})]),_:1},8,["modelValue"])]),_:1})):S("",!0)])}}});typeof _=="function"&&_(z);export{z as default};
