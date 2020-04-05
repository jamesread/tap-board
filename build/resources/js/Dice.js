export class Dice extends HTMLElement {
	constructor() {
		super();

		this.value = 1;
		this.sides = 6;
	}

	async roll() {
		return new Promise(resolve => {
			this.tumblesRemaining = 10;
			this.tumble(resolve)
		});
	}

	tumble(resolver) {
		console.log("tumbling", this.tumblesRemaining)

		if (this.tumblesRemaining <= 0) {
			resolver();
		} else {
			this.value = Math.floor((Math.random() * 6) + 1);
			this.updateValue();


			this.tumblesRemaining--;
			setTimeout(() => {
				this.tumble(resolver)
			}, 100);
		}
	}

	updateValue() {
		let displayCharacter = 9855 + this.value;

		this.innerHTML = "&#" + displayCharacter;
	}

	connectedCallback() {
		this.updateValue()
	}

}

customElements.define("x-dice", Dice);
