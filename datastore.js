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
    if (index === undefined || index === null || index < 0 || !this.records[index]) {
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
    if (!obj) {
      throw new TypeError(`Datastore.put(${JSON.stringify(obj)}, ${JSON.stringify(obj)}) - object is not valid`);
    }

    if (index === null || index === undefined || index < 0) {
      throw new TypeError(`Datastore.put(${JSON.stringify(index)}, ${JSON.stringify(obj)}) - index is not valid`);
    }

    this.records[index] = obj;

    this.persist();
  }

  append(obj) {
    if (obj) {
      this.records.push(obj);

      this.persist();
    } else {
      throw new TypeError(`Datastore.append(${JSON.stringify(obj)}) - object is not valid`);
    }
  }

  remove(index) {
    if (index >= 0 && this.records[index]) {
      delete this.records[index];

      this.persist();
    } else {
      throw new TypeError(`Datastore.remove(${JSON.stringify(index)}) - index is not valid`);
    }
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
};
