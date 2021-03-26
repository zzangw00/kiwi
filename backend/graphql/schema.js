const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        studentGradeId: ID!
        grade: String
        email: String
        departmentId: ID!
        department: String
        status: Int
        type: Int
    }

    type File {
        id: ID!
        postId: ID!
        fileName: String!
        fileType: String!
        fileUrl: String!
    }

    type Post {
        id: ID!
        userId: ID!
        authorId: ID!
        boardId: ID!
        boardName: String!
        boardLink: String
        categoryName: String
        title: String!
        content: String!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
        files: [File]
    }

    type PostAdmin {
        id: ID!
        userId: ID!
        department: String!
        authorId: ID!
        boardId: ID!
        boardName: String!
        boardLink: String
        categoryName: String
        title: String!
        content: String!
        isDeleted: Int!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
        files: [File]
    }

    type RecentPosts {
        boardId: ID!
        boardName: String!
        boardLink: String!
        boardIcon: String!
        posts: [RecentPost]
    }

    type RecentPost {
        id: ID!
        title: String!
        likeCount: Int
    }

    type PostAfterCreate {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type Comment {
        id: ID!
        userId: ID!
        postId: ID!
        authorId: ID!
        authorName: String!
        content: String!
        gradeId: ID!
        gradeName: String!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type CommentAfterCreate {
        id: ID!
        authorId: ID!
        postId: ID!
        content: String!
        createdAt: Date!
    }

    type Board {
        id: ID!
        boardName: String!
        link: String!
        icon: String
        isSpecial: Int
        createdAt: Date
        updatedAt: Date
    }

    type Category {
        categoryId: ID!
        boardId: ID!
        categoryName: String!
        createdAt: Date!
        updatedAt: Date
    }

    type CategoryList {
        categoryId: ID!
        boardId: ID!
        categoryName: String!
        boardName: String!
        createdAt: Date!
        updatedAt: Date
    }

    type PostList {
        id: ID!
        title: String!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }

    type SearchPostList {
        id: ID!
        title: String!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        likeCount: Int!
        commentCount: Int!
    }

    type GroupMember {
        memberId: ID!
        memberName: String!
        memberGradeName: String!
    }

    type Group {
        id: ID!
        departmentId: ID!
        title: String!
        userId: ID!
        masterId: ID!
        masterName: String!
        masterGradeName: String!
        createdAt: Date
        members: [GroupMember]
    }

    type GroupAfterCreate {
        id: ID!
        departmentId: ID!
        title: String!
        masterId: ID!
    }
    
    type GroupComment {
        id: ID!
        groupId: ID!
        userId: ID!
        authorId: ID!
        authorName: String!
        authorGradeName: String!
        content: String!
        createdAt: Date!
    }

    type GroupCommentAfterCreate {
        id: ID!
        groupId: ID!
        authorId: ID!
    }

    type Notification {
        id: ID!
        type: String!
        postId: ID
        commentId: ID
        groupId: ID
        title: String!
        titleLength: Int!
        count: Int!
        updatedAt: Date!
    }

    type Report {
        id: ID!
        userId: ID!
        userName: String!
        deptName: String!
        content: String!
        isCompleted: Int!
        createdAt: Date!
        updatedAt: Date
    }

    input GroupCommentInput {
        groupId: ID!
        content: String!
    }

    input UserUpdateInput {
        studentGradeId: ID!
    }

    input PostInput {
        boardId: ID!
        categoryId: ID
        title: String!
        content: String!
    }

    input PostUpdateInput {
        title: String!
        content: String!
    }

    input CommentInput {
        postId: ID!
        content: String!
    }

    input ReportInput {
        content: String!
    }

    type Query {
        getUser: User!
        getAllUsers: [User]
        getPostById(id: ID!): Post
        getPostsByBoardId(boardId: ID!, categoryId: ID, pageNumber: Int!, elementCount: Int!): [PostList]
        getPostsByLikeCount(likeCount: Int!, pageNumber: Int!, elementCount: Int!): [PostList]
        getPostsByLikeCountWithDay(term: Int!): [PostList]
        getRecentPosts: [RecentPosts]
        getCommentsByPostId(id: ID!): [Comment]
        getBoardById(id: ID!): Board!
        getBoards: [Board]
        getBoardByName(boardName: String!): Board
        getCategoryById(id: ID!): Category!
        getCategoriesByBoardId(boardId: ID!): [CategoryList]
        getMyPosts(pageNumber: Int!, elementCount: Int!): [PostList]
        getMyComments(pageNumber: Int!, elementCount: Int!): [Comment]
        getPostsCountByBoardId(boardId: ID!, categoryId: ID): Int
        getPostsCountByLikeCount(likeCount: Int!): Int
        getMyPostsCount: Int
        getMyCommentsCount: Int
        searchPostsByBoardId(boardId: ID!, searchValue: String!, pageNumber: Int!, elementCount: Int!): [SearchPostList]
        getSearchPostsCount(boardId: ID!, searchValue: String!): Int
        getGroup(id: ID!): Group
        getMyMasterGroups: [Group]
        getMyGroups: [Group]
        getGroupComments(groupId: ID!): [GroupComment]
        getScrapById(pageNumber: Int!, elementCount: Int!): [PostList]
        getScrapCount: Int!
        getMyNotifications: [Notification]
        getNotificationsCount: Int
        getReports(isCompleted: Int!): [Report]
    }

    type Mutation {
        updateUser(user: UserUpdateInput!): Boolean
        updateUserStatus(status: Int!): Boolean
        updateUserPassword(currentPassword: String!, newPassword: String!): Boolean
        updateType(id: String!, type: String!): Boolean
        createPost(post: PostInput!): PostAfterCreate
        updatePost(id: ID!, post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
        handlePostLike(postId: ID!): String
        createComment(comment: CommentInput!): CommentAfterCreate
        deleteComment(id: ID!): Boolean
        handleCommentLike(commentId: ID!): String
        createGroup(title: String!): GroupAfterCreate
        inviteGroupMember(groupId: ID!, memberId: ID!): Boolean
        quitGroupMember(groupId: ID!, memberId: ID!): Boolean
        selfQuitGroupMember(groupId: ID!): Boolean
        createGroupComment(comment: GroupCommentInput!): GroupCommentAfterCreate
        deleteGroup(id: ID!): Boolean
        deleteGroupComment(id: ID!): Boolean
        seenNotification(id: ID!): Boolean
        scrapPost(postId: ID!): String
        seenAllNotifications: Boolean
        createReport(report: ReportInput!): Boolean
        completeReport(id: ID!): Boolean
        searchUserByStudentNumber(studentNumber: String!): User!
        searchUserByUserId(id: String!): User!
        updateStatus(status: String!, id: String!): Boolean
        getPostByAdmin(postId: ID!): PostAdmin!
    }
`);
