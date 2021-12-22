const color=require("colors");

function helpFn() {
    console.log(color.green(`
    List of All the commands:
                 node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
    `));
    return;
}

module.exports={
    helpKey: helpFn
}