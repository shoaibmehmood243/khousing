const db = require('../Utilities/dbConfig');

class UserPermission {
    user_id;
    view;
    adding;
    edit;
    edit_with_banking;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.user_id = obj.user_id,
        this.view = obj.view || 1,
        this.adding = obj.adding || 1,
        this.edit = obj.edit || 0,
        this.edit_with_banking = obj.edit_with_banking || 0,
        this.is_active = obj.is_active || 1,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

module.exports = UserPermission;