const isAdmin = require('../../../middlewares/isAdmin');
const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
module.exports = async ({ id, postId }, { id: userId }) => {
    await isAdmin(userId);
    return await models.comment
        .update(
            {
                isDeleted: 1,
            },
            { where: { id } },
        )
        .then((result) => {
            if (result[0] === 0) {
                return false;
            }
            createAdminLog(userId, `[Post: ${postId}, comment: ${id}] 댓글 삭제`);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
