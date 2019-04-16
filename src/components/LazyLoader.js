import React, { Component, Fragment } from 'react';

class LazyLoader extends Component {
  state = {
    module: null
  }
  componentDidMount() {
    const { path } = this.props;
    import(`${path}`)
    .then(module => this.setState(() => ({
      module: module.default
    })));
  }
  render() {
    const {
      module: Component
    } = this.state;
    return (
      <Fragment>
        {Component && <Component />}
      </Fragment>
    );
  }
}

export default LazyLoader;