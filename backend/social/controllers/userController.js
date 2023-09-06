const UserProfile = require('../db/models/userProfile');

// Controller to create a new user
exports.create = async (req, res, next) => {
  try {
    // const userData = req.body;
    const userData = {
        first_name: "john@example.com",
        last_name: "john@example.com",
        department: 'HRM',
        designation:'pk',
        tenant_id:1,      
        city:'lhr',
        employee_id:'0010'
  
      }
    const newUser = await UserProfile.query().insert(userData);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get a user by ID
exports.getById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserProfile.query().findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get a user with their associated tenant information
exports.getWithTenantInfo = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserProfile.query()
      .findById(userId)
      .select('tenant_profile.*', 'user_profile.*')
      .join('tenant_profile', 'tenant_profile.tenant_id', 'user_profile.tenant_id');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other controller methods as needed
