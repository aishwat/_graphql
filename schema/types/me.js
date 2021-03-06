const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt
} = require('graphql');

// const {fromSnakeCase} = require('../../lib/util');
const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');

module.exports  = new GraphQLObjectType({
	name:'MeType',

	fields :{
		id:{type: GraphQLID},
		firstName :{type: GraphQLString},
		lastName :{type: GraphQLString},
		email:{type: new GraphQLNonNull(GraphQLString)},
		createdAt:{type: GraphQLString},
		contests :{
			type: new GraphQLList(ContestType),
			resolve(obj,args,{pgPool}){
				return pgdb(pgPool).getContests(obj);
			}	
		},
		contestCount :{
			type : GraphQLInt,
			resolve(obj,args,{mPool},{fieldName}){
				return mdb(mPool).getCounts(obj,fieldName);
			}
		},
		namesCount :{
			type : GraphQLInt,
			resolve(obj,args,{mPool},{fieldName}){
				return mdb(mPool).getCounts(obj,fieldName);
			}
		},
		votesCount :{
			type : GraphQLInt,
			resolve(obj,args,{mPool},{fieldName}){
				return mdb(mPool).getCounts(obj,fieldName);
			}
		}
	}
});