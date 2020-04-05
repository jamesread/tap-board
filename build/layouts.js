import { Panel } from "./resources/js/Gui.js"
import { Dice } from "./resources/js/Dice.js"

export class NormalDice {
	constructor(count) {
		var mainPanel = document.createElement("x-dice-panel");
		mainPanel.createDice(count);

		document.body.appendChild(mainPanel);
	}
}

export class ThreeTwoDice {
	constructor() {
		var attackerPanel = document.createElement("x-dice-panel");
		attackerPanel.createDice(3);
		attackerPanel.classList.add("male")
		attackerPanel.style.color = "red";

		var defenderPanel = document.createElement("x-dice-panel");
		defenderPanel.classList.add("female");
		defenderPanel.createDice(2);

		document.body.appendChild(attackerPanel);
		document.body.appendChild(defenderPanel);
	}
}
