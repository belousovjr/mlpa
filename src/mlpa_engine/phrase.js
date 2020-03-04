export default class Phrase {
	constructor(text, range){
		this.text = text
		this.range = range
	}
	get perm(){
		return this.range ? this.range.value : true
	}
}