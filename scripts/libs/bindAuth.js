import { browserHistory } from 'react-router'

const bindAuth = (component) => {
  const checkAuth = (props) => {
    if(props == undefined && props.user == undefined) {
      return
    }

    const user = props.user

    if(!user.active) {
      browserHistory.push('/')
    }
  }

  component.prototype.componentWillMount = function() {
    checkAuth(this.props)
  }

  component.prototype.componentWillUpdate = (nextProps, nextState) => {
    checkAuth(nextProps)
  }
}

export default bindAuth