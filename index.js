var _= require('underscore');
exports.printMessage=(obj,cb)=>{
    var names=["a","b"];
    console.log(_.map(names,(ele)=>{
        return ele;
    }));
    if("name" in  obj){
        console.log("entered name is: "+obj.name);
        cb(false, { "message": "entered name is: " + obj.name });
    } else {
        cb(true,{"message":"Invalid object format"});
    }
    console.log("This message is fron npm");
};
console.log("called index.js");

// var pk = require('new-test-package')
// printMessage({  }, (err, response) => {
//     if (err) {
//         console.log(err);
//         console.log(response);
//     } else {
//         console.log(response);
//     }
// });