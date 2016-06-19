/*
  For this exercise I'll simplify things and use the datastore to simply
  save/load my JSON-encoded POJO.
*/

const fs = require('fs');
const path = require('path');

module.exports = class {
  constructor(filename) {
    this.path = path.resolve(__dirname, 'storage', filename);

    this.records = this.load();
  }

  get(index) {
    if (!this._validKey(index)) {
      throw new TypeError(`Datastore.get(${JSON.stringify(index)}) - index is not valid`);
    }

    return this.records[index];
  }

  find(filterFn) {
    return this.records.filter(filterFn);
  }

  all() {
    return this.find(() => true);
  }

  put(index, obj) {
    if (!this._validObj(obj)) {
      throw new TypeError(`Datastore.put(${JSON.stringify(obj)}, ${JSON.stringify(obj)}) - object is not valid`);
    }

    if (!this._validKey(index)) {
      throw new TypeError(`Datastore.put(${JSON.stringify(index)}, ${JSON.stringify(obj)}) - index is not valid`);
    }

    this.records[index] = obj;

    this.persist();
  }

  append(obj) {
    if (!this._validObj(obj)) {
      throw new TypeError(`Datastore.append(${JSON.stringify(obj)}) - object is not valid`);
    }

    this.records.push(obj);

    this.persist();
  }

  remove(index) {
    if (!this._validKey(index)) {
      throw new TypeError(`Datastore.remove(${JSON.stringify(index)}) - index is not valid`);
    }

    this.records.splice(index, 1);

    this.persist();
  }

  clear() {
    this.records = [];

    this.persist();
  }

  load() {
    try {
      return JSON.parse(fs.readFileSync(this.path));
    } catch (e) {
      return [];
    }
  }

  persist() {
    fs.writeFileSync(this.path, JSON.stringify(this.records));
  }

  // Pseudo-private methods

  _validKey(key) {
    return key !== undefined && key !== null && key >= 0 && this.records[key];
  }

  _validObj(obj) {
    return obj !== undefined && obj !== null;
  }
};
