import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goSignIn = this.linkTo('/SignIn');
	goSignUp = this.linkTo('/SignUp');

	render(props) {
		console.log(props.selectedRoute);
		const pointerCursor = {cursor: 'pointer'};
		return (
			<div>
				<TopAppBar className="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon style={ pointerCursor } menu onClick={this.goHome}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title style={ pointerCursor } menu onClick={this.goHome}>
								Rate My Pot
							</TopAppBar.Title>
						</TopAppBar.Section>															
						<TopAppBar.Section align-end shrink-to-fit>
							<TopAppBar.Title style={ pointerCursor } menu onClick={this.goSignIn}>Sign In</TopAppBar.Title>
							<TopAppBar.Title style={ pointerCursor } menu onClick={this.goSignUp}>Join</TopAppBar.Title>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
			</div>
		);
	}
}
