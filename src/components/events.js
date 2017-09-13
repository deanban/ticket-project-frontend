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
    // this.eventsForm.addEventListener('submit', this.createNewSearch.bind(this))
    this.eventsForm.addEventListener('submit', this.filterEvents.bind(this))
    // this.notesNode.addEventListener('click',this.handleDeleteNote.bind(this))
  }

  fetchAndLoadEvents() {
    this.adapter.getEvents()
    .then( eventsJSON => eventsJSON.forEach( e => this.events.push( new Event(e) )))
    .then( () =>{
    let stateList = this.events.map(e => e.state)
    this.select_box(stateList, this.sel)
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
    if (!this.cart) {this.cart = new Cart()}


  }


  // createNewSearch(arr) {
  //        this.eventsNode.innerHTML += `<div id="event-container"><form id="event-search-form">Search Events By Type:<select id="select"></select><input type="submit" value="Search"></form></div>`

  // }

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



  select_box(list, box){

  //populate select drpdown box with state names sorted albhabetically, and without duplicates

  //remove duplicates
    list = list.filter(function(v,i) { return list.indexOf(v) == i; }).sort()

  //populate

    for(let i = 0; i < list.length; i++) {
      // let opt = document.getElementById('option');
      let opt = document.createElement('option')
      opt.innerHTML = list[i]
      opt.value = list[i]
      box.appendChild(opt)
        // console.log(opt.value)
    }
  }

    render(fe) {
    this.eventsNode.innerHTML = `<div id="event-container">
                        <form id="type-search-form">Search Events By Type:
                        <select id="type-select"></select>
                        <input id="type-input" type="submit" value="Search">
                        </form></div><ul>${fe.map( event => event.render()).join('')}</ul>`


    let box = document.getElementById('type-select')
    let list = this.events.map(e => e.event_type)
    this.select_box(list, box)
    let typeSearchForm = document.getElementById('type-search-form')
    typeSearchForm.addEventListener("submit", () => {event.preventDefault() 
      this.filterTypes()})
    // debugger
  }

   filterTypes() {
    event.preventDefault()
    let box = document.getElementById('type-select')
    let eventStr = this.sel.value
    let typeStr = box.value

    let filteredEvents = this.events.filter(event =>{
      return event.state.includes(eventStr)
    })

    let evenMoreFiltered = filteredEvents.filter(event =>{
      return event.event_type.includes(typeStr)
    })


    if (evenMoreFiltered.length === 0) {this.eventsNode.innerHTML = "There are no events of that type"}
      else {this.render(evenMoreFiltered)}


  }


}