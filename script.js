class History {
	historyShow(state, deleteAll) {
		const target = document.getElementById("history");
		var p = document.createElement("p");
		p.innerHTML = state.join("");
		deleteAll ? target.innerHTML = "" : target.appendChild(p);
	}

	historyPush(state) {
		this.history.push(state);
		this.redoUndoKeyPressed = this.history.length;
		this.historyShow(state);
	}

	deleteHistory() {
		this.history = [];
		this.historyShow([], "delete");
		this.redoUndoKeyPressed = this.history.length;
	}

	RedoOrUndo(cmd) {
		cmd === "undo" && this.redoUndoKeyPressed ? this.goAhead("undo") : false;
		cmd === "redo" && this.redoUndoKeyPressed < this.history.length - 1 ? this.goAhead("redo") : true;
	}

	goAhead(cmd) {
		cmd === "undo" ? this.redoUndoKeyPressed-- : this.redoUndoKeyPressed++;
		this.setState({
			input: this.history[this.redoUndoKeyPressed]
		})
	}
}








class Calculator extends History {
	constructor() {
		super();
		this.state = [];
		this.history = [];
		this.redoUndoKeyPressed = 0;
		this.instantiate();
	}

	instantiate() {
		this.getUserInput();
		this.render();
		this.history.push();
	}

	render(total) {
		var noData = this.state.join("");
		noData === "" ? noData = 0 : true;
		document.getElementById("steps").innerHTML = total ? total : noData;
	}

	regularClick(id) {
		this.setState({
			input: this.state.concat(id)
		})
	}

	backOne() {
		this.state.pop();
		this.render();
	}

	deleteAll() {
		this.setState({
			input: []
		});
		this.redoUndoKeyPressed = this.history.length;
	}

	setState(obj, total) {
		this.state = obj.input;
		this.render(total);
	}

	commandStation(id) {
		switch (id) {
			case "deleteAll":
				this.deleteAll();
				break;
			case "backOne":
				this.backOne();
				break;
			case "total":
				this.getTotal("total");
				break;
			case "undo":
				this.RedoOrUndo("undo");
				break;
			case "redo":
				this.RedoOrUndo("redo");
				break;
			default:
				break;
		}
	}

	getTotal(cmd) {
		try {
			var total = eval(this.state.join(""));
			this.historyPush(this.state);
		} catch (e) {
			var total = e;
		}
		this.setState({
			input: [].concat(total.toString().split(""))
		}, total);
	}

	getUserInput() {
		document.getElementById("deleteHistory").addEventListener("click", (e) => {
			this.deleteHistory();
		});
		document.getElementById("calBody").addEventListener('click', (e) => {
			var id = e.target.id;
			if (id !== "calBody") {
				const ctrkeys = ["deleteAll", "backOne", "total", "undo", "redo"];
				ctrkeys.includes(id) ? this.commandStation(id) : this.regularClick(id);
			}
		});
	}
}


const StartCalc = new Calculator();