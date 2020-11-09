import _api from "./apiCall";
import _config from "../public/config";

(function () {
    console.log("-----Lib-init------");

    window.addEventListener("load", () => {
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