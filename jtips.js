/*!
 * Spinners 3.0.0
 * (c) 2010-2012 Nick Stakenburg - http://www.nickstakenburg.com
 *
 * Spinners is freely distributable under the terms of an MIT-style license.
 *
 * GitHub: http://github.com/staaky/spinners
 */
;var Spinners={version:"3.0.0"};(function(a){function b(a){return a*Math.PI/180}function c(a){this.element=a}function d(b,c){b&&(this.element=b,h.remove(b),h.removeDetached(),this._position=0,this._state="stopped",this.setOptions(a.extend({color:"#000",dashes:12,radius:5,height:5,width:1.8,opacity:1,padding:3,rotation:700},c||{})),this.drawPosition(0),h.add(this))}var e={scroll:function(a,b){if(!b)return a;var c=a.slice(0,b);return a.slice(b,a.length).concat(c)},isElement:function(a){return a&&1==a.nodeType},element:{isAttached:function(){return function(a){for(;a&&a.parentNode;)a=a.parentNode;return!!a&&!!a.body}}()}},f={drawRoundedRectangle:function(c,d){var e=a.extend({top:0,left:0,width:0,height:0,radius:0},d||{}),f=e.left,g=e.top,h=e.width,i=e.height,e=e.radius;c.beginPath(),c.moveTo(f+e,g),c.arc(f+h-e,g+e,e,b(-90),b(0),!1),c.arc(f+h-e,g+i-e,e,b(0),b(90),!1),c.arc(f+e,g+i-e,e,b(90),b(180),!1),c.arc(f+e,g+e,e,b(-180),b(-90),!1),c.closePath(),c.fill()}},g=function(){function a(a){var c=[];0==a.indexOf("#")&&(a=a.substring(1)),a=a.toLowerCase();if(""!=a.replace(b,""))return null;3==a.length?(c[0]=a.charAt(0)+a.charAt(0),c[1]=a.charAt(1)+a.charAt(1),c[2]=a.charAt(2)+a.charAt(2)):(c[0]=a.substring(0,2),c[1]=a.substring(2,4),c[2]=a.substring(4));for(a=0;a<c.length;a++)c[a]=parseInt(c[a],16);return c.red=c[0],c.green=c[1],c.blue=c[2],c}var b=RegExp("[0123456789abcdef]","g"),c=function(){function a(a,b,c){return a=a.toString(c||10),Array(b-a.length).join("0")+a}return function(b,c,d){return"#"+a(b,2,16)+a(c,2,16)+a(d,2,16)}}();return{hex2rgb:a,hex2fill:function(b,c){"undefined"==typeof c&&(c=1);var d=c,e=a(b);return e[3]=d,e.opacity=d,"rgba("+e.join()+")"},rgb2hex:c}}();a.extend(Spinners,{enabled:!1,support:{canvas:function(){var b=a("<canvas>")[0];return!!b.getContext&&!!b.getContext("2d")}()},init:function(){if(this.support.canvas||window.G_vmlCanvasManager&&window.attachEvent&&-1===navigator.userAgent.indexOf("Opera"))window.G_vmlCanvasManager&&window.G_vmlCanvasManager.init_(document),this.enabled=!0},create:function(a,b){return c.create(a,b),this.get(a)},get:function(a){return new c(a)},play:function(a){return this.get(a).play(),this},pause:function(a){return this.get(a).pause(),this},toggle:function(a){return this.get(a).toggle(),this},stop:function(a){return this.get(a).stop(),this},remove:function(a){return this.get(a).remove(),this},removeDetached:function(){return h.removeDetached(),this},center:function(a){return this.get(a).center(),this},setOptions:function(a,b){return this.get(a).setOptions(b),this},getDimensions:function(a){return a=2*h.get(a)[0].getLayout().workspace.radius,{width:a,height:a}}});var h={spinners:[],get:function(b){if(b){var c=[];return a.each(this.spinners,function(d,f){f&&(e.isElement(b)?f.element==b:a(f.element).is(b))&&c.push(f)}),c}},add:function(a){this.spinners.push(a)},remove:function(b){a(a.map(this.spinners,function(c){if(e.isElement(b)?c.element==b:a(c.element).is(b))return c.element})).each(a.proxy(function(a,b){this.removeByElement(b)},this))},removeByElement:function(b){var c=this.get(b)[0];c&&(c.remove(),this.spinners=a.grep(this.spinners,function(a){return a.element!=b}))},removeDetached:function(){a.each(this.spinners,a.proxy(function(a,b){b&&b.element&&!e.element.isAttached(b.element)&&this.remove(b.element)},this))}};a.extend(c,{create:function(b,c){if(b){var f=c||{},g=[];return e.isElement(b)?g.push(new d(b,f)):a(b).each(function(a,b){g.push(new d(b,f))}),g}}}),a.extend(c.prototype,{items:function(){return h.get(this.element)},play:function(){return a.each(this.items(),function(a,b){b.play()}),this},stop:function(){return a.each(this.items(),function(a,b){b.stop()}),this},pause:function(){return a.each(this.items(),function(a,b){b.pause()}),this},toggle:function(){return a.each(this.items(),function(a,b){b.toggle()}),this},center:function(){return a.each(this.items(),function(a,b){b.center()}),this},setOptions:function(b){return a.each(this.items(),function(a,c){c.setOptions(b)}),this},remove:function(){return h.remove(this.element),this}}),a.extend(d.prototype,{setOptions:
function(b){this.options=a.extend({},this.options,b||{}),this.options.radii&&(b=this.options.radii,this.options.radius=Math.min(b[0],b[1]),this.options.height=Math.max(b[0],b[1])-this.options.radius),this.options.dashWidth&&(this.options.width=this.options.dashWidth),this.options.speed&&(this.options.duration=1e3*this.options.speed);var b=this._state,c=this._position;this._layout=null,this.build(),c&&c>=this.options.dashes-1&&(this._position=this.options.dashes-1);switch(b){case"playing":this.play();break;case"paused":case"stopped":this.drawPosition(this._position)}this._centered&&this.center()},remove:function(){this.canvas&&(this.pause(),a(this.canvas).remove(),this.ctx=this.canvas=null)},build:function(){this.remove();var b=this.getLayout().workspace.radius;return a(document.body).append(this.canvas=a("<canvas>").attr({width:2*b,height:2*b}).css({zoom:1})),window.G_vmlCanvasManager&&G_vmlCanvasManager.initElement(this.canvas[0]),this.ctx=this.canvas[0].getContext("2d"),this.ctx.globalAlpha=this.options.opacity,a(this.element).append(this.canvas),this.ctx.translate(b,b),this},drawPosition:function(a){var c=this.getLayout().workspace,a=e.scroll(c.opacities,-1*a),d=c.radius,c=this.options.dashes,f=b(360/c);this.ctx.clearRect(-1*d,-1*d,2*d,2*d);for(d=0;d<c;d++)this.drawDash(a[d],this.options.color),this.ctx.rotate(f)},drawDash:function(a,b){this.ctx.fillStyle=g.hex2fill(b,a);var c=this.getLayout(),d=c.workspace.radius,e=c.dash.position,c=c.dash.dimensions;f.drawRoundedRectangle(this.ctx,{top:e.top-d,left:e.left-d,width:c.width,height:c.height,radius:Math.min(c.height,c.width)/2})},_nextPosition:function(){var b=this.options.rotation/this.options.dashes;this.nextPosition(),this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b)},nextPosition:function(){this._position==this.options.dashes-1&&(this._position=-1),this._position++,this.drawPosition(this._position)},play:function(){if("playing"!=this._state){this._state="playing";var b=this.options.rotation/this.options.dashes;return this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b),this}},pause:function(){if("paused"!=this._state)return this._pause(),this._state="paused",this},_pause:function(){this._playTimer&&(window.clearTimeout(this._playTimer),this._playTimer=null)},stop:function(){if("stopped"!=this._state)return this._pause(),this._position=0,this.drawPosition(0),this._state="stopped",this},toggle:function(){return this["playing"==this._state?"pause":"play"](),this},getLayout:function(){if(this._layout)return this._layout;for(var a=this.options,b=a.dashes,c=a.width,d=a.radius,e=a.radius+a.height,f=Math.max(c,e),f=Math.ceil(Math.max(f,Math.sqrt(e*e+c/2*(c/2)))),a=f+=a.padding,g=1/b,h=[],i=0;i<b;i++)h.push((i+1)*g);return this._layout=b={workspace:{radius:a,opacities:h},dash:{position:{top:f-e,left:f-c/2},dimensions:{width:c,height:e-d}}}},center:function(){var b=2*this.getLayout().workspace.radius;a(this.element.parentNode).css({position:"relative"}),a(this.element).css({position:"absolute",height:b+"px",width:b+"px",top:"50%",left:"50%",marginLeft:-0.5*b+"px",marginTop:-0.5*b+"px"}),this._centered=!0}}),Spinners.init(),Spinners.enabled||(c.create=function(){return[]})})(jQuery);

/**
* J-tips is the free , easy use and great tips for jQuery.  If you have any question or suggestion , please send email
* to us: wenzhe.zhouwz@alibaba-inc.com/ wenwen.caoww@alibaba-inc.com /zhouquan.yezq@alibaba-inc.com
* Author: zhouquan.yezq
* Commiter:wenwen.caoww / wenzhe.zhouwz
*/
;(function($){
	$.jtips=function(){
	var __jtips= function(){};
	var JTIPS_POOL=[];
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
	  triggerEvent:'mouseenter',
	  uid: jQuery.now(),
	  tipspool:5,
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
		  if(jQuery("#"+this.uid).length>0){
		    this.__self=jQuery("#"+this.uid);
			this.__self.show();
		    this.repaint();
			return;
		  }
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
		t.attr('id',this.uid);
		t.data('uid',this.uid);
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
	  jQuery.when(this.ajaxconfig.ajaxcb()).done(function(){
		if(!me.__hideflag){
		  var args=arguments[0];
		  me.__exist=false;
		  me.ajaxDone=true;
		  me.getVeto().find('.jtips-spinner-container').hide();
		  args.content?me.content=args.content:'';
		  me._analyPosition();
		  me.drawOuterContainer(me.getVeto().find('.jtips-canvas'));
		  me.getVeto().find('.jtips-spinner-container').hide();
		}
	  }).fail(function(){
		 me.content="<span>获取数据失败</span>";
		 me._analyPosition();
		 me.drawOuterContainer(me.getVeto().find('.jtips-canvas'));
	  });
	},
	repaint: function() {
	    this._analyPosition();
		this.drawOuterContainer(this.getVeto().find('.jtips-canvas'));
	},
	_registerEvents: function(){
	  var me=this;
	  this.__hideflag=true;
	 
	  this.getTarget()[this.triggerEvent](function(){
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
		setTimeout(function(){ if(me.__hideflag){me.hide();}},100);
	  });
	},
	hide: function() {
		this.getVeto()?this.getVeto().css({'position':'absolute','left':-10000,'top':-1000}):'';
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
	    
		if(!this.ajax || this.ajaxDone) {
		  this.getVeto().find('.jtips-spinner-container').hide();
		  return;
		}else{
		  this.getVeto().find('.jtips-spinner-container').show();
		  Spinners.create('.jtips-spinner').center().play();
		}
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
	// the interface method , user could rewrite this method to do the some init after the html render to the dom.
	/**
	* @param _html {}
	*/
	afterRender: function(_html){
	  
	},
	_analyPosition: function() {
		var _t=this.__target;
		this.hide();
		var vtop=_t.offset().top-jQuery('body').scrollTop();//view top
		var vleft=_t.offset().left-jQuery('body').scrollLeft();//view left
		this.getVetoContent().hide();
		if(!this.__exist){
		    var _html;
			if(this.ajax){
			  _html=this.getVetoContent().html(this.ajaxDone?this.content:'');
			}else{
			  _html=this.getVetoContent().html(this.content);
			}
			this.afterRender(_html);
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