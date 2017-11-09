/**
 * @fileoverview Rule to flag when there is no or more than one space after if,while or for
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
            IfStatement(node) {
                if (node.start !== node.test.start - 4) {
                    context.report({
                        node: node,
                        message: 'There should be only one space before If statement openning parenthesis'
                    });
                }
            },
            WhileStatement(node) {
                if (node.start !== node.test.start - 7) {
                    context.report({
                        node: node,
                        message: 'There should be only one space before While statement openning parenthesis'
                    });
                }
            },
            ForStatement(node) {
                if (node.start !== node.init.start - 5) {
                    context.report({
                        node: node,
                        message: 'There should be only one space before For statement openning parenthesis'
                    });
                }
            },
            SwitchStatement(node) {
                if (node.start !== node.discriminant.start - 8) {
                    context.report({
                        node: node,
                        message: 'There should be only one space before Switch statement openning parenthesis'
                    });
                }
            },
            DoWhileStatement(node) {
                var token = sourceCode.text.substr(node.body.end, 7);
                if (node.body.end !== node.test.start - 8) {
                    context.report({
                        node: node.test,
                        message: 'There should be only one space before Do While statement openning parenthesis'
                    });
                }
                else if (token !== ' while ') {
                    context.report({
                        node: node.test,
                        message: 'Expected: " while ", Found: "' + token + '"'
                    });
                }

                if (node.start !== node.body.start - 3) {
                    context.report({
                        node: node,
                        message: 'There should be only one space before opening Brace'
                    });
                }
            }
        };
    }
};
