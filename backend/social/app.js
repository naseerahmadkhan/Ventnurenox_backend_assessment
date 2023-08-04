const express = require('express');
// const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require('./utilities/producer');
// const { connectConsumer } = require('./utilities/consumer');
// const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
// const databaseConfig = require('./database/DatabaseConfig');






const dbSetup = require("./db/db-setup");
const UserProfile = require("./db/models/userProfile");
const TenantProfile = require("./db/models/tenantProfile");
dbSetup();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//tenant---------------------
//get by id
app.get("/t/:id", async (req, res, next) => {
	try {
	  const { id } = req.params;
	  // const user = await User.query().findById(id)
	  const user = await TenantProfile.query().findById(id);
	  res.json(user);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  app.get("/tget-all", async (req, res, next) => {
	
	  try {
		// const user = await User.query().findById(id)
		const allusers = await TenantProfile.query().select("*");
		// const allusers = await TenantProfile.query().select("*").withGraphFetched("user_profile");
		console.log("all users", allusers);
		res.json(allusers);
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});
  
	app.post("/tpost", async (req, res, next) => {
	  try {
		console.log("req", req.body);
		const newUser = await TenantProfile.query().insert({
		  tenant_name: "john@example.com",
		  address: "john@example.com",
		  city: 'lahore',
		  country:'pk',
		  zip_code:'54000',      
		  phone:'9233324659119',
		  web_url:'www.google.com'
	
		});
	
		console.log("qry result", newUser);
		res.json(newUser);
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});
  
  
  
  app.delete("/tdel", async (req, res, next) => {
	  try {
	  //   const { id } = req.params;
	  const idToDelete = 6;
	  const tenantToDelete = await TenantProfile.query().findById(idToDelete);
	  if (tenantToDelete) {
		  // Delete the user
		  const numDeleted = await tenantToDelete.$query().delete();
		
		  console.log(`${numDeleted} user(s) deleted.`);
		  res.json(numDeleted);
		} else {
		  console.log('not found.');
		}
  
		
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});
  
  
  app.patch("/tupdate", async (req, res, next) => {
	try {
	  // const {id} = req.params
	  const idToUpdate = 5;
	  const tenantToUpdate = await TenantProfile.query().findById(idToUpdate);
  
	  if (tenantToUpdate) {
		  tenantToUpdate.tenant_name = "John Doe updated"; // Updated name
		
  
		// Save the updated user record
		const updatedTenant = await tenantToUpdate.$query().update();
		res.json(updatedTenant);
		console.log('User updated:', updatedTenant);
	  }else{
		  console.log('User not found');
	  }
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  
  
  
  //user
  
  app.post("/post-user", async (req, res, next) => {
	  try {
		console.log("req", req.body);
		const newUser = await UserProfile.query().insert({
		  first_name: "john@example.com",
		  last_name: "john@example.com",
		  department: 'HRM',
		  designation:'pk',
		  tenant_id:1,      
		  city:'lhr',
		  employee_id:'0010'
	
		});
	
		console.log("qry result", newUser);
		res.json(newUser);
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});
  
  
	app.get("/user/:id", async (req, res, next) => {
	  try {
		const { id } = req.params;
		//  const user = await UserProfile.query().findById(id).withGraphFetched("tenant_profile");
	  //   const user = await UserProfile.query().findById(id).withGraphFetched("tenant_profile");
	  const user = await UserProfile.query().findById(id).withGraphFetched("tenant_profile");
		res.json(user);
		console.log(id,user)
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});
  
	app.get("/user-qry/:id", async (req, res, next) => {
	  try {
		const { id } = req.params;
		//  const user = await UserProfile.query().findById(id).withGraphFetched("tenant_profile");
	  //   const user = await UserProfile.query().findById(id).withGraphFetched("tenant_profile");
	  const user = await UserProfile.query().findById(id)
	  .select('tenant_profile.*', 'user_profile.*')
	  .join('tenant_profile', 'tenant_profile.tenant_id', 'user_profile.tenant_id');
		res.json(user);
		console.log(id,user)
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
	});

	


app.use('/', async (req, res) => {

	res.status(200).json({ message: `App is running on port. ${process.env.PORT || 4000}` });

});

app.listen(process.env.PORT || 4000, async () => {
	
	console.log('App started at port', process.env.PORT || 4000);
	await initProducer();

});