var fs = require('fs');
// var path = require('path');
module.exports = {
    modConfig: function (_filepath) {
        var jsonText = fs.readFileSync(_filepath, 'utf-8');
        var initialIndex = jsonText.indexOf('initial');
        var initalCamoIndex = jsonText.indexOf(',', initialIndex);
        var middleTxt = jsonText.substring(initialIndex, initalCamoIndex);
        middleTxt = middleTxt.replace('true', 'false');
        var newTxt = jsonText.substring(0, initialIndex) + middleTxt + jsonText.substr(initalCamoIndex);
        fs.writeFileSync(_filepath, newTxt);
    }
};
