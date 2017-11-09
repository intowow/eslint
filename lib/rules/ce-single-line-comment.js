/**
 * @fileoverview flag when multiline comment doesn't follow the format:
 *                                 
 *   single line comments should be declared before and not beside
 *   the code                   
 *
 * @author Carlos A. Sanchez
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
var lineComments = [];

module.exports = {
    meta: {
        docs: {
            description: "Use only single line comments before the instruc",
            category: "Intowow Coding Conventions",
            recommended: false
        },
        schema: []
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Program(node) {
                lineComments = node.comments.filter(function (comment) {
                    return comment.type === 'Line';
                });
            },
            ExpressionStatement(node) {
                var line = node.loc.start.line;
                lineComments.forEach(function (comment) {
                    if (comment.loc.start.line === line) {
                        context.report({
                            node: comment,
                            message: 'single line comments should be declared before the expression stament'
                        });
                    }
                });
            },
            BlockStatement(node) {
                var line = node.loc.start.line;
                lineComments.forEach(function (comment) {
                    if (comment.loc.start.line === line) {
                        context.report({
                            node: comment,
                            message: 'single line comments should be declared before the block statement'
                        });
                    }
                });
            },
            VariableDeclaration(node) {
                var line = node.loc.start.line;
                lineComments.forEach(function (comment) {
                    if (comment.loc.start.line === line) {
                        context.report({
                            node: comment,
                            message: 'single line comments should be declared before the variable declaration'
                        });
                    }
                });
            },
            ReturnStatement(node) {
                var line = node.loc.start.line;
                lineComments.forEach(function (comment) {
                    if (comment.loc.start.line === line) {
                        context.report({
                            node: comment,
                            message: 'single line comments should be declared before the return statement'
                        });
                    }
                });
            }
        };
    }
};
