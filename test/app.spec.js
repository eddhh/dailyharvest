const assert = require("assert")
const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../app")
const should = chai.should()
chai.use(chaiHttp)

describe("Search API", function(){
  describe ("Search 'Organic Banana'", function(){
    it("should find 4 products containing 'organic banana'", (done) => {
      chai.request(server)
        .get("/search?ingredient_name=Organic%20Banana")
        .end((err,res)=>{
          res.body.length.should.equal(4)
          done()
      })
    })
  })
  describe ("Search 'fake ingredient'", function(){
    it("should return a single entry with a name of 'No matching ingredient/product found'", (done) => {
      chai.request(server)
        .get("/search?ingredient_name=fake%20ingredient")
        .end((err,res)=>{
          res.body[0].name.should.equal('No matching ingredient/product found')
          done()
      })
    })
  })
})
