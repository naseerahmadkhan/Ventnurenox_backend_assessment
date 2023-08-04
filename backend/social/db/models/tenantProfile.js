const {Model} = require('objection')

class TenantProfile extends Model {
    static get tableName(){
        return 'tenant_profile';
    }

    static get idColumn() {
        return 'tenant_id';
      }

    

}

module.exports = TenantProfile