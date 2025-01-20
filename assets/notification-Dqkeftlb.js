
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as g,b as k,j as o,w as e,L as m,o as C,x as l,_ as P,Q as c}from"./index-putfknEa.js";import{u as x}from"./notification-CocAFAjU.js";const $=g({name:"PersonalNotification",__name:"notification",setup(B){const i=x();function f(){i.$patch(t=>{t.message+=1})}function p(){i.$patch(t=>{t.message-=t.message>0?1:0})}function r(){i.$patch(t=>{t.todo+=1})}function d(){i.$patch(t=>{t.todo-=t.todo>0?1:0})}return(t,n)=>{const _=m("PageHeader"),s=P,a=m("HButton"),u=m("PageMain");return C(),k("div",null,[o(_,{title:"通知中心",content:"本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写"}),o(u,{title:"消息"},{default:e(()=>[o(a,{onClick:f},{default:e(()=>[o(s,{name:"i-ep:plus"}),n[0]||(n[0]=l(" 1 "))]),_:1}),o(a,{"ml-2":"",onClick:p},{default:e(()=>[o(s,{name:"i-ep:minus"}),n[1]||(n[1]=l(" 1 "))]),_:1})]),_:1}),o(u,{title:"待办"},{default:e(()=>[o(a,{onClick:r},{default:e(()=>[o(s,{name:"i-ep:plus"}),n[2]||(n[2]=l(" 1 "))]),_:1}),o(a,{"ml-2":"",onClick:d},{default:e(()=>[o(s,{name:"i-ep:minus"}),n[3]||(n[3]=l(" 1 "))]),_:1})]),_:1})])}}});typeof c=="function"&&c($);export{$ as default};
