KeyValue.js
===

KeyValue.js is a minimalistic key value pair server for various uses

Project Status: PRODUCTION

Current Features:
* Supports CORS
* Get,Set,Delete keys
* In memory db
* Heroku support

Planned Features:
* mysql

Setup:
----

First, download the [heroku toolbelt](https://toolbelt.heroku.com/).

```Bash
git clone https://github.com/richardanaya/keyvalue.js.git
cd keyvalue.js
```

Look inside server.js at the top, there is a settings block.  Please choose the appropriate settings for your use.  If you don't have anything special, move on but remember:
* CORS is enabled by default (i.e. anyone in the world can use your key value server)
* There is no authorization by default

```Bash
heroku create
git push heroku master
heroku ps:scale web=1
heroku open
```

Using The Server:
---

```HTML
<script src="http://secret-server.herokuapp.com/kvp.js"></script>
```

```Javascript
//if your server isn't the same origin 
//(i.e. your not running the key value server on same machine as your site)
kvp.server = "http://secret-server.herokuapp.com/"

kvp.get("foo",
    function(val){

    }
);

kvp.set("foo","bar"
    function(){

    }
);

kvp.delete("foo"
    function(){

    }
);
```

Authorization:
---

In server.js there is a special function at the top named

```Javascript
var authorization = function(token){
    return true;
}
```

By default it just returns true, but you can use whatever logic you want based off a token that is passed from the client simply by:

```Javascript
kvp.authorization = "SOME_MAGIC_STRING_YOU_WANT_TO_AUTHORIZE"
```

It's passed as a header so don't go too crazy

Important Notes:
---
* The key value store is currently in memory only. I'd appreciate any help on different backend support.
* The key value store currently CORS enabled by default (i.e. anyone in the world can use your key value server). Be sure this is what you want.
