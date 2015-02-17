(function(){
    $.extend($.fn,{
        mask: function(msg,maskDivClass){
            // 参数
            var op = {
                opacity: 0.45,
                z: 50,
                bgcolor: '#EEE'
            };
//                var original=this;
            var position={top:this.scrollTop(),left:0};
            
            this.bind("scroll",maskWithScroll);
            
            // 创建一个 Mask 层，追加到对象中
            var maskDiv=$('<div class="maskdivgen">&nbsp;</div>');
            maskDiv.appendTo(this);
            var maskWidth=this.outerWidth();
            if(!maskWidth){
                maskWidth=this.width();
            }
            var maskHeight=this.outerHeight();
            if(!maskHeight){
                maskHeight=this.height();
            }
            maskDiv.css({
                position: 'absolute',
                top: position.top+"px",
                left: position.left+"px",
                'z-index': op.z,
                width: maskWidth,
                height:maskHeight,
                'background-color': op.bgcolor,
                opacity: 0
            });
            if(maskDivClass){
                maskDiv.addClass(maskDivClass);
            }
            if(msg){
                var msgDiv=$('<div style="position:absolute;padding:2px;background:#ccca"><div style="line-height:50px;height:50px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px"><img style="display: inline;float: left;margin: 10px 15px;" src="resources/plateform/light-ui/images/loading.gif">'+
                	'<span class="maskInfo">'+msg+'</span>'+
                '</div></div>');
                msgDiv.appendTo(maskDiv);
                var widthspace=(maskDiv.width()-msgDiv.width());
                var heightspace=(maskDiv.height()-msgDiv.height());
                msgDiv.css({
                   cursor:'wait',
                   top:(heightspace/2-2),
                   left:(widthspace/2-2)
                });
            }
            maskDiv.fadeIn('fast', function(){
                // 淡入淡出效果
                $(this).fadeTo('slow', op.opacity);
            })
            return maskDiv;
        },
     	unmask: function(){
           this.unbind("scroll",maskWithScroll);
           $(this).find("> div.maskdivgen").fadeOut('slow',0,function(){
              $(this).remove();
           });
        },
        message:function(msg){
        	$(this).find("> span.maskInfo").html(msg);
        }
    });
})();

function maskWithScroll(){
	$("div.maskdivgen:first").css('top',$(this).scrollTop()+'px')
}