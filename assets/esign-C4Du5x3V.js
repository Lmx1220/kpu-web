
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{z as B,o as x,f as w,d as E,r as p,e as y,h as l,w as d,i as _,q as g,j as f,N as k,a3 as M,y as S,_ as R,U as I,V as b}from"./index-RH8yPTKC.js";import{_ as X}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";import Y from"./alert-DaJw3hSe.js";const N={props:{width:{type:Number,default:800},height:{type:Number,default:300},lineWidth:{type:Number,default:4},lineColor:{type:String,default:"#000000"},bgColor:{type:String,default:""},isCrop:{type:Boolean,default:!1},isClearBgColor:{type:Boolean,default:!0},format:{type:String,default:"image/png"},quality:{type:Number,default:1}},data(){return{hasDrew:!1,resultImg:"",points:[],canvasTxt:null,startX:0,startY:0,isDrawing:!1,sratio:1}},computed:{ratio(){return this.height/this.width},stageInfo(){return this.$refs.canvas.getBoundingClientRect()},myBg(){return this.bgColor?this.bgColor:"rgba(255, 255, 255, 0)"}},watch:{myBg:function(t){this.$refs.canvas.style.background=t}},beforeMount(){window.addEventListener("resize",this.$_resizeHandler)},beforeDestroy(){window.removeEventListener("resize",this.$_resizeHandler)},mounted(){const t=this.$refs.canvas;t.height=this.height,t.width=this.width,t.style.background=this.myBg,this.$_resizeHandler(),document.onmouseup=()=>{this.isDrawing=!1}},methods:{$_resizeHandler(){const t=this.$refs.canvas;t.style.width=this.width+"px";const e=parseFloat(window.getComputedStyle(t).width);t.style.height=this.ratio*e+"px",this.canvasTxt=t.getContext("2d"),this.canvasTxt.scale(1*this.sratio,1*this.sratio),this.sratio=e/this.width,this.canvasTxt.scale(1/this.sratio,1/this.sratio)},mouseDown(t){t=t||event,t.preventDefault(),this.isDrawing=!0,this.hasDrew=!0;let e={x:t.offsetX,y:t.offsetY};this.drawStart(e)},mouseMove(t){if(t=t||event,t.preventDefault(),this.isDrawing){let e={x:t.offsetX,y:t.offsetY};this.drawMove(e)}},mouseUp(t){t=t||event,t.preventDefault();let e={x:t.offsetX,y:t.offsetY};this.drawEnd(e),this.isDrawing=!1},touchStart(t){if(t=t||event,t.preventDefault(),this.hasDrew=!0,t.touches.length===1){let e={x:t.targetTouches[0].clientX-this.$refs.canvas.getBoundingClientRect().left,y:t.targetTouches[0].clientY-this.$refs.canvas.getBoundingClientRect().top};this.drawStart(e)}},touchMove(t){if(t=t||event,t.preventDefault(),t.touches.length===1){let e={x:t.targetTouches[0].clientX-this.$refs.canvas.getBoundingClientRect().left,y:t.targetTouches[0].clientY-this.$refs.canvas.getBoundingClientRect().top};this.drawMove(e)}},touchEnd(t){if(t=t||event,t.preventDefault(),t.touches.length===1){let e={x:t.targetTouches[0].clientX-this.$refs.canvas.getBoundingClientRect().left,y:t.targetTouches[0].clientY-this.$refs.canvas.getBoundingClientRect().top};this.drawEnd(e)}},drawStart(t){this.startX=t.x,this.startY=t.y,this.canvasTxt.beginPath(),this.canvasTxt.moveTo(this.startX,this.startY),this.canvasTxt.lineTo(t.x,t.y),this.canvasTxt.lineCap="round",this.canvasTxt.lineJoin="round",this.canvasTxt.lineWidth=this.lineWidth*this.sratio,this.canvasTxt.stroke(),this.canvasTxt.closePath(),this.points.push(t)},drawMove(t){this.canvasTxt.beginPath(),this.canvasTxt.moveTo(this.startX,this.startY),this.canvasTxt.lineTo(t.x,t.y),this.canvasTxt.strokeStyle=this.lineColor,this.canvasTxt.lineWidth=this.lineWidth*this.sratio,this.canvasTxt.lineCap="round",this.canvasTxt.lineJoin="round",this.canvasTxt.stroke(),this.canvasTxt.closePath(),this.startY=t.y,this.startX=t.x,this.points.push(t)},drawEnd(t){this.canvasTxt.beginPath(),this.canvasTxt.moveTo(this.startX,this.startY),this.canvasTxt.lineTo(t.x,t.y),this.canvasTxt.lineCap="round",this.canvasTxt.lineJoin="round",this.canvasTxt.stroke(),this.canvasTxt.closePath(),this.points.push(t),this.points.push({x:-1,y:-1})},generate(t){let e=t&&t.format?t.format:this.format,n=t&&t.quality?t.quality:this.quality;return new Promise((c,s)=>{if(!this.hasDrew){s("Warning: Not Signned!");return}var a=this.canvasTxt.getImageData(0,0,this.$refs.canvas.width,this.$refs.canvas.height);this.canvasTxt.globalCompositeOperation="destination-over",this.canvasTxt.fillStyle=this.myBg,this.canvasTxt.fillRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height),this.resultImg=this.$refs.canvas.toDataURL(e,n);var u=this.resultImg;if(this.canvasTxt.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height),this.canvasTxt.putImageData(a,0,0),this.canvasTxt.globalCompositeOperation="source-over",this.isCrop){const o=this.getCropArea(a.data);var i=document.createElement("canvas");const h=i.getContext("2d");i.width=o[2]-o[0],i.height=o[3]-o[1];const v=this.canvasTxt.getImageData(...o);h.globalCompositeOperation="destination-over",h.putImageData(v,0,0),h.fillStyle=this.myBg,h.fillRect(0,0,i.width,i.height),u=i.toDataURL(e,n),i=null}c(u)})},reset(){this.canvasTxt.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height),this.isClearBgColor&&(this.$emit("update:bgColor",""),this.$refs.canvas.style.background="rgba(255, 255, 255, 0)"),this.points=[],this.hasDrew=!1,this.resultImg=""},getCropArea(t){for(var e=this.$refs.canvas.width,n=0,r=this.$refs.canvas.height,c=0,s=0;s<this.$refs.canvas.width;s++)for(var a=0;a<this.$refs.canvas.height;a++){var u=(s+this.$refs.canvas.width*a)*4;(t[u]>0||t[u+1]>0||t[u+2]||t[u+3]>0)&&(c=Math.max(a,c),n=Math.max(s,n),r=Math.min(a,r),e=Math.min(s,e))}return e++,n++,r++,c++,[e,r,n,c]}}};function P(t,e,n,r,c,s){return x(),w("canvas",{ref:"canvas",onMousedown:e[0]||(e[0]=(...a)=>s.mouseDown&&s.mouseDown(...a)),onMousemove:e[1]||(e[1]=(...a)=>s.mouseMove&&s.mouseMove(...a)),onMouseup:e[2]||(e[2]=(...a)=>s.mouseUp&&s.mouseUp(...a)),onTouchstart:e[3]||(e[3]=(...a)=>s.touchStart&&s.touchStart(...a)),onTouchmove:e[4]||(e[4]=(...a)=>s.touchMove&&s.touchMove(...a)),onTouchend:e[5]||(e[5]=(...a)=>s.touchEnd&&s.touchEnd(...a))},null,544)}const T=B(N,[["render",P],["__scopeId","data-v-1fcc7cb1"]]);T.install=function(t){this.installed||(this.installed=!0,t.component("vueEsign",T))};const W={style:{"margin-bottom":"0"}},z=["src"],U=E({name:"ComponentExampleSignCanvas",__name:"esign",setup(t){const e=p(),n=p({lineWidth:6,lineColor:"#000000",bgColor:"#f0f0f0",isCrop:!1}),r=p("");function c(){e.value.reset(),M(()=>{n.value.bgColor="#f0f0f0"})}function s(){e.value.generate().then(i=>{r.value=i}).catch(()=>{S("画板为空，无法生成图片")})}function a(){e.value.generate().then(i=>{const o=new Image;o.setAttribute("crossOrigin","anonymous"),o.onload=()=>{const h=document.createElement("a"),v=new MouseEvent("click");h.download=Date.parse(new Date().toString()).toString(),h.href=o.src,h.dispatchEvent(v)},o.src=i})}function u(i){window.open(i,"_blank")}return(i,o)=>{const h=y("ElTag"),v=R,m=y("ElButton"),D=X,$=I;return x(),w("div",null,[l(Y),l(D,{title:"电子签名"},{content:d(()=>[_("p",W,[g(" 安装命令："),l(h,null,{default:d(()=>[g("pnpm add vue-esign")]),_:1})])]),default:d(()=>[l(m,{onClick:o[0]||(o[0]=C=>u("https://github.com/JaimeCheng/vue-esign"))},{icon:d(()=>[l(v,{name:"i-ep:link"})]),default:d(()=>[g(" 访问 vue-esign ")]),_:1})]),_:1}),l($,null,{default:d(()=>[l(f(T),{ref_key:"esignRef",ref:e,bgColor:f(n).bgColor,"onUpdate:bgColor":o[1]||(o[1]=C=>f(n).bgColor=C),width:500,height:300,"is-crop":f(n).isCrop,"line-width":f(n).lineWidth,"line-color":f(n).lineColor},null,8,["bgColor","is-crop","line-width","line-color"]),_("div",null,[l(m,{onClick:c},{default:d(()=>[g(" 清空画板 ")]),_:1}),l(m,{onClick:s},{default:d(()=>[g(" 生成图片 ")]),_:1}),l(m,{onClick:a},{default:d(()=>[g(" 下载图片 ")]),_:1})]),f(r)?(x(),w("img",{key:0,src:f(r),width:500,height:300},null,8,z)):k("",!0)]),_:1})])}}});typeof b=="function"&&b(U);export{U as default};
