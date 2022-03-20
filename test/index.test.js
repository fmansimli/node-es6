import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

const should = chai.should();

chai.use(chaiHttp);

let token;

describe("@@@@ Index tests:", () => {
  before(done => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "farid@gmail.com", password: "qwerty12345" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("#### GET tests", () => {
    it("GET (/api)  >>> it should return request.originalUrl", done => {
      chai
        .request(server)
        .get("/api")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("url");
          done();
        });
    });
  });
});
