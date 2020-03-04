export default class Parameter {
	constructor(name, value){
		this.name = name
		this.value = value
	}
	lim = 10;
	edit(value){
		if(this.value + value > this.lim)this.value = this.lim
		else if(this.value + value < 0)this.value = 0
	}
}