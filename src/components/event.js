class Event {
  constructor(eventJSON) {
    this.name = eventJSON.name
    this.event_type = eventJSON.event_type
    this.state = eventJSON.state
    this.zip = eventJSON.zip
    this.price = eventJSON.price
    this.id = eventJSON.id
    this.lat = eventJSON.lat
    this.lng = eventJSON.lng
  }

  render() {
    return `<li data-eventid='${this.id}' data-props='${JSON.stringify(this)}' class='event-element'>${this.name} $${this.price}<button id="add-cart">Add to cart</button>
    <button data-action="show-map" data-itemid="${this.id}" class="show-on-map">Map it</button></li>`
  }

}