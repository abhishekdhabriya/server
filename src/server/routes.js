export default function(app) {
    app.get('/', (req, res)=> {
        res.send(['hi', 'blessings']);
    });

    app.get('/auth', (req, res)=> {
        res.send('Inside auth route');
    });
}