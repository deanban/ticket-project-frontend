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
    this.initMap()
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


  initMap(){
    
    this.eventsNode = document.getElementById('events-container')

    this.eventsNode.addEventListener('click', (event) =>{
      
        let data = event.target.dataset

        if(data.action === "show-map") {

          let latitude =JSON.parse(event.target.parentElement.dataset.props).lat          
          let longitude = JSON.parse(event.target.parentElement.dataset.props).lng
          
          let location = this.location(latitude, longitude) 
          // debugger
          let map = new google.maps.Map(document.getElementById('maps'), {
               zoom: 14,
               center: location
          })
          let marker = new google.maps.Marker({
            position: location,
            map: map
          })
         
    
      }

    })
  }


  location(lattitude, longitude){
    return {
      lat: lattitude,
      lng: longitude
    }
  }



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
                        <form id="type-search-form"><h2>Search Events By Type:</h2>
                        <select id="type-select"></select>
                        <input id="type-input" type="submit" value="Search">
                        </form></div><ul class="event-list"><h4>${fe.map( event => event.render()).join('')}</h4></ul>`


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