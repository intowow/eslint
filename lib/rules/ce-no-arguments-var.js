/**
 * @fileoverview Rule to flag when there is a variable called arguments on a function
 * @author Carlos A. Sanchez
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------
        
    return {
      FunctionDeclaration(node) {
        node.params.forEach(function forEachParam(param){
          if (param.name === 'arguments') {
            context.report({
              node: param,
              message: 'Parameter can\'t be named "arguments"'  
            });
          }
        });
      }
    };
  }
};
