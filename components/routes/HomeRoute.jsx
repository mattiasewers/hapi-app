import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    peopleRelay: (Component) => Relay.QL`
		query {
			peopleRelay{
				${Component.getFragment('peopleRelay')}
			}
		}
    `,
  };
  static routeName = 'HomeRoute';
}