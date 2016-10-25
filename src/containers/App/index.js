import React, {Component, PropTypes} from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../reducers/modules/user/action'
import '../../font/custom.less'
import './app.less'

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
		//检查登录
		this.checkAuth(this.props.user.loginState);
	}
    componentWillReceiveProps (nextProps) {
		let redirectAfterLogin = this.props.location.pathname;
		// const { dispatch, selectedReddit } = nextProps
		//console.log('WillReceiveProps:' + nextProps.userInfo.loginState)
		//this.checkAuth(nextProps.userInfo.loginState);
		if(!nextProps.user.loginState){
			//检查登录
			this.context.router.push('/signin?next=${redirectAfterLogin}')
		}
	}
    checkAuth (loginState) {
		if (!loginState){
			const { userActions, dispatch } = this.props
			userActions.loginCheck()
		}
	}
    render() {
        const { user, status , actions } = this.props;
        //const currentPath = this.props.routes[1].path;
        // const currentURL = this.props.routes[1].path;
        // let currentPath = '';
        // (currentURL + "").indexOf("/") > 0 ?  currentPath = (currentURL +"").split('/')[0] : currentPath = currentURL;
        // const tab = currentPath || 'index'
        return(
            <div className="wx_app">
                {this.props.children}
            </div>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
   state => ({
       user : state.user
   }),
   dispatch => ({
     //getAllMenu: bindActionCreators(getAllMenu, dispatch),
     userActions: bindActionCreators(userActions, dispatch)
   })
)(App)
