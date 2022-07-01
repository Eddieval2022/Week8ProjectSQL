const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, listMovies,  deleteMovie, updateMovie } = require("./movie/functions");

const app = async (yargsObj) => {
  try {
    await sequelize.sync({ alter: true });
    if (yargsObj.add) {
      //add something to movie table
      await addMovie({ title: yargsObj.title, actor: yargsObj.actor, rating:yargsObj.rating });
    } else if (yargsObj.list) {
      //list contents
      console.log(await listMovies({}));
    } else if (yargsObj.update) {
      //update
      const update = { title: yargsObj.update };
      // empty object to store changes in
      let change = {};
  
      // Check if the identifier exists, if yes add it to the changes object
      if (yargsObj.title) {
        //using spread operator instead of object assign
        change = { ...change, title: yargsObj.title };
      }
      if (yargsObj.actor) {
        change = { ...change, actor: yargsObj.actor };
      }
      if (yargsObj.director) {
        change = { ...change, director: yargsObj.director };
      }
        await updateMovie(change, update);
    } else if (yargsObj.delete) {
      //delete
      await deleteMovie({title: yargsObj.title});
    }
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
};
app(yargs.argv);
