// no need for jquery: it's a really big library: bad for performace

const $ = (selector) => {
	return document.querySelector(selector);
}




class Calculator {
	constructor() {
		this.state = {
			monitor: [],
			output: ""
		};
		this.output = document.getElementById("steps");
		this.input = document.getElementById("calBody");
		this.bound = this.bound.bind(this);
		this.getUserInput();
		this.leaveZero();
	}

	render() {
		this.output.innerHTML = this.state.output;
	}

	getUserInput() {
		this.input.addEventListener('click', (e) => {
			var id = e.target.id;
			if (id !== "calBody") {
				const ctrkeys = ["deleteAll", "backOne", "total"];
				ctrkeys.includes(id) ? this.commandStation(id) : this.regularClick(id);
			}
		});
	}



	commandStation(id) {
		switch (id) {
			case "deleteAll":
				this.deleteAll();
				break;
			case "backOne":
				this.backOne();
			case "total":
				this.total();
			default:
				break;
		}
	}

	regularClick(id) {
		this.state.monitor.push(id);
		this.state.output = this.state.monitor.join("");
		this.render();
		console.log(this.state.monitor);
	}

	deleteAll() {
		this.state = {
			monitor: [],
			output: ""
		}
		this.render();
		this.leaveZero();
	}

	// not wroking
	backOne() {
		this.state.monitor.pop();
		this.state.output = this.state.monitor.join("");
		this.render();
		console.log(this.state.monitor)
		if (this.state.output === "") {
			this.state.output = "0";
		}
	}

	total() {
		// give something wrong and see how it works
		try{
			var total = eval(this.state.monitor.join(""));
		}catch(e){
			total = e;
		}

		this.state = {
			output: total,
			monitor: [].concat(total)
		};
		this.render();
	}



	bound() {
		this.deleteAll = this.deleteAll.bind(this);
		this.backOne = this.backOne.bind(this);
		this.total = this.total.bind(this);
		this.commandStation = this.commandStation.bind(this);
		this.getUserInput = this.getUserInput.bind(this);
		this.render = this.render.bind(this);
	}
	leaveZero() {
		this.output.innerHTML = "0";
	}

}



const StartCalc = new Calculator();