var kvp = {};

kvp.server = location.origin;
kvp.authorization = "";

kvp.uuid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

kvp.guid = kvp.uuid;

kvp.get = function(key,complete,fail)
{
    if(key === null || key===undefined || key==""){
        if(fail){
            fail("Invalid key");
        }
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                complete(xhr.responseText);
            }
            else {
                fail("Key did not exist")
            }
        }
    }
    xhr.onerror = function(err){
        fail("Networking error");
    };
    xhr.open('GET', kvp.server+'/data?key='+key, true);
    xhr.setRequestHeader("KVPAuthorization", kvp.authorization);
    xhr.send(null);
};

kvp.set = function(key,value,complete,fail)
{
    if(key === null || key===undefined || key==""){
        if(fail){
            fail("Invalid key");
        }
        return;
    }
    if(typeof(value) != "string"){
        if(fail){
            fail("Invalid value");
        }
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", kvp.server+'/data?key='+key, true);
    xhr.setRequestHeader("Content-Type", "application/text");
    xhr.setRequestHeader("KVPAuthorization", kvp.authorization);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            if(complete){
                complete();
            }
        }
    }
    xhr.onerror = function(err){
        fail("Networking error");
    };
    xhr.send(value);
};

kvp.delete = function(key,complete,fail)
{
    if(key === null || key===undefined || key==""){
        if(fail){
            fail("Invalid key");
        }
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                complete();
            }
        }
    }
    xhr.onerror = function(err){
        fail("Networking error");
    };
    xhr.open('DELETE', kvp.server+'/data?key='+key, true);
    xhr.setRequestHeader("KVPAuthorization", kvp.authorization);
    xhr.send(null);
};