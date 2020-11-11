import _api from "./apiCall";
import _config from "../public/config";

    // function Login(){
    //     var i;
    //     userName= "Raju";
    //     for (i=0; i< _config.userMapping.length; i++){
            
    //         if(userName == _config.userMapping[i].userName ){
    //             // return _config.userMapping[i].userName;
                
    //             continue;
    //         }
    //         else{
    //             return "Error";
    //         }
    //     }
    //    return userName;
    // // foreach(int i in _config.userMapping)
    //  }
 
    var activeUser = null;

(function () {
    console.log("-----Lib-init------");
   
    window.addEventListener("load", () => {
        debugger;
        document.getElementById("login").onclick =  (ev) => {
            var input = document.getElementById("myInput").value;
            var password = document.getElementById("myPassword").value;
            //alert(input);
            if(!input || !password){
                alert( "UserName or passwordcannot be null");
            }
            // else if(!password){
            //     alert("Password cannot be null");
            // }
            // else if(!input && !password){
            // alert("UserName and Password cannot be null")
            // }
            // int flag =0;
    //         for(i=0; i< _config.userMapping.length; i++)
    //         {
    //             if(input == _config.userMapping[i]){
    //                 Console.WriteLine(_config.userMapping[i]);
    //                 flag=1; 
    //             }
    //         }
    //         if(flag==0){
    //     Console.WriteLine("error");
    //   }
        }
    }, false);
    window.addEventListener("load", () => {
        console.log("------Win Load-----");
        document.addEventListener("click", (ev) => {
            console.log("---------doc click event -----");
            if (ev.target && ev.target.hasAttribute("data-logic-btn") && (ev.target.type === "button" || ev.target.type === "submit")) {
                const docId = ev.target.getAttribute("data-logic-docId");
                const docMode = ev.target.getAttribute("data-logic-mode");

                _api("controller/users", {})
                    .then(response => {
                        let doc = JSON.parse(response.data)[docId];
                        if (doc) {
                            if (docMode === "edit") {
                                window.open(doc.webUrl, "logic document", 'titlebar = no, toolbar = no, location = no, status = no, menubar = no');
                            } else if (docMode === "download") {
                                var link = document.createElement("a");
                                link.download = doc.name;
                                link.href = doc.downloadUrl;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }
                        }
                    })
                    .catch(error => alert(JSON.stringify(error)));
                console.log("---------event fired------");

            }
        });
    }, false);
}());