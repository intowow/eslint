/**
 * @fileoverview Rule to flag when they are so many spaces between tokens
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
            Program(node) {
                var lines = sourceCode.text.split(/\n/);
                var message = "";
                var lastLine = null;
                lines.forEach(function forEachLine(line, index) {
                    var indent = line.match(/^\s*/)[0].length;
                    line = line.replace(/^\s*/, '');

                    if (lastLine === '' && line === '') {
                        context.report({
                            loc: {
                                start: {
                                    line: index + 1,
                                    column: 0
                                },
                                end: {
                                    line: index + 1,
                                    column: 0
                                }
                            },
                            message: "Too many new lines"
                        });
                    }

                    lastLine = line;

                    if (!line.match(/^\s*(\*|[\/])/)) {
                        var patt = /\s\s+[^$]/g;
                        var match = null;

                        while (match = patt.exec(line)) {
                            context.report({
                                loc: {
                                    start: {
                                        line: index + 1,
                                        column: indent + match.index
                                    },
                                    end: {
                                        line: index + 1,
                                        column: indent + match.index + match[0].length
                                    }
                                },
                                message: "Found " + match[0].length + " spaces between tokens"
                            });
                        }

                    }
                });

            }
        };
    }
};
