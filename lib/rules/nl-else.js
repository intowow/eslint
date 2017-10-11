"use strict";

module.exports = {
  meta: {
    docs: {
      description: "",
      category: "Intowow Coding Conventions",
      recommended: true
    },

    schema: []
  },

  create(context) {
    const sourceCode = context.getSourceCode();


    return {
      IfStatement(node) {
        if( node.alternate ){
          if( node.alternate.loc.start.line === node.consequent.loc.end.line){
            context.report(node.alternate, "Else block should be declared in a new line after closing if block");
          }
          else if( node.alternate.loc.start.line !== node.consequent.loc.end.line+1){
            context.report(node.alternate, "Else block should be declared exactly after If block");
          }
        }
      }
    };
  }
};
