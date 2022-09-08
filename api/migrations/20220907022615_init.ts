import { Knex } from "knex";


const userTableName = 'users'
const genderTableName = "gender"
const professionTableName = "profession_types"
const educationName = "education"
const userAuthTableName = "users_auth"
const chronicConditionTableName = "chronic_condition"
const userStatsTableName = "users_stats"
const dietitianReportTableName = "dietitian_reports"
const exercisesTableName = "users_exercises"
const exercisesTypesTableName = "exercises_types"
const bookingTableName = "booking"
const timeSlotTableName = "timeslot"
const usersBloodPressureTableName = "users_blood_pressure"
const usersBloodGlucoseTableName = "users_blood_glucose"
const postTableName = "posts"
const commentsTableName = "comments"
const usersDietTableName = "users_diet"
const dietTypesTableName = "diets_types"
const foodGroupsTableName = "food_groups"
const foodTableName = "food"



export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(genderTableName, (table) => {
        table.increments()
        table.text('gender').notNullable()
    })

    await knex.schema.createTable(professionTableName, (table) => {
        table.increments()
        table.text('profession').notNullable()
    })

    await knex.schema.createTable(educationName, (table) => {
        table.increments()
        table.integer('education_level').notNullable()
    })

    await knex.schema.createTable(userAuthTableName, (table) => {
        table.increments()
        table.text('user_type').notNullable()
    })

    await knex.schema.createTable(chronicConditionTableName, (table) => {
        table.increments()
        table.text('disease').notNullable()
    })

    await knex.schema.createTable(exercisesTypesTableName, (table) => {
        table.increments()
        table.string('exercise').notNullable()
        table.integer('calories').notNullable()
    })

    await knex.schema.createTable(userTableName, (table) => {
        table.increments()
        table.string('first_name').notNullable()
		table.string('last_name').notNullable()
        table.string('email').unique().nullable()
        table.string('username').unique().notNullable()
		table.string('password').notNullable()
        table.integer('age').notNullable()
        table.string('IDnumber',8).unique().notNullable()
        table.date('birthday').notNullable()
        table.integer('gender').unsigned().notNullable()
		table.foreign('gender').references('gender.id')
        table.integer('profession').unsigned().notNullable()
        table.foreign('profession').references('profession_types.id')
        table.integer('education').unsigned().notNullable()
        table.foreign('education').references('education.id')
        table.string('phone',8).unique().notNullable()
        table.integer('height').notNullable()
        table.integer('weight').notNullable()
        table.timestamps(false, true)
        table.boolean('is_deleted').notNullable().defaultTo(false)
        
    })

    await knex.schema.createTable(exercisesTableName, (table) => {
        table.increments()
        table.integer('type').unsigned().notNullable()
        table.foreign('type').references('exercises_types.id')
        table.date('date').notNullable()
        table.integer('duration').notNullable()
        table.timestamps(false, true)
        table.boolean('is_deleted').defaultTo(false)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(timeSlotTableName, (table) => {
        table.increments()
        // see see first
        table.dateTime('time').unique().notNullable()
    })


    await knex.schema.createTable(bookingTableName, (table)=> {
        table.increments()
        table.date('date').notNullable()
        table.integer('time').unsigned().notNullable()
        table.foreign('time').references('timeslot.id')
        table.integer('duration').notNullable()
        table.timestamps(false, true)
        table.boolean('is_deleted').defaultTo(false)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(userStatsTableName, (table)=> {
        table.increments()
        table.integer('height').notNullable()
        table.integer('weight').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(dietitianReportTableName, (table)=> {
        table.increments()
        table.date('date').notNullable()
        table.text('content').notNullable()
        table.integer('height').notNullable()
        table.integer('weight').notNullable()
        table.float('blood_pressure').notNullable()
        table.float('blood_glucose').notNullable()
        table.timestamps(false, true)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
        table.integer('dietitian_id').unsigned().notNullable()
		table.foreign('dietitian_id').references('users.id')
    })

    await knex.schema.createTable(usersBloodPressureTableName, (table)=> {
        table.increments()
        table.integer('sys_bp').notNullable()
        table.integer('dia_bp').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(usersBloodGlucoseTableName, (table)=> {
        table.increments()
        table.integer('amount').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(postTableName, (table)=> {
        table.increments()
        table.text('content').notNullable()
        table.string('title').notNullable()
        table.string('photo').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.boolean('is_deleted').defaultTo(false)
        table.integer('author_id').unsigned().notNullable()
		table.foreign('author_id').references('users.id')
    })

    await knex.schema.createTable(commentsTableName, (table)=> {
        table.increments()
        table.integer('post').unsigned().notNullable()
		table.foreign('post').references('posts.id')
        table.text('content').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.boolean('is_deleted').defaultTo(false)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
    })

    await knex.schema.createTable(dietTypesTableName, (table)=> {
        table.increments()
        table.text('type').notNullable()
    })

    await knex.schema.createTable(foodGroupsTableName, (table)=> {
        table.increments()
        table.text('group').notNullable()
    })

    await knex.schema.createTable(foodTableName, (table)=> {
        table.increments()
        table.string('name').unique().notNullable()
        table.integer('group_id').unsigned().notNullable()
		table.foreign('group_id').references('food_groups.id')
        table.integer('calories').notNullable()
        table.integer('carbohydrates').notNullable()
        table.integer('sugars').notNullable()
        table.integer('fat').notNullable()
        table.integer('protein').notNullable()
        table.integer('fiber').notNullable()
        table.integer('sodium').notNullable()
    })

    await knex.schema.createTable(usersDietTableName, (table)=> {
        table.increments()
        table.integer('type').unsigned().notNullable()
		table.foreign('type').references('diets_types.id')
        table.integer('food').unsigned().notNullable()
		table.foreign('food').references('food.id')
        table.integer('food_amount').notNullable()
        table.date('date').notNullable()
        table.timestamps(false, true)
        table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
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
    await knex.schema.dropTableIfExists(chronicConditionTableName)
    await knex.schema.dropTableIfExists(userAuthTableName)
    await knex.schema.dropTableIfExists(userStatsTableName)
    await knex.schema.dropTableIfExists(userTableName)
    await knex.schema.dropTableIfExists(educationName)
    await knex.schema.dropTableIfExists(professionTableName)
    await knex.schema.dropTableIfExists(genderTableName)

}

