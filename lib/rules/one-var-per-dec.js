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

    return {
      VariableDeclaration(node) {
        if (node.declarations.length > 1) {
          context.report(node, "Use only one var declaration per variable.");
        }
      }
    };
  }
};
