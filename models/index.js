const User = require('./user')
const WorkoutRoutine = require('./workoutRoutine')
const Like = require('./like')
const Comment = require('./comment')

User.hasMany(WorkoutRoutine, { foreignKey: "user_id" });
WorkoutRoutine.belongsTo(User, { foreignKey: 'user_id' });

WorkoutRoutine.hasMany(Like, { foreignKey: "workout_routine_id"});
WorkoutRoutine.hasMany(Comment, { foreignKey: "workout_routine_id" });


Like.belongsTo(User, {foreignKey: 'user_id'});//
Like.belongsTo(WorkoutRoutine, { foreignKey: 'workout_routine_id' });

Comment.belongsTo(User, {foreignKey: "user_id"});
Comment.belongsTo(WorkoutRoutine, { foreignKey: 'workout_routine_id'});


module.exports = { User, WorkoutRoutine, Like, Comment }; 