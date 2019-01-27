export class Panel extends HTMLElement {
	constructor() {
		super();

	}

	connectedCallback() {
		this.classList.add("panel");
	}
}

customElements.define("x-panel", Panel);

class PanelToolbar extends HTMLElement {
}

customElements.define("x-panel-toolbar", PanelToolbar);

export class DicePanel extends Panel {
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

customElements.define("x-dice-panel", DicePanel);
