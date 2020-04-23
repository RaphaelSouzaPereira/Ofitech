module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(servicos => servicos.trim());
    }