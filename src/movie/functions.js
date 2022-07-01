const Movie = require("./table");
//create
exports.addMovie = async (movieObj) => {
  try {
    const response = await Movie.create(movieObj);
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};
//read
exports.listMovies = async () => {
  try {
    const searched = await Movie.findAll();
    console.log("All Movies:", JSON.stringify(searched, null, 2));
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMovie = async (movieObj) => {
  try {
    const deleted = await Movie.destroy({
      where: movieObj,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateMovie = async (updateObj, movieObj) => {
  try {
    const updated = await Movie.update(updateObj, {
      where: movieObj,
    });
  } catch (error) {
    console.log(error);
  }
};
