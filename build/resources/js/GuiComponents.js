export class Component extends HTMLElement {
	constructor() {
		super();
	}

  connectedCallback() {
		this.classList.add("component");
  }
}

export class DicePanelComponent extends Component {
	constructor() {
		super();

		this.toolbar = document.createElement("x-panel-toolbar");
		this.addEventListener("click", () => { this.doRoll() });
	}

	createDice(count) {
		this.dice = [];

		for (var i = 0; i < count; i++) {
			this.dice[i] = document.createElement("x-dice");

			this.appendChild(this.dice[i]);
		}
	}

	async doRoll() {
		var rollingDice = [];

		this.dice.forEach(d => rollingDice.push(d.roll()));

		await Promise.all(rollingDice);
		
		console.log("Rolling complete");
	}
}

customElements.define("x-dice-panel", DicePanelComponent);

class LabelComponent extends Component {

}

customElements.define("x-label", LabelComponent);

class ButtonComponent extends Component {
}

customElements.define("x-button", ButtonComponent);
