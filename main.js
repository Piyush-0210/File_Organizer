#!/usr/bin/env node //🙏 <!!!shebang syntax!!!> this is the most important thing this help the os in which envirment this script should run

const helpFn=require("./commands/help").helpKey;
const organizeFn=require("./commands/organize").organizeKey;
const treeFn=require("./commands/tree").treeKey;
const color=require("colors");

const inputArr = process.argv.slice(2);

let command = inputArr[0];

switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn()
        break;
    default:
        console.log(color.red("Please 🙏 Input Right command"));
        break;
}