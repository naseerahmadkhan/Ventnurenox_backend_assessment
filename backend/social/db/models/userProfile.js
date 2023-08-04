const { Model } = require("objection");

class UserProfile extends Model {
  static get tableName() {
    return "user_profile";
  }

  //for custom id
  static get idColumn() {
    return "user_id";
  }

  /* 
  !Example-1:     1:1
  relation: Model.BelongsToOneRelation,
      join: {
                    from: 'user_profile.tenant_id',
                    to: 'tenant_profile.tenant_id',
                  },
 @  The relation specifies that each record in the "user_profile" table belongs to one record in the "tenant_profile" table 

 !Example-2:     1:Many
      pets: {
              relation: Model.HasManyRelation,
              modelClass: Animal,
              join: {
                from: 'persons.id', // The 'id' column in the persons table
                to: 'animals.ownerId', // The 'ownerId' column in the animals table
              },
            },

            
 @ The relation represents a one-to-many relationship, 
   indicating that a person (in the "persons" table) can have multiple animals (in the "animals" table).            

 */

   //table name tenant_profile
   //BelongsToOneRelation,HasManyRelation,HasOneRelation,ManyToManyRelation
  static get relationMappings() {
    const TenantProfile = require("./tenantProfile");
    return {
      tenant_profile: {
        relation: Model.BelongsToOneRelation,  
        modelClass: TenantProfile,
        join: {
          from: "user_profile.tenant_id",
          to: "tenant_profile.tenant_id",
        },
      },
    };
  }
}

module.exports = UserProfile;
