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
                var validBlockCommentNoTab = /^\*\n\s+(\*\s.*\n)+\s+$/;
                
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
                        
                        if( comment.value.match(validBlockCommentNoTab) ){
                            var tab = comment.loc.start.column + 1;
                            var validBlockComment = new RegExp('^\\*\\n\\s{' + tab + '}(\\*\\s.*\\n)+\\s{' + tab + '}$');
                            if( !comment.value.match(validBlockComment) ){
                                context.report({
                                  node: comment,
                                  message: 'Wrong Block comment indentation'
                                });
                            }
                        } 
                        else {
                            context.report({
                              node: comment,
                              message: 'Invalid Block comment format expect: /**\\n * BLOCK\\n * COMMENT \\n */'
                            });
                        }
                    }
                });

            }
        };
    }
};
