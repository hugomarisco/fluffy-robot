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
    if (index >= 0 && this.records[index]) {
      return this.records[index];
    } else {
      throw new TypeError(`${JSON.stringify(index)} is not a valid index`);
    }
  }

  find(filterFn) {
    return this.records.filter(filterFn);
  }

  all() {
    return this.find(() => true);
  }

  put(index, obj) {
    if (obj) {
      if (index >= 0 && this.records[index]) {
        this.records[index] = obj;

        this.persist();
      } else {
        throw new TypeError(`${JSON.stringify(index)} is not a valid index`);
      }
    } else {
      throw new TypeError(`${JSON.stringify(obj)} is not a valid object`);
    }
  }

  append(obj) {
    if (obj) {
      this.records.push(obj);

      this.persist();
    } else {
      throw new TypeError(`${JSON.stringify(obj)} is not a valid object`);
    }
  }

  remove(index) {
    if (index >= 0 && this.records[index]) {
      delete this.records[index];

      this.persist();
    } else {
      throw new TypeError(`${JSON.stringify(index)} is not a valid index`);
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
}
