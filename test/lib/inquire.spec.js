const Inquire = require('../../lib/Inquire');
const bddStdin = require('bdd-stdin');

describe('Inquire', () => {
  let inquire;
  beforeEach(() => {
    inquire = new Inquire();
  });

  it('should create an instance of the Inquire class', () => {
    inquire = new Inquire();
    expect(inquire.questions).to.eql([]);
    expect(inquire.validate).to.have.property('notEmpty');
    expect(inquire.validate).to.have.property('yesNo');
  });

  describe('validate', () => {
    it('should validate user inputs for empty fields', () => {
      expect(inquire.validate.notEmpty('')).to.eql('Please enter a value');
      expect(inquire.validate.notEmpty()).to.eql('Please enter a value');
      expect(inquire.validate.notEmpty(true)).to.eql('Please enter a value');
      expect(inquire.validate.notEmpty(null)).to.eql('Please enter a value');
      expect(inquire.validate.notEmpty('input')).to.eql(true);
    });
    it('should validate for yes or no questions', () => {
      expect(inquire.validate.yesNo()).to.eql('Invalid input to yes/no question');
      expect(inquire.validate.yesNo('yeah')).to.eql('Invalid input to yes/no question');
      expect(inquire.validate.yesNo('nope')).to.eql('Invalid input to yes/no question');
      expect(inquire.validate.yesNo('yes')).to.eql(true);
    });
  });

  describe('question', () => {
    it('should add a question to the list of existing questions', () => {
      inquire.question('new', 'input', 'Is this a new question?');
      inquire.question('new2', 'input', 'Is this another new question?', 'notEmpty');
      expect(inquire.questions.length).to.eql(2);
    });
  });
  
  describe('ask', () => {
    it('should ask all the stored questions and execute a callback when done', () => {
      inquire.question('new', 'input', 'Is this a new question?');
      bddStdin('answer\n');
      const spy = sinon.spy();
      return inquire.ask(spy).then(() => {
        expect(spy.calledOnce).to.be.true;
      });
    });
  });
});