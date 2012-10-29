/**
* J-tips is the free , easy use and great tips for jQuery.  If you have any question or suggestion , please send email
* to us: wenzhe.zhouwz@alibaba-inc.com/ wenwen.caoww@alibaba-inc.com /zhouquan.yezq@alibaba-inc.com
* Author: zhouquan.yezq
* Commiter:wenwen.caoww / wenzhe.zhouwz
*/
(function($){
	$.jtips=function(){
	var __jtips= function(){};
	jQuery.extend(__jtips.prototype,{
	  width: 100,
	  height:20,
	  padding:12,
	  // the first letter stand for the tip's arrow direction the second letter stand for the tip's relative location for the target position
	  layout:'bc',
	  arrow_distance:2,
	  ___arrowpadding:12,
	  ajax:false,
	  ajaxDone:false,
	  layoutMap:{//define the layout priority, same as the css rule
		'bl':1,
		'bc':2,
		'br':3,
		'lt':4,
		'lc':5,
		'lb':6,
		'tr':7,
		'tc':8,
		'tl':9,
		'rb':10,
		'rc':11,
		'rt':12
	  }
	},{
	 //objAux {target:'',config:{layout:'bc',width:'',height:''}}
	create: function(objAux){
		  var t=jQuery(objAux.target);
		  this.__target=t;
		  objAux.config?jQuery.extend(this,objAux.config):'';
		  var _ptop=t.offset().top,_pleft=t.offset().left,_pwidth=t.width(),_pheight=t.height();
		  var tp=[
			'<div class="jtips-container" style="display:block;z-index:10000;position:absolute;">',
			'<canvas class="jtips-canvas" width="200px" height="110px" style="position:absolute;top:0px;left:0px;"></canvas>',
			'<div class="jtips-spinner-container" style="position:relative;float:left;width:146px;height:66px;">',
			  '<div class="jtips-spinner"></div>',
			'</div>',
			'<div class="jtips-content" style="float:left;padding:0px;display:none;background-color:#FFF;" >',
			'</div>',
			'</div>'
		];
		jQuery('body').append(tp.join(''));
		var t=jQuery("div.jtips-container:last");
		this.__self=t;
	   // t.offset({'top':_ptop,'left':_pleft});
		t.width(this.width);
		t.height(this.height);
		//t.css({'position':'absolute','top':-1000,'left':-1000});
		//t.find('.jtips-canvas').width(this.width);
		//t.find('.jtips-canvas').height(this.height);
		t.show();
		t.find('.jtips-content').width(this.width);
		t.find('.jtips-content').height(this.height);
		this._registerEvents();
		//this._analyPosition();
		// this.drawOuterContainer(this.getVeto().find('.jtips-canvas'));

	},
	getVeto: function(){
		return this.__self;
	},
	doAjax: function() {
	  var me=this;
	  jQuery.when(this.ajaxcb()).done(function(){

		if(!me.__hideflag){
		  var args=arguments[0];
		  me.ajaxDone=true;
		  me.getVeto().find('.jtips-spinner-container').hide();
		  args.content?me.content=args.content:'';
		  me._analyPosition();
		  me.drawOuterContainer(me.getVeto().find('.jtips-canvas'));
		}
	  }).fail(function(){
		 me.content="<span>获取数据失败</span>";
		 me._analyPosition();
		 me.drawOuterContainer(me.getVeto().find('.jtips-canvas'));
	  });
	},
	_registerEvents: function(){
	  var me=this;
	  this.__hideflag=true;
	  this.getTarget().mouseenter(function(){
		  me.__hideflag=false;
		  me._analyPosition();
		  me.drawOuterContainer(me.getVeto().find('.jtips-canvas'));
		  me.ajax && !me.ajaxDone ?me.doAjax():'';
	  });
	  this.getTarget().mouseleave(function(){
		 me.__hideflag=true;
		setTimeout(function(){ if(me.__hideflag){me.hide();}},100);
	  });
	  this.getVeto().mouseenter(function(){
		  me.__hideflag=false;
	  });
	  this.getVeto().mouseleave(function(){
		 me.__hideflag=true;
		//setTimeout(function(){ if(me.__hideflag){me.hide();}},100);
	  });
	},
	hide: function() {
		this.getVeto().css({'position':'absolute','left':-10000,'top':-1000});
	},
	show: function(objAux) {
		//don't forget the scrollLeft and scrollTop 
		//+jQuery('body').scrollLeft()
		//+jQuery('body').scrollTop()
		var vtop=this.getTarget().offset().top-jQuery('body').scrollTop();//view top
		if(objAux.top>vtop){
		  this.getVeto().css({'position':'absolute','left':objAux.left,'top':objAux.top+jQuery('body').scrollTop()});
		}else{
		  this.getVeto().css({'position':'absolute','left':objAux.left,'top':objAux.top});
		}
	},
	drawOuterContainer: function(jcanvas) {
		if(this.__exist) {return ;}
		this.__exist == undefined ? this.__exist=true:'';
		var ctx = jcanvas[0].getContext('2d');
		 jcanvas[0].width=this._width;
		 jcanvas[0].height=this._height;
		// ctx.fillStyle =  "rgba(32, 45, 21, 0.1)";
		ctx.clearRect(0,0,jcanvas[0].width,jcanvas[0].height);
		ctx.fillStyle='#fff';
		ctx.strokeStyle ="#444";
		//ctx.lineCap ='round';
		  ctx.lineJoin  ='round';
		ctx.lineWidth =1;
		//ctx.globalAlpha =1.0;
		ctx.beginPath();
		var _p10=this.___arrowpadding,_ad=this.arrow_distance;
		switch (this.layout){
		  case 'bc':
			ctx.moveTo(0,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height()-_p10);
			ctx.lineTo(jcanvas.width()/2+_p10,jcanvas.height()-_p10);
			ctx.lineTo(jcanvas.width()/2,jcanvas.height()-_ad);
			ctx.lineTo(jcanvas.width()/2-_p10,jcanvas.height()-_p10);
			ctx.lineTo(0,jcanvas.height()-_p10);
			ctx.lineTo(0,0);
			ctx.closePath();
			ctx.fill();
			ctx.clearRect(_p10,_p10,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();
			break;
		  case 'bl':
			ctx.moveTo(0,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height()-_p10);
			ctx.lineTo(3*_p10,jcanvas.height()-_p10);
			ctx.lineTo(2*_p10,jcanvas.height()-_ad);
			ctx.lineTo(_p10,jcanvas.height()-_p10);
			ctx.lineTo(0,jcanvas.height()-_p10);
			ctx.lineTo(0,0);
			ctx.closePath();
		   ctx.fill();
			ctx.clearRect(_p10,_p10,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();
			break;
		  case 'br':
			ctx.moveTo(0,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height()-_p10);
			ctx.lineTo(jcanvas.width()-_p10,jcanvas.height()-_p10);
			ctx.lineTo(jcanvas.width()-2*_p10,jcanvas.height()-_ad);
			ctx.lineTo(jcanvas.width()-3*_p10,jcanvas.height()-_p10);
			ctx.lineTo(0,jcanvas.height()-_p10);
			ctx.lineTo(0,0);
			ctx.closePath();
			ctx.fill();
			ctx.clearRect(_p10,_p10,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();
			break;
		  case 'tc':
			ctx.moveTo(0,_p10);
			ctx.lineTo(jcanvas.width()/2-_p10,_p10);
			ctx.lineTo(jcanvas.width()/2,_ad);
			ctx.lineTo(jcanvas.width()/2+_p10,_p10);
			ctx.lineTo(jcanvas.width(),_p10);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(0,jcanvas.height());
			ctx.lineTo(0,_p10);
			ctx.closePath();
			ctx.fill();
			ctx.clearRect(_p10,_p10+this.___arrowpadding,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();

			 break;            
		  case 'tl':
			ctx.moveTo(0,_p10);
			ctx.lineTo(_p10,_p10);
			ctx.lineTo(2*_p10,_ad);
			ctx.lineTo(3*_p10,_p10);
			ctx.lineTo(jcanvas.width(),_p10);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(0,jcanvas.height());
			ctx.lineTo(0,_p10);
			ctx.closePath();
		ctx.fill();
			ctx.clearRect(_p10,_p10+this.___arrowpadding,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();
			 break;		
		  case 'tr':
			ctx.moveTo(0,_p10);
			ctx.lineTo(jcanvas.width()-3*_p10,_p10);
			ctx.lineTo(jcanvas.width()-2*_p10,_ad);
			ctx.lineTo(jcanvas.width()-_p10,_p10);
			ctx.lineTo(jcanvas.width(),_p10);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(0,jcanvas.height());
			ctx.lineTo(0,_p10);
			ctx.closePath();
		 ctx.fill();
			ctx.clearRect(_p10,_p10+this.___arrowpadding,jcanvas.width()-2*_p10,jcanvas.height()-2*_p10-this.___arrowpadding);
			 ctx.stroke();
			 break;
		  case 'rc':
			ctx.moveTo(0,0);
			ctx.lineTo(jcanvas.width()-_p10,0);
			ctx.lineTo(jcanvas.width()-_p10,jcanvas.height()/2-_p10);
			ctx.lineTo(jcanvas.width()-_ad,jcanvas.height()/2);
			ctx.lineTo(jcanvas.width()-_p10,jcanvas.height()/2+_p10);
			ctx.lineTo(jcanvas.width()-_p10,jcanvas.height());
			ctx.lineTo(0,jcanvas.height());
			ctx.lineTo(0,0);
			ctx.closePath();
			ctx.stroke();
			 break;
			case 'lc':
		   ctx.moveTo(_p10,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(_p10,jcanvas.height());
			ctx.lineTo(_p10,jcanvas.height()/2+_p10);
			ctx.lineTo(_ad,jcanvas.height()/2);
			ctx.lineTo(_p10,jcanvas.height()/2-_p10);
			ctx.lineTo(_p10,0);
			ctx.closePath();
			ctx.stroke();
			 break;
			case 'lt':
		   ctx.moveTo(_p10,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(_p10,jcanvas.height());
			ctx.lineTo(_p10,3*_p10);
			ctx.lineTo(_ad,2*_p10);
			ctx.lineTo(_p10,_p10);
			ctx.lineTo(_p10,0);
			ctx.closePath();
			ctx.stroke();
			 break;
			case 'lb':
		   ctx.moveTo(_p10,0);
			ctx.lineTo(jcanvas.width(),0);
			ctx.lineTo(jcanvas.width(),jcanvas.height());
			ctx.lineTo(_p10,jcanvas.height());
			ctx.lineTo(_p10,jcanvas.height()-_p10);
			ctx.lineTo(_ad,jcanvas.height()-2*_p10);
			ctx.lineTo(_p10,jcanvas.height()-3*_p10);
			ctx.lineTo(_p10,0);
			ctx.closePath();
			ctx.stroke();
			 break;
		   
		}
	   
		if(!this.ajax) {
		  this.getVeto().find('.jtips-spinner-container').hide();
		  return;
		}else{
		  this.getVeto().find('.jtips-spinner-container').show();
		}
		Spinners.create('.jtips-spinner').center().play();
		this.getVeto().css('position','absolute');// fix the spinner bring position issue;
	},
	getSpinner: function() {
		  return  Spinners.create('.jtips-spinner');
	},
	getVetoContent: function() {
		 return  this.getVeto().find('.jtips-content');
	},
	getTarget: function() {
	   return this.__target;
	},
	_analyPosition: function() {
		var _t=this.__target;
		this.hide();
		var vtop=_t.offset().top-jQuery('body').scrollTop();//view top
		var vleft=_t.offset().left-jQuery('body').scrollLeft();//view left
		if(!this.__exist){
			 if(this.ajax){
			this.getVetoContent().html(this.ajaxDone?this.content:'');
			}else{
			this.getVetoContent().html(this.content);
			}
			this.getVetoContent().data('width',this.getVetoContent().children().width());
			this.getVetoContent().data('height',this.getVetoContent().children().height());
			this.getVetoContent().width(this.getVetoContent().children().width());
			this.getVetoContent().height(this.getVetoContent().children().height());
		}
		this.getVetoContent().show();
		this._width=null;
		this._height=null;
		var _width=this.getVetoContent().data('width')>this.width?(this.getVetoContent().data('width')+this.padding*2+this.___arrowpadding):(this.width+this.padding*2+this.___arrowpadding);
		var _height=this.getVetoContent().data('height')>this.height?(this.getVetoContent().data('height')+this.padding*2+this.___arrowpadding):(this.height+this.padding*2+this.___arrowpadding);
		//this.getVetoContent().css('margin',(this.padding*2+this.___arrowpadding)/2+'px');

		this._width=_width;
		this._height=_height;
		
	   
		var objAux={vleft:vleft,vtop:vtop,width:this._width,height:this._height};
		switch (this.layout)
		{
		  case 'bl':
			if(this.isapply_bl(objAux)) break;
		   case 'bc':
			if(this.isapply_bc(objAux)) break;
		   case 'br':
			if(this.isapply_br(objAux)) break;
		   case 'tc':
			if(this.isapply_tc(objAux)) break;
		   case 'tl':
			if(this.isapply_tl(objAux)) break;
		   case 'tr':
			if(this.isapply_tr(objAux)) break;
				/*
				case 'lc':
				if(this.isapply_lc(objAux)){
				break;
				}
				case 'lt':
				if(this.isapply_lt(objAux)){
				break;
				}
				case 'lb':
				if(this.isapply_lb(objAux)){
				break;
				}
				case 'rc':
				if(this.isapply_rc(objAux)){
				break;
				}*/
		  default:
			  case 'bl':
			if(this.isapply_bl(objAux)) break;
		   case 'bc':
			if(this.isapply_bc(objAux)) break;
		   case 'br':
			if(this.isapply_br(objAux)) break;
		   case 'tc':
			if(this.isapply_tc(objAux)) break;
		   case 'tl':
			if(this.isapply_tl(objAux)) break;
		   case 'tr':
			if(this.isapply_tr(objAux)) break;
			alert('please implement other layout');
		}
		//sync the veto content's height and width
		this.getVetoContent().css('padding',this.padding+'px');
		//debugger;
		if(this.layout=='bl' || this.layout=='bc' || this.layout=='br'){
		   this.getVetoContent().css('margin-bottom',(this.___arrowpadding)+'px');
		   this.getVetoContent().width(_width-2*this.padding-2);
		   this.getVetoContent().height(_height-2*this.padding-this.___arrowpadding-2);
		}else if(this.layout=='tl' || this.layout=='tc' || this.layout=='tr'){
			this.getVetoContent().css('margin-top',(this.___arrowpadding)+'px');
			this.getVetoContent().width(_width-2*this.padding-2);
		   this.getVetoContent().height(_height-2*this.padding-this.___arrowpadding-2);
		}

	},
	/**
	*@param {json} objAux  
	* @objAux.vleft  the target's view left distance
	* @objAux.vtop   the target's view top distance
	* @objAux.height the tip's height
	* @objAux.width  the tip's width
	*/
	isapply_br: function(objAux){
		if(this.applyRule_bottom(objAux) && this.applyHRule_right(objAux)){
		  this.layout='br';
		  var _p10=this.___arrowpadding;
		  var left;
		  if(objAux.width>this.getTarget().width()){
			left=objAux.vleft+this.getTarget().width()/2-(objAux.width-2*_p10);
		  }else{
			left=objAux.vleft+this.getTarget().width()-objAux.width;
		  }
		  var top=this.getTarget().offset().top-objAux.height;
		  this.show({'left':left,'top':top});
		  return true;
		}else{
		  return false;
		}
	},
	/**
	*@param {json} objAux  
	* @objAux.vleft  the target's view left distance
	* @objAux.vtop   the target's view top distance
	* @objAux.height the tip's height
	* @objAux.width  the tip's width
	*/
	isapply_bl: function(objAux){
		if(this.applyRule_bottom(objAux) && this.applyHRule_left(objAux)){
		  this.layout='bl';
		  var _p10=this.___arrowpadding;
		  var left;
		  if(this.getTarget().width()<3*_p10){
			left=objAux.vleft-2*_p10+this.getTarget().width()/2;
		  }else{
			 left=objAux.vleft;
		  }
		  var top=objAux.vtop-objAux.height;
		  this.show({'left':left,'top':top});
		  return true;
		}else{
		  return false;
		}
	},
	isapply_bc: function(objAux){
		//debugger
		if(this.applyRule_bottom(objAux) && this.applyHRule_center(objAux)){
		  this.layout='bc';
			var left=objAux.vleft+this.getTarget().width()/2-objAux.width/2;
		  var top=objAux.vtop-objAux.height;
		  this.show({'left':left,'top':top});
		  return true;
		}else{
		  return false;
		}
	},
	isapply_tc: function(objAux) {
		if(this.applyRule_top(objAux) && this.applyHRule_center(objAux) ){
		  this.layout='tc';
		  var left=objAux.vleft+this.getTarget().width()/2-objAux.width/2;
		  var top=objAux.vtop+this.getTarget().height();
		  this.show({'left':left,'top':top});
		  return true;
		}
		return false;
	},
	isapply_tl: function(objAux) {
		if(this.applyRule_top(objAux) && this.applyHRule_left(objAux) ){
		  this.layout='tl';
		  var top=objAux.vtop+this.getTarget().height();
		  var _p10=this.___arrowpadding;
		  var left;
		  if(this.getTarget().width()<3*_p10){
			left=objAux.vleft-2*_p10+this.getTarget().width()/2;
		  }else{
			 left=objAux.vleft;
		  }
		  this.show({'left':left,'top':top});
		  return true;
		}
		return false;
	},		   
	isapply_tr: function(objAux) {
		if(this.applyRule_top(objAux) && this.applyHRule_right(objAux) ){
		  this.layout='tr';
		  var top=objAux.vtop+this.getTarget().height();
		  var _p10=this.___arrowpadding;
		  var left;
		  if(objAux.width>this.getTarget().width()){
			left=objAux.vleft+this.getTarget().width()/2-(objAux.width-2*_p10);
		  }else{
			left=objAux.vleft+this.getTarget().width()-objAux.width;
		  }
		  this.show({'left':left,'top':top});
		  return true;
		}
		return false;
	},
	/**
	*@param {json} objAux  
	* @objAux.vleft  the target's view left distance
	* @objAux.vtop   the target's view top distance
	* @objAux.height the tip's height
	* @objAux.width  the tip's width
	*/
	isapply_lc: function(objAux){
	   if(this.applyRule_left(objAux)){
		   this.layout='lc';
		   var left=this.getTarget().offset().left+this.getTarget().width();
		   var top=this.getTarget().offset().top+this.getTarget().height()/2-objAux.height/2;
		   this.show({'left':left,'top':top});
		   return true;
	   }
	   return false;
	},
	//jQuery('body').width() view width
	/**
	*@param {json} objAux  
	* @objAux.vleft  the target's view left distance
	* @objAux.vtop   the target's view top distance
	* @objAux.height the tip's height
	* @objAux.width  the tip's width
	*/
	isapply_lt: function(objAux){
	   if(this.applyRule_left(objAux)){
		   this.layout='lt';
		   var left=this.getTarget().offset().left+this.getTarget().width();
		   var top=this.getTarget().offset().top;
		   this.show({'left':left,'top':top});
		   return true;
	   }
	   return false;
	},
	//jQuery('body').width() view width
	isapply_lb: function(objAux){
	  if(this.applyRule_left(objAux)){
		   this.layout='lb';
		   var left=this.getTarget().offset().left+this.getTarget().width();
		   var top=this.getTarget().offset().top-(objAux.height-this.getTarget().height());
		   this.show({'left':left,'top':top});
		   return true;
	  }
	   return false;
	},
	isapply_rc: function(objAux) {
		if(this.applyRule_right(objAux)){
		  this.layout='rc';
		  var left=this.getTarget().offset().left-objAux.width;
		  var top=this.getTarget().offset().top+this.getTarget().height()/2-objAux.height/2;
		  this.show({'left':left,'top':top});
		  return true;
		}
		return false;
	},
	//if you want tips arrow direct to the top, the tips's position should meet this rule.
	/**
	*@param {json} objAux  
	* @objAux.vleft  the target's view left distance
	* @objAux.vtop   the target's view top distance
	* @objAux.height the tip's height
	* @objAux.width  the tip's width
	*/
	applyRule_top: function(objAux) {
	  return (objAux.vtop+this.getTarget().height()+objAux.height < jQuery(window).height())  ? true: false;
	},
	//if you want tips on the right of the target, the tips's position should meet this rule.
	applyRule_right: function() {
	   return (objAux.vleft+objAux.width+this.getTarget().width()<jQuery(window).width())
	   && (objAux.vleft> objAux.width) ? true: false;
	},
	applyRule_left: function(objAux) {
		return (objAux.vleft+objAux.width+this.getTarget().width()<jQuery(window).width()) ? true: false;
	},
	applyRule_bottom: function(objAux) {
	   return (this.getTarget().height()+objAux.height < jQuery(window).height()) 
	   &&(objAux.vtop>objAux.height) ? true: false;
	},
	//tips position : horizontal left rule, it could be apply to 'bl,tl' layout
	applyHRule_left: function(objAux) {
	  if(objAux.width<this.getTarget().width()){
		return true;
	  }else{
		if(objAux.vleft+objAux.width>jQuery(window).height()) return false;
	  }
	  return true;
	},
	applyHRule_center: function(objAux) {
	  if(objAux.width<this.getTarget().width()){
		return true;
	  }else{
		if(objAux.vleft+objAux.width/2+this.getTarget().width()/2>jQuery(window).height()) return false;
	  }
	  return true;
	},		   
	applyHRule_right: function(objAux) {
	  if(objAux.width<this.getTarget().width()){
		return true;
	  }else{
		if(objAux.vleft<(objAux.width-this.getTarget().width())) return false;
	  }
	  return true;
	},
	applyVRule_top: function() {

	},			
	applyVRule_center: function() {

	},			
	applyVRule_bottom: function() {

	}
	});
	return  __jtips;

	}();
         
	})(jQuery);