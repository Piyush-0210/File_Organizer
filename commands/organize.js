const fs = require("fs");
const path = require("path");
const types=require("./utility");
const color=require("colors");

function organizeFn(dirPath) {

    let destPath;
    if (dirPath == undefined) {
        organizeFn(process.cwd());
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {

            console.log(color.red("🙏 Kindly enter the correct path"));
            return;
        }
    }
    organizeHelper(dirPath, destPath);

}
function organizeHelper(src, dest) {

    let childNames = fs.readdirSync(src);
    
    let flag=false;
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            
            let category = getCategory(childNames[i]);
            console.log(color.green(childNames[i], "belongs to --> ", category));
            
            sendFiles(childAddress, dest, category);

            flag=true;
        }   
    }

    if(!flag)
    {
        console.log(color.blue("There are 0 files 🤷‍♂️"));
    }
    else
    console.log(color.rainbow(`
    
    
        Done, File Organized !!! 😇

    `))

    return;
}
function sendFiles(srcFilePath, dest, category) {
    
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(color.green(fileName, "copied to ", category));

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    organizeKey: organizeFn
}