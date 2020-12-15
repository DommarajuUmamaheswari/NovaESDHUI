import _api,{GetToken} from "./apiCall";
import _config from "../public/config";

   
 
    var activeUser = null;

(function () {
    console.log("-----Lib-init------");
   
    window.addEventListener("load", () => {
 
        let resetLogin = function () {
            document.getElementById("container").style.display = "none";
            document.getElementById("lblActiveUser").innerHTML = "";
            document.getElementById("lblActiveUser").style.display = "none";
            document.getElementById("inputUserName").value = "";
            document.getElementById("inputPassword").value = "";
        }
        resetLogin();
 
        document.getElementById("btnLoginPopup").onclick = (ev) => {
            resetLogin();
            document.getElementById('loginPopup').style.display = 'block';
        };
 
        document.getElementById("btnCancel").onclick = (ev) => {
            resetLogin();
            document.getElementById('loginPopup').style.display = 'none';
        };
 
        document.getElementById("btnLogout").onclick = (ev) => {
            resetLogin();
            document.getElementById("btnlogin").style.display = "inline-block";
            document.getElementById("btnLogout").style.display = "none";
            sessionStorage[_config.sessionTokenObj] = '';
            sessionStorage["activeUser"] = '';
        };
 
        document.getElementById("btnlogin").onclick = (ev) => {
            var userName = document.getElementById("inputUserName").value;
            var password = document.getElementById("inputPassword").value;
 
            if (!userName || !(userName.trim())) {
                alert("Please enter UserName");
                return;
            }
            if (!password || !(password.trim())) {
                alert("please enter Password");
                return;
            }
            let user=_config.userMapping.filter(x=>x.uiUser===userName && x.uiPassword===password);
            if(user.length < 1){
                alert("Invalid username and password");
                return;
            }
 user=user[0];
            sessionStorage["activeUser"] = `userName=${user.userName}&password=${user.password}`;
            GetToken().then(response => {
                document.getElementById('loginPopup').style.display = "none";
                document.getElementById("lblActiveUser").innerHTML = `<b>User:${userName}</b>`;
                document.getElementById("lblActiveUser").style.display = "block";
                document.getElementById("btnlogin").style.display = "none";
                document.getElementById("btnLogout").style.display = "block";
                document.getElementById("container").style.display = "block";
            }).catch(error => {
                alert(error);
                return;
            });
 
            // _api(`api/Token/tokenforuser?userName=${userName}&password=${password}`, {})
            //     .then(response => {
            //         if (response.status === 200) {
 
            //             document.getElementById('loginPopup').style.display = 'none';
            //             document.getElementById("lblActiveUser").innerHTML = `<b>${userName}</>b`;
            //             document.getElementById("btnlogin").style.display = "none";
            //             document.getElementById("btnLogout").style.display = "block";
 
            //             return userName;
            //         }
            //     })
            //     .catch(error => {
            //         alert(error);
            //         return;
            //     })
 
        }
    }, false);
    window.addEventListener("load", () => {
        console.log("------Win Load-----");
        document.addEventListener("click", (ev) => {
            console.log("---------doc click event -----");
            if (ev.target && ev.target.hasAttribute("data-logic-btn") && (ev.target.type === "button" || ev.target.type === "submit")) {
                const docId = ev.target.getAttribute("data-logic-docId");
                const docMode = ev.target.getAttribute("data-logic-mode");

                //_api("controller/users", {})
                let kommune = null;
                let user=null;
                if (sessionStorage["activeUser"] && sessionStorage["activeUser"].trim()) { 
 
                    kommune=sessionStorage["activeUser"].split("&")[0].split("=")[1];
                    user=`${sessionStorage["activeUser"].split("&")[0]}@novaesdhtest.onmicrosoft.com`;
                }
                //_api(`controller/users/${kommune}?${user}`, {})
                _api(`controller/users/sharePoint/${kommune}`, {})
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