"use strict";(self["webpackChunkproject_vue"]=self["webpackChunkproject_vue"]||[]).push([[729],{8789:function(e,t,i){i.r(t),i.d(t,{default:function(){return G}});var s=i(3694),a=i(6190),r=i(9582),n=i(4886),c=i(266),o=i(5151),d=i(4324),l=i(1713),m=i(2540),u=function(){var e=this,t=e._self._c;return t("div",[t(m.Z,{staticClass:"d-flex justify-space-between align-center"},[t("h3",[e._v("Marchandises")])]),t(s.Z,{attrs:{dense:"",type:"info",color:"#757575"}},[e._v(" Cette partie contient toutes fonctions sur les affaires d'achat, de ravitaillement des marchandises ")]),t(l.Z,[t(c.Z,{attrs:{lg:"12",cols:"12"}},[t(l.Z,[e.editStockItem?t(l.Z,[t(c.Z,{staticClass:"mt-10",attrs:{cols:"12"}},[t(r.Z,[t("edit_stock_item",{attrs:{info_stock_item:e.infoStockMerchandise,prop_merchandises:e.merchandises},on:{"event-setting-hide-edit-stock-form":e.setEditStockItem}})],1)],1)],1):e._e(),t(c.Z,{attrs:{cols:"2"}},[t(a.Z,{attrs:{color:"#ffff"},on:{click:function(t){e.addNewStockItem=!e.addNewStockItem,e.get_stock_merchandise()}}},[e.addNewStockItem?t("span",[e._v("Liste des stocks")]):t("span",[e._v("Ravitailler Stock")])])],1),t(l.Z,[t(r.Z,{staticClass:"rounded-lg ml-4 mb-10",attrs:{elevation:"2"}},[t(n.EB,[e._v("Stock")]),t(n.ZB,{},[e.addNewStockItem?t("new_stock",{attrs:{prop_merchandises:e.merchandises}}):t(o.Z,{staticClass:"elevation-1",attrs:{headers:e.header_stocks,items:e.stock_merchandises,"items-per-page":5},scopedSlots:e._u([{key:"item.actions",fn:function({item:i}){return[t(d.Z,{attrs:{small:"",color:"purple"},on:{click:function(t){return e.edit_stock_merchandise_Item(i)}}},[e._v(" mdi-pencil ")]),t(d.Z,{staticClass:"mr-2",attrs:{small:"",color:"red"},on:{click:function(t){return t.stopPropagation(),e.deleteMerchandiseStockItem(i)}}},[e._v(" mdi-delete ")])]}}])})],1)],1)],1)],1)],1),t(c.Z,{attrs:{lg:"12",cols:"12"}},[t(l.Z,[e.editNewMerchandise?t(l.Z,[t(c.Z,{staticClass:"mt-10",attrs:{cols:"12"}},[t(r.Z,[t("edit_merchandise",{attrs:{info_merchandise:e.infoMerchandise},on:{"event-setting-hide-edit-merch-form":e.setEditNewMerchandise}})],1)],1)],1):e._e(),t(c.Z,{attrs:{cols:"2"}},[t(a.Z,{attrs:{color:"#ffff"},on:{click:function(t){e.addNewMerchandise=!e.addNewMerchandise,e.get_merchandise()}}},[e.addNewMerchandise?t("span",[e._v("Liste des biens")]):t("span",[e._v("Ajouter bien")])])],1),t(r.Z,{staticClass:"rounded-lg ml-2",attrs:{elevation:"2"}},[t(n.EB,[e._v("Biens")]),t(n.ZB,[e.addNewMerchandise?t("new_merchandise"):t(o.Z,{staticClass:"elevation-1",attrs:{headers:e.header_merchandises,items:e.merchandises,"items-per-page":5},scopedSlots:e._u([{key:"item.actions",fn:function({item:i}){return[t(d.Z,{attrs:{small:"",color:"purple"},on:{click:function(t){e.edit_merchandise_Item(i)}}},[e._v("mdi-pencil ")]),t(d.Z,{attrs:{small:"",color:"red"},on:{click:function(t){e.deleteMerchandiseItem(i)}}},[e._v(" mdi-delete ")])]}}])})],1)],1)],1)],1)],1)],1)},h=[],_=i(9730),p=i(7808),f=function(){var e=this,t=e._self._c;return t("div",[t("form",{attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.submit_merchandise()}}},[t(p.Z,{attrs:{counter:255,required:"",label:"Name"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),t(p.Z,{attrs:{label:"description",required:"",counter:255},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),t(_.Z,{attrs:{items:e.items_categorie,label:"Catégorie"},model:{value:e.categorie,callback:function(t){e.categorie=t},expression:"categorie"}}),t(a.Z,{staticClass:"mr-4 center",attrs:{type:"submit"}},[e._v(" Enregistrer ")])],1)])},b=[],k=i(9669),v=i.n(k),y={name:"new_merchandise",data:()=>({title:"",description:"",categorie:"",items_categorie:["Voitures","Matelas","Vetements","Autres"]}),methods:{async submit_merchandise(){try{const e=new FormData;e.append("title",this.title),e.append("description",this.description),e.append("categorie",this.categorie);await v().post("merchandise/create",e);alert("Bien "+this.title+" ajouté avec succès")}catch(e){alert(e)}}}},Z=y,g=i(1001),x=(0,g.Z)(Z,f,b,!1,null,null,null),w=x.exports,M=function(){var e=this,t=e._self._c;return t("div",[t("form",{attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.submit_stock()}}},[t(_.Z,{attrs:{items:e.merchandises_title,label:"Bien à stocker"},model:{value:e.title_merchandise,callback:function(t){e.title_merchandise=t},expression:"title_merchandise"}}),t(p.Z,{attrs:{label:"Description",required:"",counter:255},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),t(p.Z,{attrs:{type:"date",label:"Date",required:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),t(p.Z,{attrs:{label:"Prix unitaire ($)",required:"",type:"number"},model:{value:e.pu_by,callback:function(t){e.pu_by=t},expression:"pu_by"}}),t(p.Z,{attrs:{type:"number",label:"Nbre d'unités"},model:{value:e.amount_by,callback:function(t){e.amount_by=t},expression:"amount_by"}}),t(p.Z,{attrs:{type:"number",label:"Reduction reçue lors de l'achat"},model:{value:e.decrease,callback:function(t){e.decrease=t},expression:"decrease"}}),t(_.Z,{attrs:{items:e.items_salers,label:"Fournisseur",required:""},model:{value:e.saler,callback:function(t){e.saler=t},expression:"saler"}}),t(s.Z,{attrs:{dense:"",type:"info",color:"#717175"}},[e._v(" Le prix total avec reduction incluse vaut "+e._s(e.pu_by*e.amount_by-e.decrease)+" ")]),t(a.Z,{staticClass:"mr-4 center",attrs:{type:"submit"},on:{click:function(t){return e.findIdMerchandise()}}},[e._v(" Enregistrer ")])],1)])},I=[],S={name:"new_stock",props:["prop_merchandises"],data:()=>({title_merchandise:"",id_merchandise:"",description:"",date:"",decrease:"",pu_by:"",saler:"",merchandises_id:[],merchandises_title:[],amount_by:"",items_salers:["Dodoma","flexi","compfy","Kampala","Dubai","Japon","Toyota","Kenya"]}),mounted(){this.prop_merchandises.forEach((e=>{this.merchandises_title.push(e.title)}))},methods:{findIdMerchandise(){this.prop_merchandises.forEach((e=>{e.title==this.title_merchandise&&(this.id_merchandise=e.id)}))},async submit_stock(){try{if(""!=this.id_merchandise){const e=new FormData;e.append("id_merchandise",this.id_merchandise),e.append("pu_by",this.pu_by),e.append("decrease",this.decrease),e.append("amount_by",this.amount_by),e.append("created_at",this.date),e.append("description",this.description),e.append("saler",this.saler);const t=await v().post("stock_merchandise/create",e);alert(t.data.amount_by+" de "+this.title_merchandise+" achété(s) avec succès")}else alert("Veuillez compléter le formulaire comme il se doit, surtout ne pas oublier de selectionner un bien!")}catch(e){alert(e)}}}},C=S,E=(0,g.Z)(C,M,I,!1,null,null,null),N=E.exports,D=i(9256),F=i(5125),B=function(){var e=this,t=e._self._c;return t("div",[t(F.Z,{on:{submit:function(t){return t.preventDefault(),e.editInfoMerchandise()}}},[t(D.Z,[t("h4",[e._v("Edit item "),t("small",[e._v(e._s(e.id))])]),t(l.Z,[t(p.Z,{attrs:{cols:"12",md:"4",counter:255,required:"",label:"Libellé"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}},[e._v(e._s(e.title)+" ")]),t(p.Z,{attrs:{label:"description",required:"",counter:255},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}},[e._v(" "+e._s(e.description)+" ")]),t(_.Z,{attrs:{items:e.items_categorie,label:"Catégorie"},model:{value:e.categorie,callback:function(t){e.categorie=t},expression:"categorie"}}),t(l.Z,[t(c.Z,[t(a.Z,{staticClass:"d-flex justify-start",attrs:{type:"submit"}},[e._v(" Edit ")])],1),t(c.Z,{staticClass:"mb-2"},[t(a.Z,{staticClass:"d-flex justify-end",on:{click:function(t){return e.emitForHideEditForm()}}},[e._v(" Annuler ")])],1)],1)],1)],1)],1)],1)},q=[],j={name:"edit_merchandise",props:["info_merchandise"],data(){return{dialog:!1,id:"",title:"",description:"",categorie:"",items_categorie:["Matelas","Matériels","Consommation Directe","Meubles","Vetements","Documents"]}},mounted(){this.title=this.info_merchandise.title,this.id=this.info_merchandise.id,this.description=this.info_merchandise.description,this.categorie=this.info_merchandise.categorie},methods:{emitForHideEditForm(){this.$emit("event-setting-hide-edit-merch-form",{editStockItem:!1})},async editInfoMerchandise(){try{const e=new FormData;e.append("title",this.title),e.append("description",this.description),e.append("categorie",this.categorie);const t=await v().post("merchandise/edit/"+this.id,e);alert("Bien "+t.data.title+" edité avec succès"),this.emitForHideEditForm()}catch(e){alert(e)}}}},V=j,H=(0,g.Z)(V,B,q,!1,null,null,null),L=H.exports,P=function(){var e=this,t=e._self._c;return t("div",[t(D.Z,[t("h4",[e._v("Editer stock record "),t("small",[e._v(e._s(e.id_stock))])]),t(l.Z,[t(F.Z,{attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.function_edit_stock_item()}}},[t(_.Z,{attrs:{items:e.merchandises_title,label:"Bien à stocker"},model:{value:e.title_merchandise,callback:function(t){e.title_merchandise=t},expression:"title_merchandise"}}),t(p.Z,{attrs:{type:"date",label:"Date",required:""},model:{value:e.created_at,callback:function(t){e.created_at=t},expression:"created_at"}}),t(p.Z,{attrs:{label:"Prix unitaire ($)",required:"",type:"number"},model:{value:e.pu_by,callback:function(t){e.pu_by=t},expression:"pu_by"}}),t(p.Z,{attrs:{type:"number",step:"any",label:"Nbre d'unités"},model:{value:e.amount_by,callback:function(t){e.amount_by=t},expression:"amount_by"}}),t(p.Z,{attrs:{type:"number",step:"any",label:"Reduction reçue lors de l'achat"},model:{value:e.decrease,callback:function(t){e.decrease=t},expression:"decrease"}}),t(_.Z,{attrs:{items:e.items_salers,label:"Fournisseur",required:""},model:{value:e.saler,callback:function(t){e.saler=t},expression:"saler"}}),t(s.Z,{attrs:{dense:"",type:"info",color:"#717175"}},[e._v(" Le prix total avec reduction incluse vaut "+e._s(Number(e.pu_by*e.amount_by-e.decrease).toFixed(3))+" ")]),t(l.Z,[t(c.Z,[t(a.Z,{staticClass:"d-flex justify-start",attrs:{type:"submit"},on:{click:function(t){return e.findIdMerchandise()}}},[e._v(" Edit ")])],1),t(c.Z,{staticClass:"mb-2"},[t(a.Z,{staticClass:"d-flex justify-end",on:{click:function(t){return e.emitForHideEditForm()}}},[e._v(" Annuler ")])],1)],1)],1)],1)],1)],1)},z=[],A={name:"edit_stock_item",props:["info_stock_item","prop_merchandises"],data(){return{title_merchandise:"",id_merchandise:"",id_stock:"",created_at:"",decrease:"",pu_by:"",saler:"",merchandises_id:[],merchandises_title:[],amount_by:"",items_salers:["Bralima","Shalina","Dar-salem","Kivu Busness"]}},mounted(){this.created_at=this.info_stock_item.created_at,this.title_merchandise=this.info_stock_item.title,this.amount_by=this.info_stock_item.amount_by,this.pu_by=this.info_stock_item.pu_by,this.decrease=this.info_stock_item.decrease,this.id_merchandise=this.info_stock_item.id_merchandise,this.description=this.info_stock_item.description,this.saler=this.info_stock_item.saler,this.id_stock=this.info_stock_item.id_stock,this.prop_merchandises.forEach((e=>{this.merchandises_title.push(e.title)}))},methods:{async function_edit_stock_item(){try{if(""!=this.id_merchandise){const e=new FormData;e.append("id_merchandise",this.id_merchandise),e.append("pu_by",this.pu_by),e.append("decrease",this.decrease),e.append("amount_by",this.amount_by),e.append("created_at",this.created_at),e.append("saler",this.saler),e.append("id_stock",this.id_stock);await v().post("stock_merchandise/edit/"+this.id_stock,e);alert("Stockage de l'item "+this.id_stock+" édité avec succès"),this.emitForHideEditForm()}else alert("Veuillez compléter le formulaire comme il se doit, surtout ne pas oublier de selectionner un bien!")}catch(e){alert(e)}},findIdMerchandise(){this.prop_merchandises.forEach((e=>{e.title==this.title_merchandise&&(this.id_merchandise=e.id)}))},emitForHideEditForm(){this.$emit("event-setting-hide-edit-stock-form",{editStockItem:!1})}}},R=A,$=(0,g.Z)(R,P,z,!1,null,null,null),K=$.exports,T={name:"Dashboard",components:{new_merchandise:w,new_stock:N,edit_merchandise:L,edit_stock_item:K},data:()=>({dialog:!1,addNewMerchandise:!1,addNewStockItem:!1,editNewMerchandise:!1,editStockItem:!1,infoMerchandise:"",infoStockMerchandise:"",header_merchandises:[{text:"id",align:"start",sortable:!0,value:"id"},{text:"Libéllé",value:"title"},{text:"Categorie",value:"categorie"},{text:"Description",value:"description"},{text:"Date",value:"created_at"},{text:"action",value:"actions"}],merchandises:[],stock_merchandises:[],header_stocks:[{text:"id_stock",align:"start",sortable:!0,value:"id_stock"},{text:"Bien",value:"title"},{text:"Pu",value:"pu_by"},{text:"Qté",value:"amount_by"},{text:"Reduction",value:"decrease"},{text:"Prix Total",value:"total_price"},{text:"Date Enreg",value:"created_at"},{text:"fournisseur",value:"saler"},{text:"actions",value:"actions"}]}),methods:{async get_merchandise(){try{const e=await v().post("merchandise/");this.merchandises=e.data}catch(e){alert(e)}},async get_stock_merchandise(){try{const e=await v().post("stock_merchandise/");this.stock_merchandises=e.data}catch(e){alert(e)}},async deleteMerchandiseItem(e){try{if(confirm("Voulez vous supprimer l'item "+e.id)){await v().post("merchandise/delete/"+e.id);this.get_merchandise(),alert("Suppression réussie")}}catch(t){alert("Il y a une erreur. Il est imposible de supprimer un bien présent en stock!")}},async deleteMerchandiseStockItem(e){try{if(confirm("Voulez vous supprimer l'enregistrement de l'achat "+e.id_stock)){await v().post("stock_merchandise/delete/"+e.id_stock);this.get_stock_merchandise(),alert("Suppression réussie")}}catch(t){alert("Il y a une erreur est survenue!")}},edit_merchandise_Item(e){this.infoMerchandise=e,this.editNewMerchandise=!this.editNewMerchandise},edit_stock_merchandise_Item(e){this.infoStockMerchandise=e,this.editStockItem=!this.editStockItem},setEditNewMerchandise(e){this.editNewMerchandise=e.editNewMerchandise,this.get_merchandise()},setEditStockItem(e){this.editStockItem=e.editStockItem,this.get_stock_merchandise()}},created(){this.get_merchandise(),this.get_stock_merchandise()}},J=T,Q=(0,g.Z)(J,u,h,!1,null,null,null),G=Q.exports}}]);
//# sourceMappingURL=729.a5809363.js.map