package com.poweruniverse.nim.plateform.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.poweruniverse.nim.base.description.Application;
import com.poweruniverse.nim.base.description.Component;
import com.poweruniverse.nim.base.description.LocalComponent;
import com.poweruniverse.nim.base.description.LocalWebservice;
import com.poweruniverse.nim.base.servlet.BasePlateformServlet;

/**
 * 初始化整个应用
 * 1、读取配置文件
 * 2、启动各组件（生成clicent端代码）
 * 3、
 * @author Administrator
 *
 */
public class ApplicationInitialServlet extends BasePlateformServlet{
	private static final long serialVersionUID = 1L;
	public final static String ApplicationConfigFile = "application.cfg.xml";
	
	public void init() throws ServletException{
		super.init();
		//初始化 application
		Application app = initApplicationConfig(this.ContextPath);
		
		//循环所有local组件
		for(String cmpName:app.getComponentKeySet()){
			Component componentInfo = app.getComponent(cmpName);
			if(componentInfo.isLocalComponent()){
				LocalComponent lc = (LocalComponent)componentInfo;
				//初始化所有组件
				lc.initialize();
				//发布webservice服务
				lc.publish();
			}
		}
	}

	
	private Application initApplicationConfig(String contextPath){
		Application app = null;
		try {
			//读取web-inf/application.cfg.xml 如果不存在 复制参考文件到目标目录 并提示错误
			File cfgFile = new File(contextPath+"WEB-INF/"+ApplicationConfigFile);
			if(!cfgFile.exists()){
				//复制文件
				InputStream ins = ApplicationInitialServlet.class.getResourceAsStream("/"+ApplicationConfigFile);
				OutputStream os = new FileOutputStream(cfgFile);
				int bytesRead = 0;
				byte[] buffer = new byte[8192];
				while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
					os.write(buffer, 0, bytesRead);
				}
				os.close();
				ins.close();
				System.err.println("应用程序配置文件：WEB-INF/"+ApplicationConfigFile+"不存在,已创建示例文件，请修改后重新启动！");
				return null;
			}
			
			SAXReader reader = new SAXReader();
			reader.setEncoding("utf-8");
			Document configurationDoc = reader.read(cfgFile);
			Element appEl = configurationDoc.getRootElement();//server  XML:ROOT-EL

			String serverName = appEl.attributeValue("name");
			String serverTitle = appEl.attributeValue("title");
			String serverSrcPath = appEl.attributeValue("src");
			String serverJdkPath = appEl.attributeValue("jdkPath");
			String serverIp = appEl.attributeValue("ip");
			String serverPort = appEl.attributeValue("port");
			String serverWebservicePort = appEl.attributeValue("webservicePort");
			String serverWebserviceSrc = appEl.attributeValue("webserviceSrc");
			app = Application.init(serverName, serverTitle, serverSrcPath,serverJdkPath, serverIp, serverPort, serverWebservicePort, serverWebserviceSrc);

			Element pagesEl = appEl.element("pages");
			Element loginPageEl = pagesEl.element("login");
			Element homePageEl = pagesEl.element("home");
			app.setHomePage(loginPageEl.attributeValue("page"));
			app.setLoginPage(loginPageEl.attributeValue("page"));
			
			//component 本地组件
			Element componentsEl = appEl.element("components");
			@SuppressWarnings("unchecked")
			List<Element> localComponentEls = (List<Element>)componentsEl.elements("localComponent");
			for(Element localComponentEl : localComponentEls){
				String cmpName = localComponentEl.attributeValue("name");
				if(cmpName == null){
					System.err.println("组件名称不存在,忽略此组件！");
				}else{
					LocalComponent componentInfo = new LocalComponent(cmpName);
					//从组件同名配置文件中 取得webservice配置信息
					Document componentCfgDoc = reader.read(ApplicationInitialServlet.class.getResourceAsStream("/"+cmpName+".cfg.xml"));
					Element componentCfgRootEl = componentCfgDoc.getRootElement();//
					if(!cmpName.equals(componentCfgRootEl.attributeValue("name"))){
						System.err.println("组件配置文件：WEB-INF/classes/"+cmpName+".cfg.xml中的名称与组件名称不符,忽略此组件的webservice服务配置！");
					}else{
						List<Element> webserviceEls = (List<Element>)componentCfgRootEl.elements("webservice");
						for(Element webserviceEl : webserviceEls){
							String wsName = webserviceEl.attributeValue("name");
							String wsClass = webserviceEl.attributeValue("class");
							LocalWebservice wsInfo = new LocalWebservice(componentInfo,wsName,wsClass);
							//记录此webservice
							componentInfo.addWebservice(wsInfo);
						}
					}
					//记录此组件
					app.addComponent(componentInfo);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return app;
	}
	
	

}