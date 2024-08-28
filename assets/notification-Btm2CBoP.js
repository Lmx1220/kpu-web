
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,c as d,j as o,w as n,O as g,o as $,t as i,_ as k,s as h,R as m}from"./index-fOXGxjjY.js";import{_ as C}from"./index.vue_vue_type_script_setup_true_lang-B6BWcwhA.js";import{u as P}from"./notification-B5ab9XxL.js";const x=r({name:"PersonalNotification",__name:"notification",setup(N){const e=P();function _(){e.$patch(t=>{t.message+=1})}function f(){e.$patch(t=>{t.message-=t.message>0?1:0})}function l(){e.$patch(t=>{t.todo+=1})}function u(){e.$patch(t=>{t.todo-=t.todo>0?1:0})}return(t,B)=>{const p=C,a=k,s=h,c=g;return $(),d("div",null,[o(p,{title:"通知中心",content:"本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写"}),o(c,{title:"消息"},{default:n(()=>[o(s,{onClick:_},{default:n(()=>[o(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),o(s,{"ml-2":"",onClick:f},{default:n(()=>[o(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1}),o(c,{title:"待办"},{default:n(()=>[o(s,{onClick:l},{default:n(()=>[o(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),o(s,{"ml-2":"",onClick:u},{default:n(()=>[o(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(x);export{x as default};
