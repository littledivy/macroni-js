const acorn = require("acorn")
const estraverse = require("estraverse");
const astring = require("astring");
const { readFileSync } = require("fs");

const sourceFile = process.argv[2];
if(!sourceFile) throw new Error("Source file not provided.");

const source = readFileSync(sourceFile);

let ast = acorn.parse(source, { ecmaVersion: "2020" });

let macros = new Map();
ast = estraverse.replace(ast, {
    enter: function (node, parent) {
        if (node.type == 'FunctionDeclaration' &&  node.id.name.startsWith("macro__")) {
            let macro_name = node.id.name.split("macro__")[1];
            macros.set(macro_name, node.body);
            this.remove();
        }
        else if (node.type == 'CallExpression') {
            let callee = node.callee.name;
            if(macros.has(callee)) {
                return macros.get(callee);
            }
        }
    },
});

console.log(astring.generate(ast))