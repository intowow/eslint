/**
 * @fileoverview flag when multiline comment doesn't follow the format:
 *                                 
 *                   /**
 *                    * BLOCK COMMENTS
 *                    */
/**
 * @author Carlos A. Sanchez
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Use only single line comments with // and not /* */",
            category: "Intowow Coding Conventions",
            recommended: false
        },
        schema: [
        ]
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Program() {
                /**
                 * A valid vaue for a comment looks like: "*\n * BLOCK COMMENTS\n * LINE 2\n * LINE 3\n * LINE 4\n "
                 * so based on this example we create the following Regex
                 */

                const comments = sourceCode.getAllComments();

                var blockComments = comments.filter(function filterBlockComments(comment){
                    return comment.type === 'Block';
                });

                blockComments.forEach(function forEachBlockComment(comment){
                    if( comment.loc.start.line === comment.loc.end.line ) {
                        context.report({
                          node: comment,
                          message: 'single line comments should be with single comment // mark'
                        });
                    }
                    else {
                        var lines = comment.value.split(/\n/);
                        var tab = comment.loc.start.column + 1;
                        var lineRegex = new RegExp('^\\s{' + tab + '}\\*(.*)');
                        var lastLineRegex = new RegExp('^\\s{' + tab + '}$');

                        if (!lines[0].match(/^\*\s*$/)) {
                            context.report({
                              loc: comment.loc,
                              message: 'Block message should start with "/**\\n" ' ,
                            });
                        } 

                        for (var i = 1 ; i < lines.length -1 ; i++) {
                            if (!lines[i].match(lineRegex)) {
                                context.report({
                                  loc: {
                                    start: {
                                        line: comment.loc.start.line + i,
                                        column: comment.loc.start.column
                                    },
                                    end: comment.loc.end,
                                  },
                                  message: 'Block message should follow the format: " * <COMMENT_TEXT> "',
                                });
                            }
                        }

                        if (!(lines[lines.length-1].match(lastLineRegex))) {
                            context.report({
                              loc: {
                                start: {
                                    line: comment.loc.start.line + lines.length-1,
                                    column: comment.loc.start.column
                                },
                                end: comment.loc.end,
                              },
                              message: 'Block message should finish with only "*/"',
                            });
                        } 
                    }
                });
            }
        };
    }
};
