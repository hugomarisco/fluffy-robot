const expect = require('chai').expect;
const Datastore = require('../datastore');

let storage;

describe("File-based datastore", () => {
  beforeEach((done) => {
    storage = new Datastore('test');

    storage.clear();

    storage.append({ firstname: "Hugo", surname: "Marisco" });
    storage.append({ firstname: "John", surname: "Doe" });
    storage.append({ firstname: "Bar", surname: "Baz" });

    done();
  });


  // Append
  it("should append multiple records", () => {
    storage.append({ firstname: "Uno", surname: "Dos" });

    expect(storage.all()).to.have.lengthOf(4);

    expect(storage.all()[0].firstname).to.equal("Hugo");
    expect(storage.all()[1].firstname).to.equal("John");
    expect(storage.all()[2].firstname).to.equal("Bar");
    expect(storage.all()[3].firstname).to.equal("Uno");
  });

  it("should throw an error trying to append invalid objects", () => {
    expect(() => storage.append(null)).to.throw(TypeError);
    expect(() => storage.append(undefined)).to.throw(TypeError);
  });


  // Delete
  it("should delete specific records", () => {
    expect(storage.all()).to.have.lengthOf(3);

    storage.remove(1);

    expect(storage.all()).to.have.lengthOf(2);

    expect(storage.all()[0].firstname).to.equal("Hugo");
    expect(storage.all()[1].firstname).to.equal("Bar");
  });

  it("should throw an error trying to remove invalid indexes", () => {
    expect(() => storage.remove(10)).to.throw(TypeError);
    expect(() => storage.remove(-1)).to.throw(TypeError);
  });

  it("should clear the database", () => {
    expect(storage.all()).to.have.lengthOf(3);

    storage.clear();

    expect(storage.all()).to.have.lengthOf(0);
  });


  // List
  it("should return all records", () => {
    expect(storage.all()).to.have.lengthOf(3);
  });


  // Read
  it("should return specific records", () => {
    expect(storage.get(0).firstname).to.equal("Hugo");
    expect(storage.get(1).firstname).to.equal("John");
  });

  it("should throw an exception trying to get an invalid index", () => {
    expect(() => storage.get(4)).to.throw(TypeError);
    expect(() => storage.get(5)).to.throw(TypeError);
    expect(() => storage.get(-1)).to.throw(TypeError);
  });


  // Update
  it("should replace specific records", () => {
    expect(storage.all()[0].firstname).to.equal("Hugo");

    storage.put(0, { firstname: "Tim", surname: "Martin" });

    expect(storage.all()).to.have.lengthOf(3);

    expect(storage.all()[0].firstname).to.equal("Tim");
  });

  it("should throw an exception trying to update an invalid index", () => {
    expect(() => storage.put(-1, {})).to.throw(TypeError);
    expect(() => storage.put(10, {})).to.throw(TypeError);
  });

  it("should throw an exception if updated object is invalid", () => {
    expect(() => storage.put(0, null)).to.throw(TypeError);
    expect(() => storage.put(1, undefined)).to.throw(TypeError);
  });
});
