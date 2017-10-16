/**
 * @fileoverview Rule to flag all undef declarations should be under def declarations
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
      recommended: false
    },

    schema: []
  },

  create(context) {
    var errorMessage = "An assigned variable should not be after an unassigned variable.";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * @param {ASTNode} node - any node
     * @returns {boolean} whether the given node structurally represents a directive
     */
    function looksLikeDirective(node) {
      return node.type === "ExpressionStatement" &&
        node.expression.type === "Literal" && typeof node.expression.value === "string";
    }

    /**
     * Check to see if its a ES6 import declaration
     * @param {ASTNode} node - any node
     * @returns {boolean} whether the given node represents a import declaration
     */
    function looksLikeImport(node) {
      return node.type === "ImportDeclaration" || node.type === "ImportSpecifier" ||
        node.type === "ImportDefaultSpecifier" || node.type === "ImportNamespaceSpecifier";
    }

    /**
     * Checks whether a given node is a variable declaration or not.
     *
     * @param {ASTNode} node - any node
     * @returns {boolean} `true` if the node is a variable declaration.
     */
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

    /**
     * Checks whether this variable is on top of the block body
     * @param {ASTNode} node - The node to check
     * @param {ASTNode[]} statements - collection of ASTNodes for the parent node block
     * @returns {boolean} True if var is on top otherwise false
     */
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

    /**
     * Checks whether variable is on top at the global level
     * @param {ASTNode} node - The node to check
     * @param {ASTNode} parent - Parent of the node
     * @returns {void}
     */
    function globalVarCheck(node, parent) {

      if (!isDefVarOnTop(node, parent.body)) {
        context.report({
          node,
          message: errorMessage
        });
      }
    }

    /**
     * Checks whether variable is on top at functional block scope level
     * @param {ASTNode} node - The node to check
     * @param {ASTNode} parent - Parent of the node
     * @param {ASTNode} grandParent - Parent of the node's parent
     * @returns {void}
     */
    function blockScopeVarCheck(node, parent, grandParent) {
      if (!(isDefVarOnTop(node, parent.body))) {
        context.report({
          node,
          message: errorMessage
        });
      }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

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
