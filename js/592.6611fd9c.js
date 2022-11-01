"use strict";(self["webpackChunkproject_vue"]=self["webpackChunkproject_vue"]||[]).push([[592],{8592:function(t,e,s){s.r(e),s.d(e,{default:function(){return F}});var i=s(3694),n=s(3423),l=s(6190),a=s(9582),o=s(4886),r=s(266),c=s(1713),u=s(2540),d=s(7678),h=s(6669),g=(0,d.Z)(h.Z).extend({name:"v-timeline",provide(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes(){return{"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse,...this.themeClasses}}},render(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}}),m=s(2240),v=s(6878);const p=(0,d.Z)(v.Z,h.Z);var f=p.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon(){return!!this.icon||!!this.$slots.icon}},methods:{genBody(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon(){return this.$slots.icon?this.$slots.icon:this.$createElement(m.Z,{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot(){const t=this.setBackgroundColor(this.color);return this.$createElement("div",{staticClass:"v-timeline-item__inner-dot",...t},[this.hasIcon&&this.genIcon()])},genDot(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider(){const t=[];return this.hideDot||t.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},t)},genOpposite(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render(t){const e=[this.genBody(),this.genDivider()];return this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:{"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right,...this.themeClasses}},e)}}),_=function(){var t=this,e=t._self._c;return e("div",{staticClass:"dashboard"},[e(u.Z,{staticClass:"d-flex justify-space-between align-center"},[e("h3",[t._v("Dashboard")]),e(l.Z,{attrs:{color:"#ffff",link:"",to:"/merchandise"}},[t._v(" Voir Details ")])],1),e(c.Z,[e(r.Z,{attrs:{lg:"6",cols:"12"}},[e(i.Z,{attrs:{dense:"",type:"success",color:"#0091EA"}},[t._v(" Connexion réussie avec succès "),e("strong",[t._v("Bon travail")]),t._v(" ! ")]),e(c.Z,t._l(t.specificResult,(function(s,i){return e(r.Z,{key:i,attrs:{lg:"4",cols:"12"}},[e(a.Z,{staticClass:"rounded-lg",attrs:{elevation:"4"}},[e(o.ZB,{staticClass:"d-flex justify-space-between align-center"},[e("div",{staticClass:"inline"},[e("strong",[t._v(t._s(s.title))]),e("small",[t._v(" (2 dernières semaines)")])]),e(n.Z,{attrs:{color:s.color,size:"60"}},[e("span",{},[t._v(t._s(s.amounts))])])],1)],1)],1)})),1)],1),e(r.Z,{attrs:{lg:"6",cols:"12"}},[e(a.Z,[e(o.EB,[t._v("Biens auquels sont liés les activités")]),e(g,{attrs:{dense:""}},t._l(t.DetailsItems,(function(s){return e(f,{key:s.id},[e("span",{attrs:{slot:"opposite"},slot:"opposite"},[t._v("item.title")]),e(a.Z,{staticClass:"elevation-2"},[e(o.EB,{staticClass:"text-h5"},[t._v(" "+t._s(s.categorie)+" ")]),e(o.ZB,[t._v(" "+t._s(s.description)+" ")])],1)],1)})),1)],1)],1)],1)],1)},y=[],C=s(6546),D=s(9669),Z=s.n(D),B={name:"Dashboard",components:{alert:C.Z},data:()=>({specificResult:[],generalResult:[],created_at:(new Date).toJSON().slice(0,10).replace(/-/g,"-"),DetailsItems:[]}),methods:{async getDashboardanalysis(){try{const e=await Z().post("lineInvoice/dashboardanalysis/"+this.getDate());var t=e.data;this.specificResult=[{title:"Total de produits achétés",color:"#FD00FFFF",amounts:t.totalAmountby.totalAmountBought+" Units"},{title:"Total de produits Vendus",color:"#FF8800FF",amounts:t.totalAmountSold.totalAmountSold+" Units"},{title:"Le plus grand résulat réalisé",color:"#00B8FFFF",amounts:t.highSoldAchieved.result+" $ "},{title:"Différence entre les achats et les ventes",color:"#00FF69DE",amounts:t.getResultInvoices[1].result+" $ "}],this.DetailsItems=t.DetailsItems}catch(e){console.log(e)}},getDate(){var t=12096e5,e=new Date((new Date).getTime()-t),s=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();return s}},created(){this.getDashboardanalysis(),this.getDate()}},$=B,b=s(1001),j=(0,b.Z)($,_,y,!1,null,null,null),F=j.exports},1713:function(t,e,s){s(1884);var i=s(144),n=s(1767),l=s(5352);const a=["sm","md","lg","xl"],o=["start","end","center"];function r(t,e){return a.reduce(((s,i)=>(s[t+(0,l.jC)(i)]=e(),s)),{})}const c=t=>[...o,"baseline","stretch"].includes(t),u=r("align",(()=>({type:String,default:null,validator:c}))),d=t=>[...o,"space-between","space-around"].includes(t),h=r("justify",(()=>({type:String,default:null,validator:d}))),g=t=>[...o,"space-between","space-around","stretch"].includes(t),m=r("alignContent",(()=>({type:String,default:null,validator:g}))),v={align:Object.keys(u),justify:Object.keys(h),alignContent:Object.keys(m)},p={align:"align",justify:"justify",alignContent:"align-content"};function f(t,e,s){let i=p[t];if(null!=s){if(e){const s=e.replace(t,"");i+=`-${s}`}return i+=`-${s}`,i.toLowerCase()}}const _=new Map;e["Z"]=i["default"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...u,justify:{type:String,default:null,validator:d},...h,alignContent:{type:String,default:null,validator:g},...m},render(t,{props:e,data:s,children:i}){let l="";for(const n in e)l+=String(e[n]);let a=_.get(l);if(!a){let t;for(t in a=[],v)v[t].forEach((s=>{const i=e[s],n=f(t,s,i);n&&a.push(n)}));a.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),_.set(l,a)}return t(e.tag,(0,n.ZP)(s,{staticClass:"row",class:a}),i)}})},2540:function(t,e,s){s.d(e,{Z:function(){return l}});var i=s(6669),n=s(7678),l=(0,n.Z)(i.Z).extend({name:"v-subheader",props:{inset:Boolean},render(t){return t("div",{staticClass:"v-subheader",class:{"v-subheader--inset":this.inset,...this.themeClasses},attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);
//# sourceMappingURL=592.6611fd9c.js.map