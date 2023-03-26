$(function(){
     
    chrome.storage.local.get("classes", function(result){
        
        if (result.classes == null){
            console.log("null")

            var classes_list = []

            chrome.storage.local.set({"classes": classes_list}, function(){});

        }


    });

});