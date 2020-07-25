var fs = require("fs");
module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
      res.json(getAllNotes());
    });

    app.post("/api/notes", function(req, res) {
      let data = req.body;
      data = appendNewNote(data);
      res.json(data);
    });

    app.delete("/api/notes/:id", function(req, res) {
      let id = req.params.id;
      deleteNote(id);
      res.end();
    });

    function getAllNotes(){
      return JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    }
  
    function appendNewNote(note) {
      let notes = getAllNotes();
      let d = new Date();
      note["id"] = d.getTime();
      notes.push(note);
      overwriteNotes(notes);
      return note;
    }
  
    function deleteNote(id){
      id = parseInt(id);
      let notes = getAllNotes();
      for(let i = 0; i < notes.length; i++){
        if(notes[i].id == id){
          notes.splice(i, 1);
          overwriteNotes(notes);
          break;
        }
      }
    }
  
    function overwriteNotes(newNotes){
      fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
    }
  };