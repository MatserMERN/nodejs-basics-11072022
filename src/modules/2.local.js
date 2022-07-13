var log = {
    info: function(info){
        console.log(`info: ${info}`)
    },
    warning: function(warning){
        console.log(`warning: ${warning}`)
    },
    error: function(error){
        console.log(`error: ${error}`)
    },
}

module.exports = log

module.exports.display = function(){

}

module.exports.id =100