
let mytimer;
let myInterval;
/* eslint-disable-next-line no-restricted-globals */
self.onmessage = function(evt) {
    clearInterval(myInterval);
    clearTimeout(mytimer)


    if(evt.data.message === 'away'){

      myTimer = setTimeout(() => {
        postMessage(true)
      }, 1000 * 10);
     
    }

      if(evt.data.message === 'pause' || evt.data.message === 'stop' || evt.data.message === 'skip'){
        postMessage(evt.data.time)
      }

    if (evt.data.message == "start" || evt.data.message == "break") {
        var i = evt.data.time;
        myInterval = setInterval(function() {
            i--;
            postMessage(i);
        }, 1000);
        
    } 
  
};