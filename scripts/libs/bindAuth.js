import { browserHistory } from 'react-router'

const bindAuth = (component) => {
  component.prototype.componentWillMount = function() {
    const { user } = this.props
    
    if(!user.active) {
      browserHistory.push('/')
    }
  }

  component.prototype.componentWillUpdate = function(nextProps, nextState) {
    const { user } = nextProps
    
    if(!user.active) {
      browserHistory.push('/')
    }
  }
}

export default bindAuth