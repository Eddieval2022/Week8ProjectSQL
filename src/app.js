const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, listMovies, deleteFilm, deleteMovie, updateMovie } = require("./movie/functions");

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
        await updateMovie({title: yargsObj.title, actor:yargsObj.actor, rating:yargsObj.rating})
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
