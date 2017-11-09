/**
 * @fileoverview Rule to flag when there is more than one variable after a var token
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

        //--------------------------------------------------------------------------
        // Public API
        //--------------------------------------------------------------------------

        return {
            VariableDeclaration(node) {
                if (node.declarations.length > 1) {
                    context.report(node, "Use only one var declaration per variable.");
                }
            }
        };
    }
};
