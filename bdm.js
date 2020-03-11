require('dotenv').config();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: process.env.DBADDRESS,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

con.connect(function(err) {
    if (err) throw err;
    console.log("SQL connected!");
});

userbdm = function(entry, date){
    entry.total++;
    if (entry.last.substring(0, 10) != date){
        var sql = "UPDATE bdm SET total = '"+ (entry.total) +"', daycount = '1', last = '"+ date +"' WHERE name = " + mysql.escape(entry.name);
    } else {
        var sql = "UPDATE bdm SET total = '"+ (entry.total) +"', daycount = '"+ (entry.daycount + 1) +"' WHERE name = " + mysql.escape(entry.name);
        entry.daycount++;
    }
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    entry.last = date;
    return entry;
}

newuserbdm = function(name, date){
    var sql = "INSERT INTO bdm (name, total, last, daycount) VALUES (" + mysql.escape(name) + ", '1', " + mysql.escape(date) + ", '1')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    entry = {
        name: name,
        total : 1,
        last: "",
        daycount : 1
    }
    return(entry);
}

display = function(msg, entry){
    if (entry.total == 1){
        msg.channel.send("Bravo " + entry.name + " c'est ta première Blague de Merde ici!!")
    } else if (entry.daycount == 1){
        msg.channel.send("Allez.. " + entry.name + "c'est ta " + entry.total + "ème BDM!")
    } else {
        msg.channel.send("Putain " + entry.name + "! c'est ta " + entry.total + "ème BDM et ta " + entry.daycount + "ème aujourd'hui!!")
    }
}

exports.newbdm = function(msg, name){
    if (name.charAt(1) != '@')
        return false;
    
    const index = name.indexOf(' ');
    if (index != -1){
        name = name.substring(0, index);
    }

    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let date = year + "-" + month + "-" + day;

    con.query("SELECT * FROM bdm WHERE name =  " + mysql.escape(name), function (err, result) {
        if (err) throw err;
        if (result[0]){
            entry = userbdm(result[0], date);
        } else {
            entry = newuserbdm(name, date);
        }
        display(msg, entry);
    });
}