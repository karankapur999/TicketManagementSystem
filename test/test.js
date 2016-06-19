var supertest = require("supertest");
var should = require("should");
var _ = require("lodash")


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:9000");

// UNIT test begin

describe("CRUD API Tests",function() {


  it("should return json for tickets",function(done) {

     server
    .get('/api/v1/tickets/get/ticket/0')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res) {
      res.body.isError.should.equal(false)
      done();
    });

  })

  it('should correctly update an existing ticket', function(done) {
  var body = {
    ticket_id: '576409c63811c6d80cdacfdf',
    assign_to: 'Karan'

  };
    server
    .put('/api/v1/tickets/update/ticket')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200) //Status code
    .end(function(err,res) {
      if (err) {
        throw err;
      }
      console.log(res.body);
      res.body.data[0].ticket_agent_email.should.equal('Karan');
      done();
    });
  });

  it('should correctly add an comment to existing ticket', function(done) {
  var body = {
    ticket_id: '57642b0660cc3b4013800624',
    comment: 'tetsing 1234 '

  };
    server
    .put('/api/v1/tickets/add/comments')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200) //Status code
    .end(function(err,res) {
      if (err) {
        throw err;
      }
      var testCounter = 0;
      console.log(JSON.stringify(res.body.data[0].comments));
      var commentsArray = res.body.data[0].comments;
      for (var i =0 ; i<commentsArray.length;i++){
        console.log()
        if ( commentsArray[i].comment == (body.comment) ) testCounter = 1;
      }
      testCounter.should.equal(1);
      done();
    });
  });
  
})  

