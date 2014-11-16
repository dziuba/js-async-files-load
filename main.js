/* http://jeremyhixon.com/snippet/loading-javascript-files-asynchronously/ */

function getScript(url,success){
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0], done=false;
    script.onload = script.onreadystatechange = function(){
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done=true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}

/* 

function loadFiles(list, success, count){
  if(typeof count === 'undefined') count = list.length;
  
  if(count === -1) success();
  
  count--;
  getScript(list[count], function(){
    loadFiles(list, success, count);
    });
  
}
