export default class Graduation {
	constructor(name, ...ranges){
		this.name = name
		this.ranges = ranges
	}
	get value(){
		for(let i = 0; i < this.ranges.length; i++){
		const range = this.ranges[i]	
		if(!range.value) return false
		}
	return true
	}
}