const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        departmentId: ID!
        studentNumber: String!
        studentGradeId: ID!
        companyId: ID!
        status: Int!
    }

    type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    input PostInput {
        boardId: ID!
        categoryId: ID!
        title: String!
        content: String!
    }

    input PostUpdateInput {
        title: String!
        content: String!
    }

    type Query {
        getUserInfo: User!
        getPostById(id: ID!): Post!
    }

    type Mutation {
        createPost(post: PostInput!): Post
        updatePost(id: ID!): Boolean
        deletePost(id: ID!): Boolean
    }
`);
