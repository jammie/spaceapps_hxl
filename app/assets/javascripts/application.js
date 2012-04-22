// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
function randomString(){
    var adjs = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"
    ];
    var  nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star"
    ];
    var rnd = Math.floor(Math.random()*Math.pow(2,12))
    return adjs[rnd>>6%64]+"_"+nouns[rnd%64]
}
$(function(){
    $("#menu li a").bind("click", function(){
        $("body iframe").attr("src", $(this).attr("href"));
        return false;
    });
    
    // highlight table
    $("table tr").mouseover(function(){
        $(this).addClass("over");
    }).mouseout(function(){
        $(this).removeClass("over");
    });
    
    $("table tr:even").addClass("alt");
    
    //export to hxl - get and set selected data
    $("table input[type=checkbox]").bind("click", function(e){
        
        // Put the object into storage
        
        if(typeof(Storage)!=="undefined")
        {
            var selectedItemForm = JSON.parse(localStorage['selectedItemForm']);
            if(selectedItemForm === null){
                selectedItemForm = []
            };
            if($(this).is(":checked")){
                selectedItemForm.push($("#"+e.target.id).parent("td").parent("tr").attr("id"))    
            }else{
                selectedItemForm.pop($("#"+e.target.id).parent("td").parent("tr").attr("id"))  
            }
            
        
            localStorage.setItem('selectedItemForm', JSON.stringify(selectedItemForm));
        }
        else
        {
            // Sorry! No web storage support..
            console.log("No web Storage")
        }
       
    });
    
    // export to hxl
    $("#export-hxl").bind("click", function(){
        var selectedItemForm = JSON.parse(localStorage['selectedItemForm']);
        var data = {};
        var dataVal = [];
        var dataLength;
        var dataHeader=[];
        for(var i in selectedItemForm){
            var item = $("#"+selectedItemForm[i]);
            dataLength = item.children("td").length;
            for(var j=0 ; j <= item.children("td").length ; j++){
                if(j > 0 && item.children("td")[j] !== undefined){
                    dataVal.push(item.children("td")[j].innerText);
                    if(dataHeader.length < dataLength - 1){
                        dataHeader.push("column"+j);
                    }
                }
                    
            };
            //dataLength -1 beacuse removing the checkbox
            data= {
                length : dataLength - 1, 
                header:dataHeader, 
                values:dataVal
            }
        //     items.each(function( j ) {
        //         console.log(j);
        //         var head= [];
        //         $("td", this).each(function( j ) {
        //             head["column" + j] = $(this).text()
        //            data.push(head );
        //        });
        //   });
        };
        if($("#jkachiro-box").length > 0){
            $("#jkachiro-box").remove();  
        };
        $("body").append("<div id='jkachiro-box'><div class='header'>Import Data to HXL - <a href='#' onclick='$(\"#jkachiro-box\").remove()'>Close</a></div><div class='content'>test</div><div class='footer'>Jkachiro-box</div></div>");
        $("#jkachiro-box").css({
            "z-index": 10000, 
            "position": "absolute", 
            "top":"25%", 
            "left":"25%",
            "width": "700px",
            "height": "500px"
        });
        var projectName = "";
        var d =  new Date();
        var currentDTime = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
        var currentContainer = randomString();
        var projectName = $("#project-name").val();
        var dataProject = "&lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; &lt;http://purl.org/dc/terms/created&gt; &quot;"+currentDTime+"&quot; .";
        dataProject += "&lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#type&gt; &lt;http://hxl.humanitarianresponse.info/#DataContainer&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/person/"+projectName+"&gt; &lt;http://xmlns.com/foaf/0.1/name&gt; &quot;"+projectName+"&quot; .";
        dataProject += "&lt;http://hxl.carsten.io/person/"+projectName+"&gt; &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#type&gt; &lt;http://xmlns.com/foaf/0.1/Person&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; &lt;http://hxl.humanitarianresponse.info/#reportedBy&gt; &lt;http://hxl.carsten.io/person/"+projectName+"&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/organisation/"+projectName+"&gt; &lt;http://hxl.humanitarianresponse.info/#orgDisplayName&gt; &quot;"+projectName+"&quot; .";
        dataProject += "&lt;http://hxl.carsten.io/organisation/"+projectName+"&gt; &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#type&gt; &lt;http://hxl.humanitarianresponse.info/#Organisation&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; &lt;http://hxl.humanitarianresponse.info/#reportedBy&gt; &lt;http://hxl.carsten.io/organisation/"+projectName+"&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/organisation/"+projectName+"&gt; &lt;http://xmlns.com/foaf/member/&gt; &lt;http://hxl.carsten.io/person/"+projectName+"&gt; .";
        dataProject += "&lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; &lt;http://hxl.humanitarianresponse.info/#containsPrimaryData&gt; &quot;"+dataVal+"&quot; .";
        $("#jkachiro-box .content").append("<p>Project Name: <span>"+projectName+"</span></p>");
        $("#jkachiro-box .content").append("<p>Import tag: <input id='project-tag'></input></p>");
        $("#jkachiro-box .content").append("<p>Data: <textarea id='project-tag' disabled='disabled' >"+dataProject+"</textarea></p>");
        var hidden_field = "<input id='update' name='update' type='hidden' value='CREATE GRAPH &lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; INSERT DATA INTO &lt;http://hxl.carsten.io/datacontainer/"+currentContainer+"&gt; {"+dataProject+"}'/>";
        $("#jkachiro-box .content").append("<p><form id='submitform' action='http://83.169.33.54:8080/parliament/sparql' method='POST' target='updateFrame'>"+hidden_field+" <input type='submit' id='submitHXL' value='Submit HXL File' onclick='$(\"#jkachiro-box .content\").append(\" Submitted To :http://hxl.carsten.io/datacontainer/"+currentContainer+"\")'></form>");
        $("#jkachiro-box .content").append("<iframe src='/' width='0px' height='0px' id='updateFrame' border='0' frameborder='0'></iframe>");
        localStorage['selectedItemForm'] = nil;
    });
});
