export default class Range {
	constructor(name, parameter, min, max){
		this.name = name
		this.parameter = parameter
		this.min = min
		this.max = max
	}
	get value(){
		return this.parameter.value >= this.min && this.parameter.value <= this.max
	}
}