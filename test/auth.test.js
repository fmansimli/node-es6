import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

const should = chai.should();

chai.use(chaiHttp);

describe("@@@@ Auth tests:", () => {
  it("POST (/api/auth/register)  >>> it should return user and token", done => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({ email: "farid.mansimli@gmail.com", password: "qwerty12345" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });

  it("POST (/api/auth/login)  >>> it should return user and token", done => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "farid.mansimli@gmail.com", password: "qwerty12345" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });
});
