function AsyncLoader(){
	var list = [];
	var count = 0;
	this.insert = function(url){
		list.push(url);
	}
	
	this.load = function(){
		filesLoad(function(){
			console.log("Wczytano pliki");
		});
	}
		
	var getScript = function(url, success){
		var script = document.createElement('script');
		script.src = url;
		var head = document.getElementsByTagName('head')[0], done=false;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
				done=true;
				if (success) success();
				script.onload = script.onreadystatechange = null;
				//head.removeChild(script);
			}
		};
		head.appendChild(script);
	}

	var filesLoad = function(finish){
		if(count === list.length){
			if(finish) finish();
		}else{
			getScript(list[count], function(){
				count++;
				filesLoad();
			});
		}
	}

}
var al = new AsyncLoader();

al.insert("http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js");
al.insert("http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js");

al.load();
