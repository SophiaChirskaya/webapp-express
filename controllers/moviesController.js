const connection = require('../data/db' );

function index(req, res) {
    console.log("ciao");
    
    const moviesSql = "SELECT * FROM movies;";

    connection.query(moviesSql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);
    
    });


}

function show(req, res) {
    const { id } = req.params;
    const detailMovie = "SELECT * FROM movies WHERE movies.id = ?";
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(detailMovie, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found'});
        
        const movie = movieResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            
            movie.reviews = reviewResult;
            
            movie.image = req.imagePath + movie.image;
            
            res.json(movie);

        });

    });
    

}

function store(req, res) {
   

}

function update(req, res) {


}

function destroy(req, res) {

        
}

module.exports = { index, show, store, update, destroy }