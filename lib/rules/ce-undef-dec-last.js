"use strict";

module.exports = {
  meta: {
    docs: {
      description: "",
      category: "Intowow Coding Conventions",
      recommended: false
    },

    schema: []
  },

  create(context) {
    var errorMessage = "An assigned variable should not be after an unassigned variable.";

    function looksLikeDirective(node) {
      return node.type === "ExpressionStatement" &&
        node.expression.type === "Literal" && typeof node.expression.value === "string";
    }

    function looksLikeImport(node) {
      return node.type === "ImportDeclaration" || node.type === "ImportSpecifier" ||
        node.type === "ImportDefaultSpecifier" || node.type === "ImportNamespaceSpecifier";
    }

    function isVariableDeclaration(node) {
      return (
        node.type === "VariableDeclaration" ||
        (
          node.type === "ExportNamedDeclaration" &&
          node.declaration &&
          node.declaration.type === "VariableDeclaration"
        )
      );
    }

    function isDefVarOnTop(node, statements) {
      const l = statements.length;
      let i = 0;

      // skip over directives
      for (; i < l; ++i) {
        if (!looksLikeDirective(statements[i]) && !looksLikeImport(statements[i])) {
          break;
        }
      }

      for (; i < l; ++i) {
        if (!isVariableDeclaration(statements[i])) {

        }
        else {
          if (node.declarations[0].init !== null && statements[i].declarations[0].init === null) {
            return false;
          }

          if (statements[i] === node) {
            return true;
          }

        }
      }

      return true;
    }

    function globalVarCheck(node, parent) {

      if (!isDefVarOnTop(node, parent.body)) {
        context.report({
          node,
          message: errorMessage
        });
      }
    }

    function blockScopeVarCheck(node, parent, grandParent) {
      if (!(isDefVarOnTop(node, parent.body))) {
        context.report({
          node,
          message: errorMessage
        });
      }
    }

    return {
      VariableDeclaration(node) {
        const ancestors = context.getAncestors();
        let parent = ancestors.pop();
        let grandParent = ancestors.pop();

        if (node.kind === "var") { // check variable is `var` type and not `let` or `const`
          if (parent.type === "ExportNamedDeclaration") {
            node = parent;
            parent = grandParent;
            grandParent = ancestors.pop();
          }

          if (parent.type === "Program") { // That means its a global variable
            globalVarCheck(node, parent);
          }
          else {
            blockScopeVarCheck(node, parent, grandParent);
          }
        }
      }
    };

  }
};
