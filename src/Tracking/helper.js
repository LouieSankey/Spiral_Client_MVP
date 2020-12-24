const { ModeCommentOutlined } = require("@material-ui/icons");

export function FormatTrackingHeader(time){

var hours = Math.floor(time / 60);
var minutes = time % 60;
let formattedTime = hours + " hours and " + minutes + " Minutes"
return formattedTime
}



