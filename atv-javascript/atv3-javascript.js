class IntegerSet {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.values = new Array(maxValue + 1).fill(false);
  }

  insert(num) {
    if (this._isValid(num)) this.values[num] = true;
  }

  remove(num) {
    if (this._isValid(num)) this.values[num] = false;
  }

  contains(num) {
    return this._isValid(num) && this.values[num];
  }

  union(otherSet) {
    const result = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      result.values[i] = this.values[i] || otherSet.values[i];
    }
    return result;
  }

  intersection(otherSet) {
    const result = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      result.values[i] = this.values[i] && otherSet.values[i];
    }
    return result;
  }

  difference(otherSet) {
    const result = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      result.values[i] = this.values[i] && !otherSet.values[i];
    }
    return result;
  }

  toString() {
    const elementos = [];
    for (let i = 0; i <= this.maxValue; i++) {
      if (this.values[i]) elementos.push(i);
    }
    return `{ ${elementos.join(', ')} }`;
  }

  _isValid(num) {
    return Number.isInteger(num) && num >= 0 && num <= this.maxValue;
  }
}

//teste
const A = new IntegerSet(100);
A.insert(23);
A.insert(76);
A.insert(98);
const B = new IntegerSet(100);
B.insert(14);
B.insert(89);
B.insert(23);
const C = A.union(B);
console.log("Uniao:      ", C.toString()); 

const D = A.intersection(B);
console.log("Intersecao: ", D.toString()); 

const E = A.difference(B);
console.log("Diferenca:  ", E.toString()); 

console.log("A tem 76?", A.contains(76)); 
