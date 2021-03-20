/* eslint-disable-next-line no-restricted-globals */
// let interval;

// self.addEventListener("message", function(event) {

//     let initial = event.data;

//     interval = () => this.postMessage(initial--)

//    if(initial > -1){

//     console.log("timer time start")

//     setInterval(interval, 1000);
//    }else{
//     console.log("timer time stop")

//     clearInterval(interval)
//    }
  
// })



let mytimer;

self.onmessage = function(evt) {
    console.log(evt.data)
    clearInterval(mytimer);

    // if(evt.data.message === 'start' || evt.data.message === 'stop') {
    //     clearInterval(mytimer);
    //   }

      if(evt.data.message === 'skip'){
  
        postMessage(0)
      }

      if(evt.data.message === 'stop'){

        postMessage(0)
      }


    if (evt.data.message == "start" || evt.data.message == "break") {
        var i = evt.data.time;
        
        mytimer = setInterval(function() {
            i--;
            postMessage(i);
        }, 1000);
        
    } 
    

};