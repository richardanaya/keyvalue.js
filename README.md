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
```

Look inside server.js at the top, there is a settings block.  Please choose the appropriate settings for your use.

```Bash
cd keyvalue.js
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
//if your server isn't the same origin (i.e. your not running the key value server on same machine as your site)
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

Important Notes:
---
* The key value store is currently in memory only. I'd appreciate any help on different backend support.
* The key value store currently CORS enabled by default (i.e. anyone in the world can use you for key value server). Be sure this is what you want.
