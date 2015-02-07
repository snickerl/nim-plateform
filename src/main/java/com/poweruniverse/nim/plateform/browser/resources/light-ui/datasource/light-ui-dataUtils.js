LUI.DataUtils = {
	requestShiTiLeiData:function(callback){
		var fieldsJson = [{
			name:'shiTiLeiDM'
		},{
			name:'shiTiLeiDH'
		},{
			name:'shiTiLeiMC'
		},{
			name:'zhuJianLie'
		},{
			name:'xianShiLie'
		},{
			name:'paiXuLie'
		},{
			name:'xiTong',fields:[{name:'xiTongDH'}]
		},{
			name:'zds',fields:[{
				name:'ziDuanDH'
			},{
				name:'ziDuanBT'
			},{
				name:'guanLianSTL',fields:[{name:'shiTiLeiDH'}]
			},{
				name:'ziDuanLX',fields:[{name:'ziDuanLXDH'}]
			}]
		}];
		LUI.DataUtils.listStlData('system','SYS_ShiTiLei',0,0,fieldsJson,null,null,callback,this);
	},
	requestGongNengData:function(callback){
		var fieldsJson = [{
			name:'gongNengDM'
		},{
			name:'gongNengDH'
		},{
			name:'gongNengMC'
		},{
			name:'shiTiLei',fields:[{name:'shiTiLeiDH'}]
		},{
			name:'xiTong',fields:[{name:'xiTongDH'}]
		},{
			name:'czs',fields:[{name:'caoZuoDH'},{name:'caoZuoMC'}]
		}];
		LUI.DataUtils.listStlData('system','SYS_GongNeng',0,0,fieldsJson,null,null,callback,this);
	},
	requestXiTongData:function(callback){
		var fieldsJson = [{
			name:'xiTongDH'
		},{
			name:'xiTongMC'
		}];
		LUI.DataUtils.listStlData('system','SYS_XiTong',0,0,fieldsJson,null,null,callback,this);
	},
	requestZiDuanLXData:function(callback){
		var fieldsJson = [{
			name:'ziDuanLXDM'
		},{
			name:'ziDuanLXDH'
		},{
			name:'ziDuanLXMC'
		}];
		LUI.DataUtils.listStlData('system','SYS_ZiDuanLX',0,0,fieldsJson,null,null,callback,this);
	},
	getSqlVariable:function(xiTongDH,sqlString,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'getSqlVariable',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"sql:\""+sqlString+"\"" +
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	listSqlData:function(xiTongDH,sqlString,start,limit,fieldsJson,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'listSqlData',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"sql:\""+sqlString+"\"," +
					"start:" +start +"," +
					"limit:" +limit  +"," +
					"fields:" + LUI.Util.stringify(fieldsJson)+
					(context.lastParams.parameters!=null?(",params:"+LUI.Util.stringify(context.lastParams.parameters)):"")+
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	//执行一个状态类型的操作，可以指定一个对象或不执行对象 （id = null）
	executeStatus:function(xiTongDH,gongNengDH,caoZuoDH,id,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'execute',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"gongNengDH:'"+gongNengDH+"'," +
					"caoZuoDH:'"+caoZuoDH+"'," +
					"id:" +id +
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	//加载一个对象 使用功能代号、操作代号、主键值
	loadGnData:function(xiTongDH,gongNengDH,caoZuoDH,id,fieldsJson,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'loadGnData',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"gongNengDH:'"+gongNengDH+"'," +
					"caoZuoDH:'"+caoZuoDH+"'," +
					(id==null?'id:null,':("id:'"+id+"',")) +
					"fields:" + LUI.Util.stringify(fieldsJson)+
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	listJavaData:function(className,start,limit,parameters,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'listJavaData',
				parameters:"{" +
					"start:'"+start+"'," +
					"limit:'"+limit+"'," +
					"className:'"+className+"'" +
					(parameters!=null?(",parameters:" +LUI.Util.stringify(parameters)):"")+
				"}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	listGnData:function(xiTongDH,gongNengDH,caoZuoDH,start,limit,fieldsJson,filterJson,sortsJson,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'listGnData',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"gongNengDH:'"+gongNengDH+"'," +
					"caoZuoDH:'"+caoZuoDH+"'," +
					"start:" +start +"," +
					"limit:" +limit  +"," +
					"fields:" + LUI.Util.stringify(fieldsJson) +
					(filterJson!=null?(",filters:" +LUI.Util.stringify(filterJson)):"")+
					(sortsJson!=null?(",sorts:" +LUI.Util.stringify(sortsJson)):"")+
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	listStlData:function(xiTongDH,shiTiLeiDH,start,limit,fieldsJson,filterJson,sortsJson,callback,context){
		if(context==null){
			context = this;
		}
		var params = "{params:{" +
			"xiTongDH:'"+xiTongDH+"'," +
			"shiTiLeiDH:'"+shiTiLeiDH+"'," +
			"start:" +start +"," +
			"limit:" +limit  +"," +
			"fields:" + LUI.Util.stringify(fieldsJson) +
			(filterJson!=null?(",filters:" +LUI.Util.stringify(filterJson)):"")+
			(sortsJson!=null?(",sorts:" +LUI.Util.stringify(sortsJson)):"")+
		"}}";
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'listStlData',
				parameters:params
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	listTodoData:function(xiTongDH,shiTiLeiDH,start,limit,todoOnly,fieldsJson,filterJson,sortsJson,workflows,callback,context){
		if(context==null){
			context = this;
		}
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'data',
				method:'listTodoData',
				parameters:"{params:{" +
					"xiTongDH:'system'," +
					"shiTiLeiDH:'SYS_LiuChengJS'," +
					"start:" +start +"," +
					"limit:" +limit  +"," +
					"todoOnly:" +todoOnly  +"," +
					"fields:" + LUI.Util.stringify(fieldsJson) +
					(filterJson!=null?(",filters:" +LUI.Util.stringify(filterJson)):"")+
					(sortsJson!=null?(",sorts:" +LUI.Util.stringify(sortsJson)):"")+
					(workflows!=null?(",workflows:" +LUI.Util.stringify(workflows)):"")+
				"}}"
			},
			dataType:"json",
			context:context,
			success: function(result){
				if(result.success){
					callback.apply(this,[result]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	//检查当前用户对特定数据是否有权限
	hasAuth:function (xiTongDH,gongNengDH,caoZuoDH,id,callback){
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'auth',
				method:'hasAuth',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"gongNengDH:'"+gongNengDH+"'," +
					"caoZuoDH:'" +caoZuoDH +"'," +
					"id:'" +id +"'" +
				"}}"
			},
			dataType:"json",
			success: function(result){
				if(result.success){
					callback.apply(this,[result.data]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	},
	//检查当前用户是否有功能操作权限
	hasGNCZAuth:function (xiTongDH,gongNengDH,caoZuoDH,callback){
		$.ajax({
			url: "http://"+_urlInfo.host+":"+_urlInfo.port+"/jservice/", 
			type: "POST", 
			data:{
				application:'nsb',
				service:'auth',
				method:'hasGNCZAuth',
				parameters:"{params:{" +
					"xiTongDH:'"+xiTongDH+"'," +
					"gongNengDH:'"+gongNengDH+"'," +
					"caoZuoDH:'" +caoZuoDH +"'" +
				"}}"
			},
			dataType:"json",
			success: function(result){
				if(result.success){
					callback.apply(this,[result.data]);
				}else{
					LUI.Message.info("信息",result.errorMsg);
				}
			},
			error:function(){
				LUI.Message.info("信息","访问服务器失败!");
			}
		});
	}
}

