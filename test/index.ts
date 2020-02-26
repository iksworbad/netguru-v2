import chai from 'chai'
import chaiHttp from 'chai-http'
import sinonChai from 'sinon-chai'
import chaiFetch from 'chai-fetch'
import chaiAsPromised from 'chai-as-promised'


chai.use(chaiHttp)
chai.use(sinonChai)
chai.use(chaiFetch)
chai.use(chaiAsPromised)
