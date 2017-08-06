var timestamp=Date.parse(new Date());
var jgbm='31011600000';
var treedata;
var paramsIframe;

/**
 * 获得交换列表信息
 * @returns
 */


function jdjgTreeViewIni()
{
	//jgbm='31011600000';
	//timestamp=Data.parse(new Data());
	$.ajax({
		type:"get",
		url:"../../jdwhResource/jdwh?int"+timestamp+"&jgbm="+jgbm,
		dataType:"json",
		success:function(result)
		{	
		//	window.alert(JSON.stringify(result));
			jhjdDataListValue=result;
			initJHJDListHandler($("#dtcljgJGSelect"),jhjdDataListValue);
			initJHJDHandler($('#jdlist'),jhjdDataListValue);
		}
		});
	//window.alert("q");
}

/**
 * 生成交换节点列表
 * @returns
 */

function initJHJDHandler(domObj,jhjdDataListValue)
{
	
	
	domObj.empty();
	
	$.each(jhjdDataListValue,function(index,paramObj)
	{
		var jdmcValue = paramObj.text;
		//window.alert(jdmcValue);
		//截取字符串，只保留6个字
		
		var jglsh = paramObj.jglsh;
		
		var jdlx = paramObj.jdlx;
		
		var ipdz = paramObj.ipdz;
		
		var jlzt = paramObj.jlzt;
		
		var optParam='<div class="kuai-view3-body-content" style="cursor: pointer; " onclick="zzjgTreeviewIniINFO(\''+jglsh+'\');updatainfo(\''+jdmcValue+'\',\''+jdlx+'\',\''+ipdz+'\',\''+jlzt+'\')" ><h5>' + jdmcValue + '</h5></div>';
		
		domObj.append(optParam);
		
	});
		//更新内容刷新到相应的位置:必须加，否则不起作用，界面不刷新数据显示
		domObj.selectpicker('render');
		domObj.selectpicker('refresh');
	//	window.alert("1");
	
	
}

/**
 * 保存节点信息
 * @returns
 */

function updatainfo(jdmc,jdlx,ipdz,jlzt)
{
	$("#jdmc").val(function(){
			return jdmc;
		});
		$("#jdlx").val(function(){
			return jdlx;
		});
		$("#ipdz").val(function(){
			return ipdz;
		});
	
		if(jlzt=="0"){
			$("#qyzt1").prop("checked",true);
			
		}else{
			$("#qyzt2").prop("checked",true);
			
		}
		
	
}
/**
 * 生成交换节点下拉列表
 * @returns
 */

function initJHJDListHandler(domObj,jhjdDataListValue)
{	
		//先清空原有的option list
		domObj.empty();
		var defaultOptionParam = '<option class="special-custom" value="null" selected>请输入节点关键字</option>';
		
		domObj.append(defaultOptionParam);
		$.each(jhjdDataListValue, function(index, paramObj)
	{
		var jdmcValue = paramObj.text;
		//window.alert(jdmcValue);
		//截取字符串，只保留6个字
		var jgmcStrValue = jdmcValue.substring(0, 6);		
		var jglsh = paramObj.jglsh;
		
		var jdlx = paramObj.jdlx;
		
		var ipdz = paramObj.ipdz;
		
		var jlzt = paramObj.jlzt;
		
		updatainfo(jdmc,jdlx,ipdz,jlzt);
		
		//window.alert(jglsh);
		var optionParam = '<option class="special-custom"   jdmc="'+jdmcValue+'"    jdlx="'+jdlx+'"   ipdz="'+ipdz+'"   jlzt="'+jlzt+'"   value="' + jglsh + '">' + jgmcStrValue + '</option>';
	//	var optionParam = '<td class="special-custom" value="' + jglsh + '">' + jdmcValue + '</li>';
	//		window.alert(optionParam);
		domObj.append(optionParam);
			//window.alert(optionParam);
	});
	//更新内容刷新到相应的位置:必须加，否则不起作用，界面不刷新数据显示
		domObj.selectpicker('render');
		domObj.selectpicker('refresh');
	//	window.alert("1");
	
		//监听同级按钮点击事件
	domObj.parent().children('span').click(function(){
		
		//window.alert("click");
		//获取选中option的value值
		jglsh = domObj.get(0).value;
		//window.alert(jglsh);
		var obj=document.getElementById("dtcljgJGSelect");  
		var index=obj.selectedIndex;  
		jdmc=obj.options[index].getAttribute("jdmc"); 
		jdlx=obj.options[index].getAttribute("jdlx"); 
		ipdz=obj.options[index].getAttribute("ipdz"); 
		jlzt=obj.options[index].getAttribute("jlzt");
		//window.alert(jdmc+" "+jglsh+" "+jdlx+" "+ipdz+" "+jlzt);
		updatainfo(jdmc,jdlx,ipdz,jlzt)
		
			
		//刷新机构
		zzjgTreeviewIniINFO(jglsh);
	});
	
	
}
/**
 * 获得机构流水号对应的组织机构
 * @returns
 */

function zzjgTreeviewIniINFO(jglsh)
{
		//window.alert(jglsh);
	   $.ajax({
        type: "get",
        url: "../../jdwhResource/jhjdjg?int=" + timestamp + "&jglsh=" + jglsh,
        dataType: "json",
        success: function (result) {
			//window.alert(JSON.stringify(result));
			var jgsz=[];
			$.each(result,function(index,obj){
				jgsz[index]=obj.JGBM;		
			});
			
			//window.alert("jgsz "+jgsz)
			zzjgTreeviewIni(jgsz);
        },
        error: function () {
            //alert("树形结构加载失败！");
        }
    });
	
	
}

/**
 * 生成机构树
 * @returns
 */

function zzjgTreeviewIni(jgsz)
{
	var timestamp=Date.parse(new Date);
	var jgbm='31011600000';
	cxrq='2016-10-09';
	
    $.ajax({
        type: "get",
        url: "../../sjzlResource/zzjg?int=" + timestamp + "&jgbm=" + jgbm + "&cxrq=" + cxrq,
        dataType: "json",
        success: function (Result) {
            $('#treeview').treeview({
                data: Result,         // 数据源
                showCheckbox: true,   //是否显示复选框
                highlightSelected: true,    //是否高亮选中
                //nodeIcon: 'glyphicon glyphicon-user',    //节点上的图标
                color: "#428bca",
                expandIcon: "glyphicon glyphicon-plus",
                collapseIcon: "glyphicon glyphicon-minus",
                nodeIcon: "iconfont  icon_green_lt",
                emptyIcon: '',    //没有子节点的节点图标
                multiSelect: true,    //多选
                onNodeChecked: function (event,data) {
                    //                alert(data.nodeId);
                    setTimeout(setTreeNodeStateStyle, 10);
                },
                onNodeSelected: function (event, data)
                {
                    //jgbm = data.jgbm;
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                },
                //节点没有选中时重置样式
                onNodeUnselected: function (event,data)
                {
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                },
                //节点展开时重置样式
                onNodeExpanded: function (event,data)
                {
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                },
                //节点关闭后
                onNodeCollapsed:function (event,data)
                {
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                },
                //搜索结束
                onSearchComplete:function (event,data)
                {
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                },
                //搜索清除
                onSearchCleared:function (event,data)
                {
                    //延迟修改节点状态图标样式
                    setTimeout(setTreeNodeStateStyle, 5);
                }
            });

            //获取树的数据
           // treedata= $('#treeview').treeview('getEnabled');
			//window.alert(JSON.stringify(Result));
            //设置tree节点的图标
          

            //设置tree的状态图标颜色
            setTreeNodeStateStyle();
			
            //默认选中节点设置
           // $('#treeview').treeview('selectNode', 1);

            //给根节点设置ICON
            setRootNodeIconHandler();
			
			
			var jglist=Result[0].nodes;
				
			
			//window.alert("jglist"+JSON.stringify(jglist));
			$.each(jglist,function(index2,jsonobj2){
				for(var i=0;i<jgsz.length;i++){
					if(jsonobj2.jgbm==jgsz[i]){
						
						$('#treeview').treeview('getNode', index2+1).state.checked="true";
						//再次展开节点相当于刷新 才有效果
						$('#treeview').treeview('expandNode',0);
						 
					}
					
				}
				
				
			});

        },
		error:function(){
			window.alert("树形加载失败");
		}
     
    });

}

/**
 * 保存交换节点信息
 * @returns 0 1
 */

function savainfo()
{
	//timestamp=Data.parse(new Data());
	jdlx=$("#jdlx").val();
	
	jlzt=$("input[name='optionsRadiosinline']:checked").val();
	
	  $.ajax({
        type: "get",
		 url: "../../jdwhResource/saveinfo?jglsh=" + jglsh + "&jdlx=" + jdlx + "&jlzt=" + jlzt + "&int="+timestamp,
        dataType: "json",
        success: function (result) {
			if(result!="0"){
				window.alert("保存成功!");
				
			}else{
				
				window.alert("保存失败!");
			}
			
			
		}
    
    });
		
}
/**
 * 树搜索
 * @returns
 */

function serchTreeview(){
	//window.alert("search");
    $("#treeview").treeview('search', [ $("#search-input").val(), {
        ignoreCase: true,     // case insensitive
        exactMatch: false,    // like or equals
        revealResults: true,  // reveal matching nodes
    }]);
}
/**
 * 给根节点设置ICON
 * @returns
 */
function setRootNodeIconHandler()
{
    //给根节点设置ICON
    $('#treeview').treeview('getNode', 0).icon="iconfont icon-icon19";

    //匹配一个给定索引值的元素,从 0 开始计数
    var root_row =  $('#treeview').find('ul li[data-nodeid=0]').children().eq(1);
    $(root_row).attr('class','iconfont icon-icon19');
    $(root_row).css({ "color": "#27C432", "font-size":"12","vertical-align":"middle"});
}

function setTreeNodeStateStyle()
{

    $('#treeview ul li span').each(function(index, row)
    {
        var classStrValue = $(row).attr("class");

        if("icon node-icon iconfont icon-icon14 icon_green_lt" == classStrValue)
        {
            $(row).css({ "color": "#F55066", "font-size":"12","vertical-align":"middle"});
        }
        else if("icon node-icon iconfont icon-icon05 icon_green_lt" == classStrValue)
        {
            $(row).css({ "color": "#F55066", "font-size":"12","vertical-align":"middle"});

        }
        else if("icon node-icon iconfont icon-icon15 icon_green_lt" == classStrValue)
        {
            //父节点的间隔距离需要特殊对待
            if("0" == $(row).parent().attr("data-nodeid"))
            {
                $(row).css({ "color": "#FFFFFF", "display":"none"});
            }
            else
            {
                $(row).css({ "color": "#FFFFFF", "font-size":"12", "visibility":"hidden"});
            }
        }
    });
}