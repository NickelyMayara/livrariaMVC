const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, //Sen@iDev77!.
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

//CONECTAR ao BANCO
conn.connect((err) => {
    if (err) {
        console.error(err);
    }
    console.log("MYSQL Conectado!");
    app.listen(PORT, () => {
        console.log("Servidor on PORT " + PORT);
    });
});

export default conn;