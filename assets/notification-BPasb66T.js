
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,c as g,h as o,w as e,M as $,o as k,q as m,_ as C,p as P,P as f}from"./index-DI_iSbuB.js";import{_ as x}from"./index.vue_vue_type_script_setup_true_lang-DN1ItRwK.js";import{u as M}from"./notification-B68I0Eki.js";const N=d({name:"PersonalNotification",__name:"notification",setup(B){const i=M();function l(){i.$patch(t=>{t.message+=1})}function u(){i.$patch(t=>{t.message-=t.message>0?1:0})}function p(){i.$patch(t=>{t.todo+=1})}function _(){i.$patch(t=>{t.todo-=t.todo>0?1:0})}return(t,n)=>{const r=x,s=C,a=P,c=$;return k(),g("div",null,[o(r,{title:"通知中心",content:"本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写"}),o(c,{title:"消息"},{default:e(()=>[o(a,{onClick:l},{default:e(()=>[o(s,{name:"i-ep:plus"}),n[0]||(n[0]=m(" 1 "))]),_:1}),o(a,{"ml-2":"",onClick:u},{default:e(()=>[o(s,{name:"i-ep:minus"}),n[1]||(n[1]=m(" 1 "))]),_:1})]),_:1}),o(c,{title:"待办"},{default:e(()=>[o(a,{onClick:p},{default:e(()=>[o(s,{name:"i-ep:plus"}),n[2]||(n[2]=m(" 1 "))]),_:1}),o(a,{"ml-2":"",onClick:_},{default:e(()=>[o(s,{name:"i-ep:minus"}),n[3]||(n[3]=m(" 1 "))]),_:1})]),_:1})])}}});typeof f=="function"&&f(N);export{N as default};
