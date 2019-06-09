import { CustomElement } from 'custom-elements-ts';

@CustomElement({
  tag: 'counter-element',
  template: `<button id="count">0</button>`,
})
export class CounterElement extends HTMLElement {

  // code as you would when creating a native HTMLElement
  // full source code is at demo/counter
}
