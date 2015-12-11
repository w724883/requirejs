require(["zepto","tools","../common","ui","lazyload"],function(e,t,n,r){var i={init:function(){this.$cart=e("#cart"),n.init(),this.bindEvent(),this.setSelect()},bindEvent:function(){this.$cart.on("tap",".i-amount a",function(n){var r=e(this).closest(".J-params");t.selectNumber(e(this),{inventory:r.data("inventory"),goods_id:r.data("goodid"),cart_id:r.data("cartid")}),i.setParams()}).on("blur",".i-amount input",function(n){var r=e(this).closest(".J-params");t.selectNumber(e(this),{inventory:r.data("inventory"),goods_id:r.data("goodid"),cart_id:r.data("cartid")}),i.setParams()}),this.$cart.on("tap","ul .J-select",function(t){e(this).toggleClass("active"),i.setSelect()}),this.$cart.on("tap",".order-desc .J-select",function(t){e(this).toggleClass("active");var n=i.$cart.find("ul .J-select");e(this).hasClass("active")?n.addClass("active"):n.removeClass("active"),i.setParams()}),this.$cart.on("tap",".J-delete",function(t){var n=e(this).closest(".J-params");r.confirm("删除该商品？",function(t){t&&e.post("/del_cart","cart_id="+n.data("cartid"),function(t){t.code==200?n.fadeOut(300,function(){e(this).remove(),i.setParams()}):r.alert(t.message)},"json").fail(function(e){r.alert(e)})})}),this.$cart.on("tap",".J-buy",function(t){t.preventDefault();var n=i.$cart.find(".J-params"),s="";n.each(function(t){e(this).find(".J-select").hasClass("active")&&(s+='<input type="hidden" name="cart_id[]" value="'+e(this).data("cartid")+'" />')}),s!=""?i.$cart.append(s).submit():r.alert("请选择商品！")})},setSelect:function(){var e=i.$cart.find("ul .J-select");e.filter(".active").length==e.length?i.$cart.find(".order-desc .J-select").addClass("active"):i.$cart.find(".order-desc .J-select").removeClass("active"),this.setParams()},setParams:function(){var t=0,n=this.$cart.find(".J-params"),r=this.$cart.find(".J-totals");n.each(function(){e(this).find(".J-select").hasClass("active")&&(t+=e(this).data("amount")*e(this).find("input").val())}),r.text(t)}};i.init()});