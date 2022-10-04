import { Knex } from 'knex'
import { hashPassword } from '../utilities/hash'
const path = require('path')
const seedFile = require('knex-seed-file')

const userTableName = 'users'
const dietitianTableName = 'dietitian'
const genderTableName = 'gender'
const professionTableName = 'profession_types'
const educationName = 'education'
const chronicConditionTableName = 'chronic_condition'
const userWeightTableName = 'users_weight'
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
const followupTableName = 'follow_up'

export async function seed(knex: Knex) {
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
	await knex(followupTableName).del()

	const professionID = await knex(professionTableName)
		.insert([
			{ pf_type: 'student' },
			{ pf_type: 'Advertising and marketing' },
			{ pf_type: 'Computer and technology' },
			{ pf_type: 'Construction' },
			{ pf_type: 'Education' },
			{ pf_type: 'Fashion and Art' },
			{ pf_type: 'Finance and Banking' },
			{ pf_type: 'Engineering' },
			{ pf_type: 'Manufacturing' },
			{ pf_type: 'Hotel, Catering and Tourism' },
			{ pf_type: 'Transportation' },
			{ pf_type: 'Wholesale and retail' },
			{ pf_type: 'retired' },
			{ pf_type: 'others' }
		])
		.returning('id')

	const genderID = await knex(genderTableName)
		.insert([
			{ gender_type: 'Male' },
			{ gender_type: 'Female' },
			{ gender_type: 'others' }
		])
		.returning('id')

	const educationID = await knex(educationName)
		.insert([
			{ education_level: 'Primary and below' },
			{ education_level: 'Secondary' },
			{ education_level: 'Post-secondary' },
			{ education_level: 'Bachelor Degree' },
			{ education_level: "Master's Degree" },
			{ education_level: 'Doctor of Philosophy' }
		])
		.returning('id')

	const chronic_conditionID = await knex(chronicConditionTableName)
		.insert([
			{ disease: 'none' },
			{ disease: 'Diabetes' },
			{ disease: 'arthritis' },
			{ disease: 'heart disease' },
			{ disease: 'cancer' },
			{ disease: 'respiratory disease' },
			{ disease: 'Alzheimer disease' },
			{ disease: 'kidney disease' },
			{ disease: 'others' }
		])
		.returning('id')

	const exercises_typesID = await knex(exercisesTypesTableName)
		.insert([
			{ ex_type: '慢跑', ex_calories: 290 },
			{ ex_type: '快跑', ex_calories: 363 },
			{ ex_type: '足球', ex_calories: 508 },
			{ ex_type: '籃球', ex_calories: 581 },
			{ ex_type: '游泳', ex_calories: 726 },
			{ ex_type: '行山', ex_calories: 545 },
			{ ex_type: '自由搏擊', ex_calories: 726 },
			{ ex_type: '健身', ex_calories: 217 },
			{ ex_type: '踩單車', ex_calories: 581 },
			{ ex_type: '獨木舟', ex_calories: 363 },
			{ ex_type: '乒乓球', ex_calories: 294 },
			{ ex_type: '網球', ex_calories: 508 }
		])
		.returning('id')

	const userID = await knex(userTableName)
		.insert([
			{
				username: 'roy',
				first_name: 'hoi',
				last_name: 'chan',
				email: 'r@gmail.com',
				password: await hashPassword('123'),
				birthday: '2000-12-12',
				height: 172,
				weight: 68,
				gender: genderID[0].id,
				phone: 12345678,
				address: 'Ma On Shan',
				profession: professionID[0].id,
				hkid: 'Y7894568',
				chronic_condition: chronic_conditionID[0].id,
				education: educationID[1].id
			},
			{
				username: 'marcus',
				first_name: 'mar',
				last_name: 'cus',
				email: 'marcus@gmail.com',
				password: await hashPassword('123'),
				birthday: '2000-12-12',
				height: 190,
				weight: 68,
				gender: genderID[0].id,
				phone: 78945612,
				address: 'Ma On Shan',
				profession: professionID[0].id,
				hkid: 'Y7456868',
				chronic_condition: chronic_conditionID[0].id,
				education: educationID[1].id
			}
		])
		.returning('id')

	const dietitianID = await knex(dietitianTableName)
		.insert([
			{
				username: 'sam',
				first_name: 'sam',
				last_name: 'Or',
				password: await hashPassword('1234'),
				email: 'sam@gmail.com'
			},
			{
				username: 'dietitian1',
				first_name: 'gigi',
				last_name: 'Wong',
				password: await hashPassword('1234'),
				email: 'gigi@gg.com'
			},
			{
				username: 'dietitian2',
				first_name: 'kiki',
				last_name: 'Kong',
				password: await hashPassword('1234'),
				email: 'kiki@gg.com'
			},
			{
				username: 'dietitian3',
				first_name: 'bibi',
				last_name: 'Song',
				password: await hashPassword('1234'),
				email: 'bibi@gg.com'
			}
		])
		.returning('id')

	await knex(exercisesTableName)
		.insert([
			{
				date: '2022-08-12',
				exercise: exercises_typesID[3].id,
				duration: 34,
				user_id: userID[0].id
			},
			{
				date: '2022-08-02',
				exercise: exercises_typesID[5].id,
				duration: 30,
				user_id: userID[0].id
			},
			{
				date: '2022-08-07',
				exercise: exercises_typesID[3].id,
				duration: 45,
				user_id: userID[0].id
			},
			{
				date: '2022-08-18',
				exercise: exercises_typesID[6].id,
				duration: 78,
				user_id: userID[0].id
			},
			{
				date: '2022-08-23',
				exercise: exercises_typesID[4].id,
				duration: 60,
				user_id: userID[0].id
			},
			{
				date: '2022-08-17',
				exercise: exercises_typesID[3].id,
				duration: 31,
				user_id: userID[0].id
			},
			{
				date: '2022-08-20',
				exercise: exercises_typesID[2].id,
				duration: 30,
				user_id: userID[0].id
			},
			{
				date: '2022-09-20',
				exercise: exercises_typesID[7].id,
				duration: 12,
				user_id: userID[0].id
			},
			{
				date: '2022-09-20',
				exercise: exercises_typesID[2].id,
				duration: 56,
				user_id: userID[0].id
			},
			{
				date: '2022-09-21',
				exercise: exercises_typesID[1].id,
				duration: 45,
				user_id: userID[0].id
			},
			{
				date: '2022-09-22',
				exercise: exercises_typesID[5].id,
				duration: 60,
				user_id: userID[0].id
			},
			{
				date: '2022-09-23',
				exercise: exercises_typesID[4].id,
				duration: 60,
				user_id: userID[0].id
			},
			{
				date: '2022-09-24',
				exercise: exercises_typesID[3].id,
				duration: 35,
				user_id: userID[0].id
			},
			{
				date: '2022-09-20',
				exercise: exercises_typesID[2].id,
				duration: 60,
				user_id: userID[1].id
			},
			{
				date: '2022-09-25',
				exercise: exercises_typesID[4].id,
				duration: 45,
				user_id: userID[1].id
			}
		])
		.returning('id')

	const timeSlotID = await knex(timeSlotTableName)
		.insert([
			{ time: '09:00' },
			{ time: '10:00' },
			{ time: '11:00' },
			{ time: '12:00' },
			{ time: '14:00' },
			{ time: '15:00' },
			{ time: '16:00' },
			{ time: '17:00' }
		])
		.returning('id')

	const bookIngID = await knex(bookingTableName)
		.insert([
			{
				date: '2022-09-16',
				time: timeSlotID[0].id,
				user_id: userID[0].id,
				dietitian_id: dietitianID[0].id,
				follow_up: false,
				is_attended: true
			},
			{
				date: '2022-09-17',
				time: timeSlotID[0].id,
				user_id: userID[1].id,
				dietitian_id: dietitianID[0].id,
				follow_up: true,
				is_attended: true
			},
			{
				date: '2022-10-01',
				time: timeSlotID[0].id,
				user_id: userID[0].id,
				dietitian_id: dietitianID[0].id
			},
			{
				date: '2022-10-02',
				time: timeSlotID[1].id,
				user_id: userID[0].id,
				dietitian_id: dietitianID[0].id
			},
			{
				date: '2022-10-03',
				time: timeSlotID[2].id,
				user_id: userID[1].id,
				dietitian_id: dietitianID[1].id
			},
			{
				date: '2022-10-04',
				time: timeSlotID[3].id,
				user_id: userID[1].id,
				dietitian_id: dietitianID[2].id
			},
			{
				date: '2022-10-05',
				time: timeSlotID[4].id,
				user_id: userID[0].id,
				dietitian_id: dietitianID[3].id
			}
		])
		.returning('id')

	await knex(userWeightTableName).insert([
		{
			weight: 50.4,
			date: '2022-09-01',
			user_id: userID[0].id
		},
		{
			weight: 51,
			date: '2022-09-05',
			user_id: userID[0].id
		},
		{
			weight: 52,
			date: '2022-09-10',
			user_id: userID[0].id
		},
		{
			weight: 53,
			date: '2022-09-12',
			user_id: userID[0].id
		},
		{
			weight: 50.4,
			date: '2022-09-15',
			user_id: userID[0].id
		},
		{
			weight: 55,
			date: '2022-09-17',
			user_id: userID[0].id
		},
		{
			weight: 60,
			date: '2022-09-18',
			user_id: userID[0].id
		},
		{
			weight: 65,
			date: '2022-09-21',
			user_id: userID[0].id
		},
		{
			weight: 70,
			date: '2022-09-22',
			user_id: userID[0].id
		},
		{
			weight: 65,
			date: '2022-09-25',
			user_id: userID[0].id
		},
		{
			weight: 50.4,
			date: '2022-09-01',
			user_id: userID[1].id
		},
		{
			weight: 51,
			date: '2022-09-05',
			user_id: userID[1].id
		},
		{
			weight: 52,
			date: '2022-09-10',
			user_id: userID[1].id
		},
		{
			weight: 53,
			date: '2022-09-12',
			user_id: userID[1].id
		},
		{
			weight: 50.4,
			date: '2022-09-15',
			user_id: userID[1].id
		},
		{
			weight: 54,
			date: '2022-09-17',
			user_id: userID[1].id
		},
		{
			weight: 56,
			date: '2022-09-18',
			user_id: userID[1].id
		},
		{
			weight: 65,
			date: '2022-09-21',
			user_id: userID[1].id
		},
		{
			weight: 70,
			date: '2022-09-22',
			user_id: userID[1].id
		},
		{
			weight: 65,
			date: '2022-09-25',
			user_id: userID[1].id
		}
	])

	const follow_upID = await knex(followupTableName)
		.insert([{ action: 'consultation' }, { action: 'Dismiss' }])
		.returning('id')

	await knex(dietitianReportTableName).insert([
		{
			booking_id: bookIngID[0].id,
			content: 'stay healthy',
			height: 172,
			weight: 70,
			sys_blood_pressure: 95,
			dia_blood_pressure: 60,
			blood_glucose: 2,
			follow_up_status: follow_upID[1].id
		},
		{
			booking_id: bookIngID[1].id,
			content: 'sleep more',
			height: 200,
			weight: 100,
			sys_blood_pressure: 100,
			dia_blood_pressure: 70,
			blood_glucose: 3,
			follow_up_status: follow_upID[0].id
		}
	])

	await knex(usersBloodPressureTableName).insert([
		{
			sys_bp: 100,
			dia_bp: 110,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[0].id
		},
		{
			sys_bp: 101,
			dia_bp: 110,
			date: '2022-09-15',
			time: '12:00',
			user_id: userID[0].id
		},
		{
			sys_bp: 90,
			dia_bp: 110,
			date: '2022-09-17',
			time: '14:00',
			user_id: userID[0].id
		},
		{
			sys_bp: 100,
			dia_bp: 120,
			date: '2022-09-20',
			time: '16:00',
			user_id: userID[0].id
		},
		{
			sys_bp: 100,
			dia_bp: 120,
			date: '2022-09-21',
			time: '18:00',
			user_id: userID[0].id
		},
		{
			sys_bp: 100,
			dia_bp: 110,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[1].id
		},
		{
			sys_bp: 101,
			dia_bp: 110,
			date: '2022-09-15',
			time: '12:00',
			user_id: userID[1].id
		},
		{
			sys_bp: 90,
			dia_bp: 110,
			date: '2022-09-17',
			time: '14:00',
			user_id: userID[1].id
		},
		{
			sys_bp: 100,
			dia_bp: 120,
			date: '2022-09-20',
			time: '16:00',
			user_id: userID[1].id
		},
		{
			sys_bp: 100,
			dia_bp: 120,
			date: '2022-09-21',
			time: '18:00',
			user_id: userID[1].id
		}
	])

	await knex(usersBloodGlucoseTableName).insert([
		{
			bg_measurement: 100,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[0].id
		},
		{
			bg_measurement: 105,
			date: '2022-09-14',
			time: '15:17',
			user_id: userID[0].id
		},
		{
			bg_measurement: 108,
			date: '2022-09-17',
			time: '15:05',
			user_id: userID[0].id
		},
		{
			bg_measurement: 109,
			date: '2022-09-18',
			time: '13:00',
			user_id: userID[0].id
		},
		{
			bg_measurement: 110,
			date: '2022-09-19',
			time: '12:00',
			user_id: userID[0].id
		},
		{
			bg_measurement: 111,
			date: '2022-09-20',
			time: '15:00',
			user_id: userID[0].id
		},
		{
			bg_measurement: 111,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[0].id
		},

		{
			bg_measurement: 100,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[1].id
		},
		{
			bg_measurement: 105,
			date: '2022-09-14',
			time: '15:17',
			user_id: userID[1].id
		},
		{
			bg_measurement: 108,
			date: '2022-09-17',
			time: '15:05',
			user_id: userID[1].id
		},
		{
			bg_measurement: 109,
			date: '2022-09-18',
			time: '13:00',
			user_id: userID[1].id
		},
		{
			bg_measurement: 110,
			date: '2022-09-19',
			time: '12:00',
			user_id: userID[1].id
		},
		{
			bg_measurement: 111,
			date: '2022-09-20',
			time: '15:00',
			user_id: userID[1].id
		},
		{
			bg_measurement: 111,
			date: '2022-09-13',
			time: '10:00',
			user_id: userID[0].id
		}
	])

	const postID = await knex(postTableName)
		.insert([
			{
				content: 'Testing',
				title: 'Testing',
				photo: 'Cry.png',
				date: '2022-09-19',
				author_id: dietitianID[0].id
			},
			{
				content:
					'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
				title: 'nesciunt quas odio',
				photo: 'Cry.png',
				date: '2022-09-15',
				author_id: dietitianID[3].id
			},
			{
				content:
					'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
				title: 'magnam facilis autem',
				photo: 'Cry.png',
				date: '2022-09-24',
				author_id: dietitianID[2].id
			},
			{
				content:
					'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
				title: 'dolorem dolore est ipsam',
				photo: 'Cry.png',
				date: '2022-09-27',
				author_id: dietitianID[1].id
			}
		])
		.returning('id')

	await knex(commentsTableName).insert([
		{
			post: postID[0].id,
			content: 'how are you? I am fine thank you and you?',
			date: '2022-09-14',
			author: userID[0].id
		},
		{
			post: postID[1].id,
			content: 'I love coding',
			date: '2022-09-14',
			author: userID[0].id
		},
		{
			post: postID[2].id,
			content: 'HK NO IT',
			date: '2022-09-14',
			author: userID[1].id
		},
		{
			post: postID[3].id,
			content: 'I ate KFC',
			date: '2022-09-25',
			author: userID[1].id
		}
	])

	const dietTypeID = await knex(dietTypesTableName)
		.insert([
			{ d_type: 'breakfast' },
			{ d_type: 'lunch' },
			{ d_type: 'dinner' },
			{ d_type: 'snack' }
		])
		.returning('id')

	await knex(foodGroupsTableName)
		.insert([
			{ food_group: '穀類' },
			{ food_group: '豆類' },
			{ food_group: '蔬菜類' },
			{ food_group: '水果類' },
			{ food_group: '堅果與種子' },
			{ food_group: '畜肉類' },
			{ food_group: '禽肉類' },
			{ food_group: '蛋類' },
			{ food_group: '奶類及其製品' },
			{ food_group: '冰凍甜點' },
			{ food_group: '魚類' },
			{ food_group: '不含酒精飲料' },
			{ food_group: '糖及糖類製品' },
			{ food_group: '湯類' },
			{ food_group: '小食' },
			{ food_group: '即食食物' }
		])
		.returning('id')

	await seedFile(knex, path.resolve('./seeds/foodcsv.csv'), 'food', {
		columnSeparator: ';',
		ignoreFirstLine: true,
		mapTo: [
			'food_name',
			'group_id',
			'food_calories',
			'carbohydrates',
			'sugars',
			'fat',
			'protein',
			'fiber',
			'sodium'
		]
	})

	await knex(usersDietTableName).insert([
		{
			diet_type: dietTypeID[0].id,
			food: 1,
			food_amount: 100,
			date: '2022-09-18',
			user_id: userID[0].id
		},
		{
			diet_type: dietTypeID[1].id,
			food: 2,
			food_amount: 100,
			date: '2022-09-20',
			user_id: userID[0].id
		},
		{
			diet_type: dietTypeID[2].id,
			food: 3,
			food_amount: 200,
			date: '2022-09-20',
			user_id: userID[0].id
		},
		{
			diet_type: dietTypeID[3].id,
			food: 4,
			food_amount: 500,
			date: '2022-09-21',
			user_id: userID[0].id
		},
		{
			diet_type: dietTypeID[0].id,
			food: 5,
			food_amount: 500,
			date: '2022-09-22',
			user_id: userID[0].id
		},
		{
			diet_type: dietTypeID[1].id,
			food: 6,
			food_amount: 200,
			date: '2022-09-25',
			user_id: userID[0].id
		}
	])
}
