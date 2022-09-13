import type { Knex } from 'knex'
import { hashPassword } from '../utilities/hash'

const userTableName = 'users'
const dietitianTableName = 'dietitian'
const genderTableName = 'gender'
const professionTableName = 'profession_types'
const educationName = 'education'
const chronicConditionTableName = 'chronic_condition'
const userWeightTableName = "users_weight"
const dietitianReportTableName = 'dietitian_reports'
const exercisesTableName = 'users_exercises'
const exercisesTypesTableName = 'exercises_types'
const bookingTableName = 'booking'
const timeSlotTableName = 'timeslot'
const usersBloodPressureTableName = 'users_blood_pressure'
const usersBloodGlucoseTableName = 'users_blood_glucose'
const postTableName = 'posts'
const commentsTableName = 'comments'
const usersDietTableName = 'users_diets'
const dietTypesTableName = 'diets_types'
const foodGroupsTableName = 'food_groups'
const foodTableName = 'food'

export async function seed(knex: Knex) {
	//delete all table
	await knex(usersDietTableName).del()
	await knex(foodTableName).del()
	await knex(foodGroupsTableName).del()
	await knex(dietTypesTableName).del()
	await knex(commentsTableName).del()
	await knex(postTableName).del()
	await knex(usersBloodGlucoseTableName).del()
	await knex(usersBloodPressureTableName).del()
	await knex(dietitianReportTableName).del()
	await knex(bookingTableName).del()
	await knex(timeSlotTableName).del()
	await knex(exercisesTableName).del()
	await knex(exercisesTypesTableName).del()
	await knex(userWeightTableName).del()
	await knex(userTableName).del()
	await knex(chronicConditionTableName).del()
	await knex(dietitianTableName).del()
	await knex(educationName).del()
	await knex(professionTableName).del()
	await knex(genderTableName).del()

	const professionID = await knex(professionTableName)
	.insert([
		{pf_type:"IT"},
		{pf_type:"dietitian"}

	]).returning('id')

	const genderID = await knex(genderTableName)
	.insert([
		{gender_type:'Male'},
		{gender_type:'Female'},
		{gender_type:'Others'}
	]).returning('id')

	const educationID = await knex(educationName)
	.insert([
		{education_level:"Primary and below"},
		{education_level:"Secondary"},
		{education_level:"Post-secondary"}
	]).returning('id')

	const chronic_conditionID = await knex(chronicConditionTableName)
	.insert([
		{disease:"sleepy"}
	])

	const exercises_typesID = await knex(exercisesTypesTableName)
	.insert([
		{ex_type:"walk/run, moderate", ex_calories:290},
		{ex_type:"walk/run, vigorous", ex_calories:363},
		{ex_type:"Football", ex_calories:508},
		{ex_type:"Basketball", ex_calories:581},
		{ex_type:"Swimming, vigorous", ex_calories:726},
		{ex_type:"Swimming, moderate", ex_calories:290},
		{ex_type:"Climbing hills", ex_calories:545},
		{ex_type:"Martial arts, kick boxing", ex_calories:726},
		{ex_type:"Weight lifting", ex_calories:217},
		{ex_type:"Cycling, moderate", ex_calories:581},
		{ex_type:"Cycling, vigorous", ex_calories:726},
		{ex_type:"Cycling, leisure", ex_calories:290},
		{ex_type:"Whitewater rafting, kayaking, canoeing", ex_calories:363},
		{ex_type:"Table tennis", ex_calories:290},
		{ex_type:"Tennis", ex_calories:508}
	]).returning('id')

	const userID = await knex(userTableName)
	.insert([
		{username:"roy"},
		{first_name:"hoi"},
		{last_name:"chan"},
		{email:"r@gmail.com"},
		{password: await hashPassword('123')},
		{birthday:'2000-20-20'},
		{height:172},
		{weight:68},
		{gender:genderID[0].id},
		{phone:12345678},
		{address:"Ma On Shan"},
		{profession:professionID[0].id},
		{hkid:"Y7894568"},
		{chronic_conditionID:null},
		{education: educationID[1].id},
		{is_deleted: false}


	])
	
}
