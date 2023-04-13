class PropertyUnit {
    unit;
    property_id;
    bedroom;
    bathroom;
    created_at;
    updated_at;
    is_active;

    constructor(obj) {
        this.unit = obj.unit,
        this.property_id = obj.property_id,
        this.bedroom = obj.bedroom,
        this.bathroom = obj.bathroom,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at,
        this.is_active = obj.is_active || 1
    }
}

module.exports = PropertyUnit;