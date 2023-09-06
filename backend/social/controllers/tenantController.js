const TenantProfile = require('../db/models/tenantProfile');

// Controller to get a tenant by ID
exports.getById = async (req, res, next) => {
  try {
    const tenantId = req.params.id;
    const tenant = await TenantProfile.query().findById(tenantId);
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    res.json(tenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all tenants
exports.getAll = async (req, res, next) => {
  try {
    const allTenants = await TenantProfile.query().select('*');
    res.json(allTenants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to create a new tenant
exports.create = async (req, res, next) => {
  try {
    // const tenantData = req.body;
    const tenantData = {
        tenant_name: "john@example.com",
        address: "john@example.com",
        city: 'lahore',
        country:'pk',
        zip_code:'54000',      
        phone:'9233324659119',
        web_url:'www.google.com'
  
      }

    const newTenant = await TenantProfile.query().insert(tenantData);
    res.json(newTenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a tenant
exports.delete = async (req, res, next) => {
  try {
    const tenantIdToDelete = 1; // Hard-coded for now, should come from req.params
    const tenantToDelete = await TenantProfile.query().findById(tenantIdToDelete);
    
    if (!tenantToDelete) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    const numDeleted = await tenantToDelete.$query().delete();
    res.json({ numDeleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a tenant
exports.update = async (req, res, next) => {
  try {
    const tenantIdToUpdate = 2; // Hard-coded for now, should come from req.params
    const updatedTenantData = req.body;
    const tenantToUpdate = await TenantProfile.query().findById(tenantIdToUpdate);
    
    if (!tenantToUpdate) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    Object.assign(tenantToUpdate, updatedTenantData);
    const updatedTenant = await tenantToUpdate.$query().update();
    res.json(updatedTenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other controller methods as needed
