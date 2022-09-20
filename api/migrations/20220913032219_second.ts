import { Knex } from 'knex'

const userTableName = 'users'
const dietitianTableName = 'dietitian'
const genderTableName = 'gender'
const professionTableName = 'profession_types'
const educationName = 'education'
const chronicConditionTableName = 'chronic_condition'
const userStatsTableName = 'users_stats'
const userWeightTableName = 'users_weight'
const dietitianReportTableName = 'dietitian_reports'
const followupTableName = 'follow_up'
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

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(usersDietTableName)
	await knex.schema.dropTableIfExists(foodTableName)
	await knex.schema.dropTableIfExists(foodGroupsTableName)
	await knex.schema.dropTableIfExists(dietTypesTableName)
	await knex.schema.dropTableIfExists(commentsTableName)
	await knex.schema.dropTableIfExists(postTableName)
	await knex.schema.dropTableIfExists(usersBloodGlucoseTableName)
	await knex.schema.dropTableIfExists(usersBloodPressureTableName)
	await knex.schema.dropTableIfExists(dietitianReportTableName)
	await knex.schema.dropTableIfExists(bookingTableName)
	await knex.schema.dropTableIfExists(timeSlotTableName)
	await knex.schema.dropTableIfExists(exercisesTableName)
	await knex.schema.dropTableIfExists(exercisesTypesTableName)
	await knex.schema.dropTableIfExists(userWeightTableName)
	await knex.schema.dropTableIfExists(userStatsTableName)
	await knex.schema.dropTableIfExists(userTableName)
	await knex.schema.dropTableIfExists(followupTableName)
	await knex.schema.dropTableIfExists(chronicConditionTableName)
	await knex.schema.dropTableIfExists(dietitianTableName)
	await knex.schema.dropTableIfExists(educationName)
	await knex.schema.dropTableIfExists(professionTableName)
	await knex.schema.dropTableIfExists(genderTableName)

	await knex.schema.createTable(professionTableName, (table) => {
		table.increments()
		table.text('pf_type').notNullable()
	})

	await knex.schema.createTable(genderTableName, (table) => {
		table.increments()
		table.text('gender_type').notNullable()
	})

	await knex.schema.createTable(educationName, (table) => {
		table.increments()
		table.text('education_level').notNullable()
	})

	await knex.schema.createTable(chronicConditionTableName, (table) => {
		table.increments()
		table.text('disease').notNullable()
	})

	await knex.schema.createTable(exercisesTypesTableName, (table) => {
		table.increments()
		table.string('ex_type').notNullable()
		table.decimal('ex_calories', 8, 4).notNullable()
	})

	await knex.schema.createTable(userTableName, (table) => {
		table.increments()
		table.string('username').unique().notNullable()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('email').unique().nullable()
		table.string('password').notNullable()
		table.date('birthday').notNullable()
		table.float('height').notNullable()
		table.float('weight').notNullable()
		table.integer('gender').unsigned().notNullable()
		table.foreign('gender').references('gender.id')
		table.string('phone', 8).unique().notNullable()
		table.text('address').notNullable()
		table.integer('profession').unsigned().notNullable()
		table.foreign('profession').references('profession_types.id')
		table.string('hkid', 8).unique().notNullable()
		table.integer('chronic_condition').unsigned().nullable()
		table.foreign('chronic_condition').references('chronic_condition.id')
		table.integer('education').unsigned().notNullable()
		table.foreign('education').references('education.id')
		table.boolean('is_deleted').notNullable().defaultTo(false)
		table.boolean('is_user').notNullable().defaultTo(true)
		table.timestamps(false, true)
	})

	await knex.schema.createTable(dietitianTableName, (table) => {
		table.increments()
		table.string('username').unique().notNullable()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('password').notNullable()
		table.string('email').unique().nullable()
		table.timestamps(false, true)
		table.boolean('is_deleted').notNullable().defaultTo(false)
		table.boolean('is_user').notNullable().defaultTo(false)
	})

	await knex.schema.createTable(exercisesTableName, (table) => {
		table.increments()
		table.date('date').notNullable()
		table.integer('exercise').unsigned().notNullable()
		table.foreign('exercise').references('exercises_types.id')
		table.integer('duration').notNullable()
		table.timestamps(false, true)
		table.boolean('is_deleted').defaultTo(false)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
	})

	await knex.schema.createTable(timeSlotTableName, (table) => {
		table.increments()
		table.time('time').unique().notNullable()
	})

	await knex.schema.createTable(bookingTableName, (table) => {
		table.increments()
		table.date('date').notNullable()
		table.integer('time').unsigned().notNullable()
		table.foreign('time').references('timeslot.id')
		table.timestamps(false, true)
		table.boolean('is_deleted').defaultTo(false)
		table.boolean('is_attended').defaultTo(null)
		table.boolean('follow_up').defaultTo(null)
		table.integer('previous_booking_id').defaultTo(null)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
		table.integer('dietitian_id').unsigned().notNullable()
		table.foreign('dietitian_id').references('dietitian.id')
	})

	await knex.schema.createTable(userWeightTableName, (table) => {
		table.increments()
		table.float('weight').notNullable()
		table.date('date').notNullable()
		table.boolean('is_deleted').notNullable().defaultTo(false)
		table.timestamps(false, true)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
	})

	await knex.schema.createTable(followupTableName, (table) => {
		table.increments()
		table.text('action').unique().notNullable()
	})

	await knex.schema.createTable(dietitianReportTableName, (table) => {
		table.increments()
		table.date('date').notNullable()
		table.text('content').notNullable()
		table.float('height').notNullable()
		table.float('weight').notNullable()
		table.float('blood_pressure').notNullable()
		table.float('blood_glucose').notNullable()
		table.integer('follow_up').unsigned().notNullable()
		table.foreign('follow_up').references('follow_up.id')
		table.timestamps(false, true)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
		table.integer('dietitian_id').unsigned().notNullable()
		table.foreign('dietitian_id').references('dietitian.id')
	})

	await knex.schema.createTable(usersBloodPressureTableName, (table) => {
		table.increments()
		table.integer('sys_bp').notNullable()
		table.integer('dia_bp').notNullable()
		table.date('date').notNullable()
		table.time('time').notNullable()
		table.boolean('is_deleted').notNullable().defaultTo(false)
		table.timestamps(false, true)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
	})

	await knex.schema.createTable(usersBloodGlucoseTableName, (table) => {
		table.increments()
		table.float('bg_measurement').notNullable()
		table.date('date').notNullable()
		table.time('time').notNullable()
		table.boolean('is_deleted').notNullable().defaultTo(false)
		table.timestamps(false, true)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
	})

	await knex.schema.createTable(postTableName, (table) => {
		table.increments()
		table.text('content').notNullable()
		table.string('title').notNullable()
		table.text('photo').nullable()
		table.date('date').notNullable()
		table.timestamps(false, true)
		table.boolean('is_deleted').defaultTo(false)
		table.integer('author_id').unsigned().notNullable()
		table.foreign('author_id').references('dietitian.id')
	})

	await knex.schema.createTable(commentsTableName, (table) => {
		table.increments()
		table.integer('post').unsigned().notNullable()
		table.foreign('post').references('posts.id')
		table.text('content').notNullable()
		table.date('date').notNullable()
		table.timestamps(false, true)
		table.boolean('is_deleted').defaultTo(false)
		table.integer('author').unsigned().notNullable()
		table.foreign('author').references('users.id')
	})

	await knex.schema.createTable(dietTypesTableName, (table) => {
		table.increments()
		table.text('d_type').notNullable()
	})

	await knex.schema.createTable(foodGroupsTableName, (table) => {
		table.increments()
		table.text('food_group').notNullable()
	})

	await knex.schema.createTable(foodTableName, (table) => {
		table.increments()
		table.string('food_name').unique().notNullable()
		table.integer('group_id').unsigned().notNullable()
		table.foreign('group_id').references('food_groups.id')
		table.decimal('food_calories', 8, 4).notNullable()
		table.decimal('carbohydrates', 8, 4).notNullable()
		table.decimal('sugars', 8, 4).notNullable()
		table.decimal('fat', 8, 4).notNullable()
		table.decimal('protein', 8, 4).notNullable()
		table.decimal('fiber', 8, 4).notNullable()
		table.decimal('sodium', 8, 4).notNullable()
	})

	await knex.schema.createTable(usersDietTableName, (table) => {
		table.increments()
		table.integer('diet_type').unsigned().notNullable()
		table.foreign('diet_type').references('diets_types.id')
		table.integer('food').unsigned().notNullable()
		table.foreign('food').references('food.id')
		table.decimal('food_amount', 5, 2).notNullable()
		table.date('date').notNullable()
		table.timestamps(false, true)
		table.integer('user_id').unsigned().notNullable()
		table.foreign('user_id').references('users.id')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(usersDietTableName)
	await knex.schema.dropTableIfExists(foodTableName)
	await knex.schema.dropTableIfExists(foodGroupsTableName)
	await knex.schema.dropTableIfExists(dietTypesTableName)
	await knex.schema.dropTableIfExists(commentsTableName)
	await knex.schema.dropTableIfExists(postTableName)
	await knex.schema.dropTableIfExists(usersBloodGlucoseTableName)
	await knex.schema.dropTableIfExists(usersBloodPressureTableName)
	await knex.schema.dropTableIfExists(dietitianReportTableName)
	await knex.schema.dropTableIfExists(bookingTableName)
	await knex.schema.dropTableIfExists(timeSlotTableName)
	await knex.schema.dropTableIfExists(exercisesTableName)
	await knex.schema.dropTableIfExists(exercisesTypesTableName)
	await knex.schema.dropTableIfExists(userWeightTableName)
	await knex.schema.dropTableIfExists(userTableName)
	await knex.schema.dropTableIfExists(followupTableName)
	await knex.schema.dropTableIfExists(chronicConditionTableName)
	await knex.schema.dropTableIfExists(dietitianTableName)
	await knex.schema.dropTableIfExists(educationName)
	await knex.schema.dropTableIfExists(professionTableName)
	await knex.schema.dropTableIfExists(genderTableName)
}
