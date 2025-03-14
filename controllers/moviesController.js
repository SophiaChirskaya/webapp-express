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

function store(req, res, next) {

    const { title, director, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    const query = 'INSERT INTO movies (title, director, abstract, image) VALUES (?, ?, ?, ?)';

    connection.query(query, [title, director, abstract, imageName], (err, result) => {
        if (err) {
            console.log(err)
            return next (new Error("Errore interno del server"));    
        }
        res.status(201).json({
            status: "success",
            message: "New movie has been added"
        });
    })

}

function storeReview(req, res) {

    // id preso dai parametri
    const { id } = req.params;

    // le info dal body
    const { name, vote, text } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(insertReviewSql, [name, vote, text, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: "Review added", id: results.insertId });
    });
}

function update(req, res) {


}

function destroy(req, res) {

        
}

module.exports = { index, show, store,storeReview, update, destroy }