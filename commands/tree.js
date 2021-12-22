const fs = require("fs");
const path = require("path");
const color=require("colors");

function treeFn(dirPath) {
    
    if (dirPath == undefined) {

        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log(color.red("Kindly enter the correct path"));
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(color.green(indent + "├──" + fileName));
    } else {
        let dirName = path.basename(dirPath)
        console.log(color.green(indent + "└──" + dirName));
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}