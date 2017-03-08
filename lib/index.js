const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

const app = require('express')();

// const query = process.argv[2]
const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

const {MongoClient} = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];
MongoClient.connect(mConfig.url,(err,mPool)=> {
	assert.equal(err,null);

	app.use('/graphql',graphqlHTTP({
		schema: ncSchema,
		graphiql:true,
		context : {pgPool,mPool}
	}));

	app.listen('3000',console.log('listening on port 3000'))
});
// graphql(ncSchema, query).then(result => {
// 	console.log(result);
// })

