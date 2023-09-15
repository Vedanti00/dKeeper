import List "mo:base/List";
import Debug "mo:base/Debug";
actor dKeeper {
  public type Note = {
    title: Text;
    content: Text;
  };
// To keep data permanently in db
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes))
  };

    //display notes from backend
    public query func readNotes(): async [Note] {
      return List.toArray(notes);
  };

  // delete note 
  public func removeNote(id: Nat){
    let listFront = List.take(notes, id);
    let listBack = List.drop(notes, id+1);
    notes := List.append(listFront, listBack);
    };

}