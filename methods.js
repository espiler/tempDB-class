module.exports = Database;

function Database() {
  this.data = {};
  this.values = {};
  this.dataChanges = {};
  this.valueChanges = {};
  this.transaction = 0;
  this.inTransaction = false;

  this.updateValue = function(key, val, mod) {
    mod = mod || 1;
    this.values[val] ?
      this.values[val]+= 1*mod :
      this.values[val] = 1*mod;
    if (this.transaction) {
      this.valueChanges[this.transaction][this.data[key]] ?
        this.valueChanges[this.transaction][this.data[key]]+= 1*mod :
        this.valueChanges[this.transaction][this.data[key]] = 1*mod;
    }
  }
  
  this.set = function(key, val) {
    if (this.data[key]) { this.updateValue(key, this.data[key], -1); }
    if (this.transaction && !this.dataChanges[this.transaction][key]) { this.dataChanges[this.transaction][key] = this.data[key] || 'delete'}
    this.data[key] = val;
    this.updateValue(key, val);
  }

  this.get = function(key) {
    return this.data[key] || 'NULL';
  }

  this.unset = function(key) {
    if (this.data[key]) {
      this.updateValue(key, this.data[key], -1);
    }
    if (this.transaction && !this.dataChanges[this.transaction][key]) { this.dataChanges[this.transaction][key] = this.data[key] || 'delete'}
    delete this.data[key];
  }

  this.numEqualTo = function(val) {
    return this.values[val] || 0;
  }

  this.begin = function() {
    this.inTransaction = true;
    this.transaction++;
    this.dataChanges[this.transaction] = {};
    this.valueChanges[this.transaction] = {};
  }

  this.rollback = function() {
    if (!this.inTransaction) { return "NO TRANSACTION"; }
    for (var key in this.dataChanges[this.transaction]) {
      this.dataChanges[this.transaction][key] === 'delete' ?
        delete this.data[key] :
        this.data[key] = this.dataChanges[this.transaction][key];
    }
    for (var value in this.valueChanges[this.transaction]) {
      this.values[value] -= this.valueChanges[this.transaction][value];
    }
    delete this.dataChanges[this.transaction];
    delete this.valueChanges[this.transaction];
    this.transaction--;
    if (!this.transaction) { this.inTransaction = false; }
  }

  this.commit = function() {
    if (!this.inTransaction) { return "NO TRANSACTION"; }
    this.transaction = 0;
    this.inTransaction = false;
    this.dataChanges = {};
    this.valueChanges = {};
  }
}