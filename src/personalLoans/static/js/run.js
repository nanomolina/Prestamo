'use strict';

app.run(function(djangoAuth){
  djangoAuth.initialize('//127.0.0.1:8000/rest-auth', false);
});
