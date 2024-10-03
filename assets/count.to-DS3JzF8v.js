
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{k as T,o as D,c as O,t as P,d as $,r as x,C as m,j as i,w as r,e as j,q as c,f as n,_ as I,M as B,P as g}from"./index-BSkZKgnl.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-DpWBfo0M.js";import U from"./alert-C5GvrM1j.js";let F=0;const v="webkit moz ms o".split(" ");let d,p;const M=typeof window>"u";if(M)d=function(){},p=function(){};else{d=window.requestAnimationFrame,p=window.cancelAnimationFrame;let a;for(let e=0;e<v.length&&!(d&&p);e++)a=v[e],d=d||window[a+"RequestAnimationFrame"],p=p||window[a+"CancelAnimationFrame"]||window[a+"CancelRequestAnimationFrame"];(!d||!p)&&(d=function(e){const t=new Date().getTime(),s=Math.max(0,16-(t-F)),u=window.setTimeout(()=>{e(t+s)},s);return F=t+s,u},p=function(e){window.clearTimeout(e)})}const z={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator(a){return a>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default(a,e,t,s){return t*(-Math.pow(2,-10*a/s)+1)*1024/1023+e}}},data(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown(){return this.startVal>this.endVal}},watch:{startVal(){this.autoplay&&this.start()},endVal(){this.autoplay&&this.start()}},mounted(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=d(this.count)},pauseResume(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause(){p(this.rAF)},resume(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,d(this.count)},reset(){this.startTime=null,p(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count(a){this.startTime||(this.startTime=a),this.timestamp=a;const e=a-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.endVal-this.localStartVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=d(this.count):this.$emit("callback")},isNumber(a){return!isNaN(parseFloat(a))},formatNumber(a){a=a.toFixed(this.decimals),a+="";const e=a.split(".");let t=e[0];const s=e.length>1?this.decimal+e[1]:"",u=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;u.test(t);)t=t.replace(u,"$1"+this.separator+"$2");return this.prefix+t+s+this.suffix}},destroyed(){p(this.rAF)}};function H(a,e,t,s,u,w){return D(),O("span",null,P(u.displayValue),1)}const V=T(z,[["render",H]]);function K(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function S(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter(function(u){return Object.getOwnPropertyDescriptor(a,u).enumerable})),t.push.apply(t,s)}return t}V.unmounted=V.destroyed,Reflect.deleteProperty(V,"destroyed");var G=function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?S(Object(t),!0).forEach(function(s){K(a,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):S(Object(t)).forEach(function(s){Object.defineProperty(a,s,Object.getOwnPropertyDescriptor(t,s))})}return a}({name:"CountTo",emits:["callback","mountedCallback"]},V);const J={style:{"margin-bottom":"0"}},E=$({__name:"count.to",setup(a){const e=x(),t=x({startVal:0,endVal:2017,duration:4e3,decimals:0,separator:",",prefix:"¥ ",suffix:" 元"});function s(){e.value.start()}function u(){e.value.pauseResume()}function w(_){window.open(_,"_blank")}return(_,l)=>{const N=m("ElTag"),q=I,b=m("ElButton"),C=R,h=m("ElInputNumber"),f=m("ElFormItem"),y=m("ElInput"),k=m("ElForm"),A=B;return D(),O("div",null,[i(U),i(C,{title:"计数器"},{content:r(()=>[j("p",J,[l[9]||(l[9]=c(" 安装命令：")),i(N,null,{default:r(()=>l[8]||(l[8]=[c("pnpm add vue3-count-to")])),_:1})])]),default:r(()=>[i(b,{onClick:l[0]||(l[0]=o=>w("https://github.com/xiaofan9/vue-count-to"))},{icon:r(()=>[i(q,{name:"i-ep:link"})]),default:r(()=>[l[10]||(l[10]=c(" 访问 vue-count-to "))]),_:1})]),_:1}),i(A,null,{default:r(()=>[i(n(G),{ref_key:"countToRef",ref:e,class:"count-to","start-val":n(t).startVal,"end-val":n(t).endVal,duration:n(t).duration,decimals:n(t).decimals,separator:n(t).separator,prefix:n(t).prefix,suffix:n(t).suffix,autoplay:!1},null,8,["start-val","end-val","duration","decimals","separator","prefix","suffix"]),i(k,{model:n(t),size:"default","label-width":"80px",style:{width:"300px"}},{default:r(()=>[i(f,{label:"startVal"},{default:r(()=>[i(h,{modelValue:n(t).startVal,"onUpdate:modelValue":l[1]||(l[1]=o=>n(t).startVal=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"endVal"},{default:r(()=>[i(h,{modelValue:n(t).endVal,"onUpdate:modelValue":l[2]||(l[2]=o=>n(t).endVal=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"duration"},{default:r(()=>[i(h,{modelValue:n(t).duration,"onUpdate:modelValue":l[3]||(l[3]=o=>n(t).duration=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"decimals"},{default:r(()=>[i(h,{modelValue:n(t).decimals,"onUpdate:modelValue":l[4]||(l[4]=o=>n(t).decimals=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"separator"},{default:r(()=>[i(y,{modelValue:n(t).separator,"onUpdate:modelValue":l[5]||(l[5]=o=>n(t).separator=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"prefix"},{default:r(()=>[i(y,{modelValue:n(t).prefix,"onUpdate:modelValue":l[6]||(l[6]=o=>n(t).prefix=o)},null,8,["modelValue"])]),_:1}),i(f,{label:"suffix"},{default:r(()=>[i(y,{modelValue:n(t).suffix,"onUpdate:modelValue":l[7]||(l[7]=o=>n(t).suffix=o)},null,8,["modelValue"])]),_:1}),i(f,null,{default:r(()=>[i(b,{type:"primary",onClick:s},{default:r(()=>l[11]||(l[11]=[c(" 开始 ")])),_:1}),i(b,{onClick:u},{default:r(()=>l[12]||(l[12]=[c(" 暂停 ")])),_:1})]),_:1})]),_:1},8,["model"])]),_:1})])}}});typeof g=="function"&&g(E);const X=T(E,[["__scopeId","data-v-24b01b4e"]]);export{X as default};
