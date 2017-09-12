class Events {
  constructor() {
    this.events = []
    this.initBindingsAndEventListeners()
    this.adapter = new eventsAdapter()
    this.fetchAndLoadEvents()
  }

  initBindingsAndEventListeners() {
    this.eventsForm = document.getElementById('event-search-form')
    this.eventInput = document.getElementById('event-search-input')
    this.eventsNode = document.getElementById('events-container')
    this.sel = document.getElementById('select')
    this.eventsForm.addEventListener('submit',this.filterEvents.bind(this))
    // this.notesNode.addEventListener('click',this.handleDeleteNote.bind(this))
  }

  fetchAndLoadEvents() {
    this.adapter.getEvents()
    .then( eventsJSON => eventsJSON.forEach( e => this.events.push( new Event(e) )))
    .then( () =>{
    let stateList = this.events.map(e => e.state)
    this.select_box(stateList)
    })
      .catch( () => alert('The server does not appear to be running') )

  }

  filterEvents() {
    event.preventDefault()
    let searchStr = this.sel.value

    let searchRegex = new RegExp(searchStr, "i")

    let filteredEvents = this.events.filter(event =>{
      return event.state.match(searchRegex)
    })
    if (filteredEvents.length === 0) {this.eventsNode.innerHTML = "There are no events in that state"}
      else {this.render(filteredEvents)}

  }

//   handleAddNote() {
//     event.preventDefault()
//     const body = this.noteInput.value
//     this.adapter.createNote(body)
//     .then( (noteJSON) => this.notes.push(new Note(noteJSON)) )
//     .then(  this.render.bind(this) )
//     .then( () => this.noteInput.value = '' )
//   }

//   handleDeleteNote() {
//     if (event.target.dataset.action === 'delete-note' && event.target.parentElement.classList.contains("note-element")) {
//       const noteId = event.target.parentElement.dataset.noteid
//       this.adapter.deleteNote(noteId)
//       .then( resp => this.removeDeletedNote(resp) )
//     }
//   }

//   removeDeletedNote(deleteResponse) {
//     this.notes = this.notes.filter( note => note.id !== deleteResponse.noteId )
//     this.render()
//   }

  // eventsHTML() {
  //   return this.events.map( event => event.render() ).join('')
  // }

  render(fe) {
    this.eventsNode.innerHTML = `<ul>${fe.map( event => event.render() ).join('')}</ul>`
  }

  select_box(list){

  //populate select drpdown box with state names sorted albhabetically, and without duplicates

  //remove duplicates
  list = list.filter(function(v,i) { return list.indexOf(v) == i; }).sort()

  //populate
  let sel = document.getElementById('select')

  for(let i = 0; i < list.length; i++) {
      // let opt = document.getElementById('option');
      let opt = document.createElement('option')
      opt.innerHTML = list[i]
      opt.value = list[i]
      sel.appendChild(opt)
      // console.log(opt.value)
  }
  // let x = sel.selectedIndex
  // console.log(document.getElementsByTagName("option")[x].value)
  
}
}