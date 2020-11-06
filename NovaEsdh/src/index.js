import _api from "./apiCall";
import _config from "../dist/config";
import GetToken from "./apiCall";
 
(function () {
    console.log("-----Lib-init------");
 
    window.addEventListener("load", () => {
        // _api("me/drive/root/children", {}).then(response => alert('OK')).catch(error => alert(error.toString()));
    }, false);
    window.addEventListener("load", () => {
        console.log("------Win Load-----");
        document.addEventListener("click", (ev) => {
            console.log("---------doc click event -----");
            if (ev.target && ev.target.hasAttribute("data-logic-btn") && (ev.target.type === "button" || ev.target.type === "submit")) {
                //alert("button click");
                _api("me/drive/root/children", {})
                .then(response => {
                    let doc = response.data.value[0].webUrl;
                    if (doc) {
                        window.open(doc, "logic document", 'titlebar = no, toolbar = no, location = no, status = no, menubar = no');
                    }  
//                 GetToken().then(response => {
// return response.json();
                })
                // })
                 .catch(error => alert(JSON.stringify(error)));
                console.log("---------event fired------");
                
            }
        });
    }, false);
}());