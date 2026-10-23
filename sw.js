self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('push',function(e){
  var d={};
  try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Văn Phòng Đêm',{
    body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||'vpd',data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var u=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if('focus' in cs[i])return cs[i].focus()}
    return self.clients.openWindow(u)}));
});
