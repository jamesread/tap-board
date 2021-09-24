import { Dice } from "./resources/js/Dice.js"
import "./resources/js/GuiComponents.js"

window.boards = {}

function defineBoard(name, clazz) {
  window.boards[name] = clazz;
}

class Board{
  create(el) {
    var l = document.createElement(el)
    document.body.append(l);
    return l;
  }

  createLabel() {
    return this.create("x-label")
  }

  createPanel() {
    return this.create("x-panel");
  }

  createButton(label, lambda) {
    let l = this.create("x-button")
    l.innerText = label;
    l.onclick = lambda

    return l;
  }
}

defineBoard("NormalDice", class extends Board {
	constructor(count) {
    super()

		var mainPanel = document.createElement("x-dice-panel");
		mainPanel.createDice(1);

		document.body.appendChild(mainPanel);
	}
});

defineBoard("ThreeTwo", class extends Board {
	constructor() {
    super()

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
});

defineBoard("UpDown", class extends Board {
  constructor() {
    super();

    this.count = 50;

    this.createButton("-", () => {
      this.count--;
      this.lblSpan.innerText = "" + this.count
    });

    this.lblSpan = this.createLabel();
    this.lblSpan.innerText = "" + this.count

    this.createButton("+", () => {
      this.count++;
      this.lblSpan.innerText = "" + this.count
    });
  }
});
