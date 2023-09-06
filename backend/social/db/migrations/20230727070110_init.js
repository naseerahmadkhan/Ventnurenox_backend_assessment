/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {

    return knex.schema
    .createTable('tenant_profile',(table)=>{
            table.increments('tenant_id').primary();
            table.string('tenant_name',255).nullable();
            table.string('address',255).nullable();
            table.string('city',255).nullable();
            table.string('country',255).nullable();
            table.string('zip_code',255).nullable();
            table.string('phone',255).nullable();
            table.string('web_url',255).nullable();
    })
    .createTable('user_profile',(table)=>{
              table.increments('user_id').primary();
              table.string('first_name',255).nullable();
              table.string('last_name',255).nullable();
              table.string('department',255).nullable();
              table.string('designation',255).nullable();
              table.integer('tenant_id').unsigned();
              table.foreign('tenant_id').references('tenant_profile.tenant_id');
              table.string('image_url',255).nullable();
              table.string('city',255).nullable();
              table.string('country',255).nullable();
              table.string('bio',255).nullable();
              table.json('social_links',255);
              table.integer('employee_id').unsigned();
    })
    
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tenant_profile')
  .dropTableIfExists('user_profile')
};
