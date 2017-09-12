class Event {
  constructor(eventJSON) {
    this.name = eventJSON.name
    this.event_type = eventJSON.event_type
    this.state = eventJSON.state
    this.zip = eventJSON.zip
    this.price = eventJSON.price
    this.id = eventJSON.id
  }

  render() {
    return `<li data-eventid='${this.id}' data-props='${JSON.stringify(this)}' class='event-element'>${this.name} $${this.price} <i data-action='delete-event' class="em em-scream_cat"></i></li>`
  }
}