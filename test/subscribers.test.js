import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

const should = chai.should();

chai.use(chaiHttp);

let token, _id;

describe("@@@@ Subscriber tests:", () => {
  before(done => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "farid.mansimli@gmail.com", password: "qwerty12345" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("#### POST tests", () => {
    it("POST (/api/subscribers)  >>> it should post a subscriber", done => {
      const subscriber = {
        fullname: "Farid Mansimli",
        email: "farid.mansimli@gmail.com",
        isActive: false,
      };

      chai
        .request(server)
        .post("/api/subscribers")
        .set("Authorization", "Bearer " + token)
        .send(subscriber)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email").eql(subscriber.email);
          res.body.should.have.property("fullname").eql(subscriber.fullname);
          res.body.should.have.property("isActive").eql(subscriber.isActive);
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("_id");
          _id = req.body._id;
          done();
        });
    });
  });

  describe("#### GET tests", () => {
    it("GET (/api/subscribers)  >>> it should return all subscribers", done => {
      chai
        .request(server)
        .get("/api/subscribers")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    it("GET (/api/subscribers/active)  >>> it should return active subscribers", done => {
      chai
        .request(server)
        .get("/api/subscribers/active")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    it("GET (/api/subscribers/{id})  >>> it should return one subscriber", done => {
      chai
        .request(server)
        .get("/api/subscribers/" + _id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email");
          res.body.should.have.property("fullname");
          res.body.should.have.property("isActive");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("_id").eql(_id);
          done();
        });
    });
  });

  describe("#### PUT tests", () => {
    it("PUT (/api/subscribers)  >>> it should UPDATE a subscriber", done => {
      const subscriber = {
        fullname: "Farid Mansim",
        email: "farid.mansim@gmail.com",
        isActive: false,
      };

      chai
        .request(server)
        .put("/api/subscribers/" + _id)
        .set("Authorization", "Bearer " + token)
        .send(subscriber)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email").eql(subscriber.email);
          res.body.should.have.property("fullname").eql(subscriber.fullname);
          res.body.should.have.property("isActive").eql(subscriber.isActive);
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("_id").eql(_id);
          done();
        });
    });
  });

  describe("#### DELETE tests", () => {
    it("DELETE (/api/subscribers)  >>> it should DELETE a subscriber", done => {
      chai
        .request(server)
        .delete("/api/subscribers/" + _id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(1);
          done();
        });
    });
  });
});
