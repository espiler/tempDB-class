module.exports = Database;

function Database() {
  // Create data & values table stacks
  this.data = [{}];
  this.values = [{}];

  // Update data & values table for current transaction
  this.set = function(key, val) {    
    if (this.data[this.data.length-1][key]) { this.values[this.values.length-1][this.data[this.data.length-1][key]]--; }
    this.values[this.values.length-1][val] ?
      this.values[this.values.length-1][val]++ :
      this.values[this.values.length-1][val] = 1;
    this.data[this.data.length-1][key] = val;
  }

  this.get = function(key) {
    return this.data[this.data.length-1][key] || 'NULL';
  }

  // Update data & values table for current transaction
  this.unset = function(key) {
    if (this.data[this.data.length-1][key]) { this.values[this.values.length-1][this.data[this.data.length-1][key]]--; }
    this.data[this.data.length-1][key] = null;
  }

  this.numEqualTo = function(val) {
    return this.values[this.values.length-1][val] || 0;
  }

  // Push new subclassed data & values tables with to stacks
  this.begin = function() {
    this.data.push(Object.create(this.data[this.data.length-1]));
    this.values.push(Object.create(this.values[this.values.length-1]));
  }

  // Pop data & values tables from stacks to return to prev state
  this.rollback = function() {
    if (this.data.length === 1) { return "NO TRANSACTION"; }
    this.data.pop();
    this.values.pop();
  }

  // Reset stack with most recent transaction at 0
  this.commit = function() {
    if (this.data.length === 1) { return "NO TRANSACTION"; }
    this.data = [this.data[this.data.length-1]];
    this.values = [this.values[this.values.length-1]];
  }
}
