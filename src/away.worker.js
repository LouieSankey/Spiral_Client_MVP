
// let awayTimer;
/* eslint-disable-next-line no-restricted-globals */
self.onmessage = function(evt) {

    // let isAway = false
    console.log("worker responded")

    if (evt.data.message == "away") {
        setTimeout(() => {
            postMessage(true)
        }, 1000 * 15);
        
    } 
  
};