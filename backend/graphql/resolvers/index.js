const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    // User
    getUser: require('./user/getUser'),
    updateUser: require('./user/updateUser'),
    updateUserStatus: require('./user/updateUserStatus'),
    updateUserPassword: require('./user/updateUserPassword'),

    // Post
    getPostById: require('./post/getPost'),
    getPostsByBoardId: require('./post/getPostsByBoardId'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getMyPosts: require('./post/getMyPosts'),

    // Comments
    getCommentsByPostId: require('./comment/getCommentsByPostId'),

    // PostLike
    handlePostLike: require('./postLike/handlePostLike'),

    // Board
    getBoardById: require('./board/getBoard'),

    // Category
    getCategoryById: require('./category/getCategory'),
    getCategoriesByBoardId: require('./category/getCatogriesByBoardId'),

    // Comment
    createComment: require('./comment/createComment'),
};
