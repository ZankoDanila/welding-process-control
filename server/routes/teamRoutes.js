
const express = require('express');
const router = express.Router();

const {
    getTeam,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
} = require('../controllers/teamController');

router.get('/', getTeam);
router.get('/:id', getTeamMemberById);
router.post('/', createTeamMember);
router.put('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
