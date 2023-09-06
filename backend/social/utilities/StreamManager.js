const UserProfile = require('../db/models/userProfile')
const TenantProfile = require('../db/models/tenantProfile')
const processMessage = async (kafkaMessage) => {

	//Start working here
	// console.log('MSG >>>',kafkaMessage);
	let userObj = kafkaMessage.properties;
	let {user_id,first_name,last_name,department,designation,tenant_id,image_url,city,country,bio,social_links,employee_id} = userObj

      const newTenant = await TenantProfile.query().insert({
		tenant_id,
        
  
      });

	const newUser = await UserProfile.query().insert({
		user_id,
        first_name,
        last_name,
        department,
        designation,
        tenant_id,  
		image_url,    
        city,
		country,
		bio,
		social_links,
        employee_id
  
      });
		
	


};

module.exports = { processMessage };

