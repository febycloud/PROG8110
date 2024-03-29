var CACHE_NAME="gih-cache";
var CACHE_URLS=[
  "/index-offline.html",
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
  "/css/gih-offline.css",
  "/img/jumbo-background-sm.jpg",
  "/img/logo-header.png"
];

self.addEventListener("install",function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      console.log("cache running");
      return cache.addAll(CACHE_URLS);
    })   
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response){
        if(response){
        return response;
        }else if(event.request.headers.get("accept").includes("text/html")){
          return caches.match("/index-offline.html");
        }      
      });
      
    })
  );
});