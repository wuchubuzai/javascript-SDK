/*! wuchubuzai api javascript v1.0.0 http://www.wuchubuzai.com/ */

function getAPIUrl() {
    var env = getEnv();
    if (env == "production") {
        return "http://api.wuchubuzai.com";
    } else {
        return "http://" + env + ".api.wuchubuzai.com";
    }
}

function getSiteUrl() {
    var env = getEnv();
    if (env == "production") {
        return "http://www.wuchubuzai.com";
    } else {
        return "http://" + env + ".wuchubuzai.com";
    }
}

function wuchu_rest_api(url, action, query, callback, debug) {
    try {
/*
    	if (action.toLowerCase() != "get" && action.toLowerCase() != "post") {
            throw "Unsupported action";
        }
*/
        if ($.browser.msie) {
            var xdr = new XDomainRequest();
            if (query !== null) {
                if (action == "POST") {
                    xdr.open(action, url);
                    xdr.send($.param(query));
                } else if (action == "GET") {
                    xdr.open(action, url + "?" + $.param(query));
                }
            } else {
                xdr.open(action, url);
            }
            xdr.onload = function() {
                var data = $.parseJSON(this.responseText);
                callback(data);
            };
            xdr.send();
        } else {
            if (query !== null) {
                $.ajax({
                    url: url,
                    data: query,
                    type: action,
                    success: function(data) {
                        if (debug) console.log(data);
                        callback(data);
                    }
                });
            } else {
                console.log(query);
                $.ajax({
                    url: url,
                    type: action,
                    success: function(msg) {
                        if (debug) console.log(data);
                        callback(data);
                    }
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}