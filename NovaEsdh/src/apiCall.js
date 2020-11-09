import _config from "../public/config";
 
const _api = function (url, option) {
    return new Promise((resolve, reject) => {
        GetToken().then(response => {
            let headers = { Authorization: `Bearer ${response.accessToken}` };
            let _option = { headers };
            if (option) {
                _option = { ..._option, ...option };
            }
            FetchApi(`${_config.baseUrl}/${url}`, _option)
                .then(_response => {
                    resolve(_response);
                    return _response;
                }).catch(error => {
                    reject(error);
                    return error;
                });
        }).catch(error => {
            reject(error);
            return error;
        });
    });
}
 
const GetToken = () => {
    return new Promise((resolve, reject) => {
        if (sessionStorage[_config.sessionTokenObj]) {
            let tokenObj = JSON.parse(sessionStorage[_config.sessionTokenObj]);
            // let expDate = new Date(tokenObj.expiresOn);
            // expDate.setMinutes(expDate.getMinutes() - 5);
            // if (expDate > (new Date())) {
                resolve(tokenObj);
                return tokenObj;
            // }
        } else if (_config.token && _config.token.trim() !== "") {
            resolve({ "accessToken": _config.token });
            return ({ "accessToken": _config.token });
        }
        FetchApi(_config.tokenEndPoint, {})
            .then(response => {
                sessionStorage[_config.sessionTokenObj] = JSON.stringify({ "accessToken":response["data"]});
                resolve({ "accessToken":response["data"]});
            }).catch(error => {
                reject(error);
                return error;
            })
    });
}
 
const FetchApi = (endPonit, option) => {
    let _response = responseModel();
    let _option = {};
    if (option) {
        _option = { ..._option, ...option };
    }
    return new Promise((resolve, reject) => {
        fetch(endPonit, option).then(response => {
            _response["ok"] = response.ok;
            _response["status"] = response.status;
            _response["statusText"] = response.statusText;
            if (response.ok) {
                return response.text();
            }
            throw new Error(response.statusText)
        }).then(response => {
            _response["data"] = response;
            resolve(_response);
        }).catch(error => {
            console.error(error);
            _response["statusText"] = error.message;
            reject(_response);
            return _response;
        })
    });
}
 
const responseModel = () => ({
    ["ok"]: false,
    ["status"]: "",
    ["statusText"]: "",
    ["data"]: null
});
 
export default _api;