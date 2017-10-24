/**
 * @fileoverview Rule to flag else in same line as closng if
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
      ArrayExpression(node) {
        var token = null;
        var messages = [];
        for (var index = 1; index < node.elements.length ; index++) {
          token = sourceCode.text.substring(node.elements[index-1].end,node.elements[index].start);
          if (!token.match(/^,\n?\s*$/)) {
            context.report({
              node: node.elements[index],
              message: 'Array elements no well seperated, Expected ",\\n\\s*" or ",\\s*" Found:' + token.replace(/\s/g,'\\s').replace(/\n/g,'\\n')
            });
          }
          messages.push(token);
        } 
      }
    };
  }
};
