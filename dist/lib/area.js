/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-03-31
 * Time: 09:49:11
 * Contact: 55342775@qq.com
 */

(function(e,t){typeof define=="function"&&define.amd?define(["zepto","dialog"],t):typeof exports=="object"?module.exports=t():e.MobileSelectArea=t(window.Zepto||window.jQuery||$)})(this,function(e,t){var n=function(){var e=Math.random().toString().replace(".","");this.id="scroller_"+e,this.scroller,this.data,this.index=0,this.value=[0,0,0],this.oldvalue,this.text=["","",""],this.level=3,this.mtop=30,this.separator=" "};return n.prototype={init:function(t){this.settings=e.extend({},t),this.trigger=e(this.settings.trigger),level=parseInt(this.settings.level),this.level=level>0?level:3,this.trigger.attr("readonly","readonly"),this.value=this.settings.value&&this.settings.value.split(",")||[0,0,0],this.text=this.settings.text||this.trigger.val().split(" ")||["","",""],this.oldvalue=this.value.concat([]),this.clientHeight=document.documentElement.clientHeight||document.body.clientHeight,this.clientWidth=document.documentElement.clientWidth||document.body.clientWidth,this.getData(),this.bindEvent()},getData:function(){var t=this;typeof this.settings.data=="object"?this.data=this.settings.data.data:e.ajax({dataType:"json",cache:!0,url:this.settings.data,type:"GET",success:function(e){t.data=e.data},accepts:{json:"application/json, text/javascript, */*; q=0.01"}})},bindEvent:function(){var t=this;this.trigger.tap(function(n){var r="";for(var i=0;i<t.level;i++)i==t.level-1?r+='<div style="width:'+Math.floor(2/(t.level+1)*100)+'%;"></div>':r+='<div style="width:'+Math.floor(1/(t.level+1)*100)+'%;"></div>';e.confirm('<div class="ui-scroller-mask"><div id="'+t.id+'" class="ui-scroller">'+r+"<p></p></div></div>",null,function(e,n){e=="yes"&&t.submit(),(e="no")&&t.cancel(),this.dispose()},{clientHeight:t.clientHeight,clientWidth:t.clientWidth}),t.scroller=e("#"+t.id),t.format();var s=0,o=0;return t.scroller.children().bind("touchstart",function(e){s=e.changedTouches[0].pageY}),t.scroller.children().bind("touchmove",function(t){o=t.changedTouches[0].pageY;var n=o-s,r=e(t.target).parent();if(r[0].nodeName!="DL")return;var i=parseInt(r.css("top")||0)+n;return r.css("top",i),s=o,!1}),t.scroller.children().bind("touchend",function(n){o=n.changedTouches[0].pageY;var r=o-s,i=e(n.target).parent();if(i[0].nodeName!="DL")return;var u=e(i.parent()).index(),a=parseInt(i.css("top")||0)+r;a>t.mtop&&(a=t.mtop),a<-e(i).height()+60&&(a=-e(i).height()+60);var f=a/t.mtop,l=Math.round(f),c=Math.abs(l)+1;l==1&&(c=0),t.value[u]=e(i.children().get(c)).attr("ref"),t.value[u]==0?t.text[u]="":t.text[u]=e(i.children().get(c)).html();for(var h=t.level-1;h>u;h--)t.value[h]=0,t.text[h]="";return e(i.children().get(c)).hasClass("focus")||t.format(),e(i.children().get(c)).addClass("focus").siblings().removeClass("focus"),i.css("top",l*t.mtop),!1}),!1})},format:function(){var e=this,t=e.scroller.children();this.f(this.data)},f:function(t){var n=this,r=t;r||(r=[]);var i='<dl><dd ref="0">——</dd>',s=0,o,u=n.mtop;if(n.index!==0&&n.value[n.index-1]=="0")i='<dl><dd ref="0" class="focus">——</dd>',n.value[n.index]=0,n.text[n.index]="",s=0;else{n.value[n.index]=="0"&&(i='<dl><dd ref="0" class="focus">——</dd>',s=0);for(var a=0,f=r.length;a<f;a++){var l=r[a].pid||0,c=r[a].id||0,h="";n.value[n.index]==c&&(h="focus",s=c,o=r[a].child,u=n.mtop*-a),i+='<dd pid="'+l+'" class="'+h+'" ref="'+c+'">'+(r[a].region_name||r[a].region_message)+"</dd>"}}i+="</dl>";var p=e(i);p.css("top",u);var d=n.scroller.children();e(d[n.index]).html(p),n.index++;if(n.index>n.level-1){n.index=0;return}n.f(o)},submit:function(){this.oldvalue=this.value.concat([]),this.trigger[0].nodeType==1&&(this.trigger.val(this.text.join(this.separator)),this.trigger.attr("data-value",this.value.join(","))),this.trigger.next(":hidden").val(this.value.join(",")),this.settings.callback&&this.settings.callback(this.scroller)},cancel:function(){this.value=this.oldvalue.concat([])}},n});