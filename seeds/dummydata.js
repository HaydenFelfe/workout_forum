const sequelize = require("../config/connection");
const { User, WorkoutRoutine, Comment, Like } = require("../models");
const workoutData = require('./')

const seedUsers = async () => { 
  try {
    await sequelize.sync({ force: true });
    const users = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" },
      { username: "user3", email: "user3@example.com", password: "password3" },
    ];
    const createUsers = await User.bulkCreate(users);
    console.log("users seeded successfully:", createUsers);

    const workoutRoutines = [
      {
        title: "Workout 1",
        description: "Description for Workout 1",
        user_id: createUsers[0].id,
      },
      {
        title: "Workout 2",
        description: "Description for Workout 2",
        user_id: createUsers[1].id,
      },
      {
        title: "Workout 3",
        description: "Description for Workout 3",
        user_id: createUsers[2].id,
      },
    ];
    const createdWorkoutRoutines = await WorkoutRoutine.bulkCreate(workoutRoutines);
    console.log("workout routines seeded successfully:", createdWorkoutRoutines);

    const comments = [
      {
        comment: "Comment 1 for workout 1",
        user_id: createUsers[0].id,
        workout_routine_id: createdWorkoutRoutines[0].id,
      },
      {
        comment: "Comment 2 for workout 1",
        user_id: createUsers[1].id,
        workout_routine_id: createdWorkoutRoutines[0].id,
      },
      {
        comment: "Comment 1 for workout 2",
        user_id: createUsers[2].id,
        workout_routine_id: createdWorkoutRoutines[1].id,
      },
      {
        comment: "Comment 1 for workout 3",
        user_id: createUsers[0].id,
        workout_routine_id: createdWorkoutRoutines[2].id,
      },
      {
        comment: "Comment 2 for workout 3",
        user_id: createUsers[2].id,
        workout_routine_id: createdWorkoutRoutines[2].id,
      },
    ];
    const createdComments = await Comment.bulkCreate(comments);
    console.log("comment added successfully", createdComments);

    const likes = [
      {
        workout_routine_id: createdWorkoutRoutines[0].id,
        user_id: createUsers[0].id,
        count: 1,
      },
      {
        workout_routine_id: createdWorkoutRoutines[0].id,
        user_id: createUsers[1].id,
        count: 2,
      },
      {
        workout_routine_id: createdWorkoutRoutines[1].id,
        user_id: createUsers[0].id,
        count: 1,
      },
      {
        workout_routine_id: createdWorkoutRoutines[2].id,
        user_id: createUsers[2].id,
        count: 1,
      },
    ];
    const createdLikes = await Like.bulkCreate(likes);
    console.log("successfully seeded likes", createdLikes);
    


  } catch (err) {
    console.error("error seeding users:", err);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
