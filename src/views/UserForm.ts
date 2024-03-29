import { User } from '../models/User';

export class UserForm {
  constructor (public parent: Element, public model: User) {
    this.bindModel()
  }

  bindModel (): void {
    this.model.on('change', () => {
      this.render();
    })
  }

  eventsMap (): {[key: string]: () => void} {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
   const input =  this.parent.querySelector('input');

    const name = input.value;
    this.model.set({ name })
  }

  bindEvents(fragment: DocumentFragment) {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selectory] = eventKey.split(':');
      
      fragment.querySelectorAll(selectory).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  template (): string {
    return `
    <div>
      <h1>User Form</h1>
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>
      <input /><br/>
      <button>click me</button><br/>
      <button class="set-age">Set Random Age</button>
      <button class="set-name">Set Name</button>
    </div>
    `
  }

  render (): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)

    this.parent.append(templateElement.content);
  }
}