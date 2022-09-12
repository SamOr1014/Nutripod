import type { Knex } from 'knex'

const userTableName = 'users'
const dietitianTableName = 'dietitian'
const genderTableName = 'gender'
const professionTableName = 'profession_types'
const educationName = 'education'
const chronicConditionTableName = 'chronic_condition'
const userStatsTableName = 'users_stats'
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
	await knex(userStatsTableName).del()
	await knex(userTableName).del()
	await knex(chronicConditionTableName).del()
	await knex(dietitianTableName).del()
	await knex(educationName).del()
	await knex(professionTableName).del()
	await knex(genderTableName).del()

	// const professionID = await knex(professionTableName)
	// .insert([
	// 	{pf_type:"IT"}

	// ]).returning('id')

	// const genderID = await knex(genderTableName)
	// .insert([
	// 	{gender_type:"Male"},
	// 	{gender_type:"Female"},
	// 	{gender_type:"Others"}
	// ])

	// const educationID = await knex(educationName)
	// .insert([
	// 	{education_level:""}
	// ])
}
