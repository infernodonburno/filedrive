import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>
    // main: () => <h2>text</h2>
  },
  {
    path: '/trash',
    sidebar: () => <div>Nice trash!</div>,
    main: () => <h2>Trash</h2>
  }
]

const SidebarExample = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div
        style={{
          padding: '10px',
          width: '10%',
          height: '150px',
          background: 'lightgray',
          margin: 'auto 0',
          float: 'left'
        }}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/trash'>Trash</Link>
          </li>
        </ul>

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '0px' }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
)

export default SidebarExample
