import React from 'react';
import PropTypes from 'prop-types';
import { BehaviorSubject } from 'rxjs';
import withStyles from '@material-ui/core/styles/withStyles';
import { injectIntl, FormattedMessage } from 'react-intl';
import { defaultTranslationMessages as messages } from './i18n';

class RuncyApi {
  constructor() {
    this._pages = new BehaviorSubject([]);
    this._plugins = new BehaviorSubject([]);
    this._menus = new BehaviorSubject([]);
  }

  get menus() {
    return this._menus;
  }

  get plugins() {
    return this._plugins;
  }

  get pages() {
    return this._pages;
  }

  registerMenu(menu) {
    const menus = this.menus.value
      .filter(m => m.key !== menu.key)
      .map(m => {
        if (!menu.title && menu.key) {
          menu.title = menu.key;
        }
        return menu;
      });
    this.menus.next([...menus, menu]);
  }

  registerPage(page) {
    const pages = this.pages.value
      .filter(p => p.key !== page.key)
      .map(p => {
        const p2 = p;
        if (p2.menu && !p2.menu.onClick) {
          p2.menu = Object.assign({}, p.menu, {
            onClick: () => {
              this.history.push(`${p.admin ? '/admin/' : '/'}${p.slug || p.key}`);
            },
          });
        }
        return p2;
      });
    if (page.menu && !page.menu.onClick) {
      page.menu = Object.assign({}, page.menu, {
        index: page.menu.index ? page.menu.index : pages.length,
        onClick: () => {
          this.history.push(`${page.admin ? '/admin/' : '/'}${page.slug || page.key}`);
        },
      });
    }
    this.pages.next([...pages, page]);
  }

  registerPlugin(plugin) {
    const plugins = this.plugins.value.filter(p => p.name !== plugin.name);
    this.plugins.next([...plugins, plugin]);

    if (plugin.menus && plugin.menus.length > 0 && plugin.enabled) {
      plugin.pages.forEach(page => {
        const menu = plugin.menus.filter(m => m.page === page.name)[0];
        if (menu && !page.menu) {
          page.menu = menu;
          if (!page.menu.onClick) {
            page.menu.onClick = () => {
              this.history.push(`${page.admin ? '/admin/' : '/'}${page.slug || page.name}`);
            };
          }
          const pages = this.pages.value.filter(p => p.name !== page.name);
          this.pages.next([...pages, page]);
        }
      });
    }
  }

  enablePlugin(plugin) {
    const plugins = this.plugins.value.filter(p => p.name !== plugin.name);
    this.plugins.next([...plugins, Object.assign(plugin, { enabled: true })]);
  }

  disablePlugin(plugin) {
    const plugins = this.plugins.value.filter(p => p.name !== plugin.name);
    this.plugins.next([...plugins, Object.assign(plugin, { enabled: false })]);
  }
}
const Runcy = new RuncyApi();

// function updateTitle(title) {
//   return {
//     type: 'UPDATE_TITLE',
//     payload: { title },
//   };
// }

export function Page(options) {
  if (messages[options.key]) {
    options.title = <FormattedMessage {...messages[options.key]} />;
  }

  return function (WrappedComponent) {
    class PageWrapper extends React.Component {
      static propTypes = {
        updateTitle: PropTypes.func,
        intl: PropTypes.any.isRequired,
      };

      componentDidMount() {
        const title = options.title;
        const detail = {
          title,
          description: options.description,
        };

        if (options.admin) {
          const evt = new CustomEvent('admin-title', {
            detail,
          });
          document.dispatchEvent(evt);
        } else {
          const evt = new CustomEvent('front-title', {
            detail,
          });
          document.dispatchEvent(evt);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    let component;
    const PageComponent = injectIntl(PageWrapper);
    if (options.styles) {
      component = withStyles(options.styles)(PageComponent)
    } else {
      component = PageComponent;
    }

    if (options.compose) {
      if (Array.isArray(options.compose)) {
        options.compose.forEach(compose => {
          component = compose(component);
        });
      } else if (typeof options.compose === 'function') {
        component = options.compose(component);
      }
    }
    Runcy.registerPage(Object.assign(options, { component }));
    return component;
  };
}

if (!window.Runcy) {
  window.Runcy = Runcy;
}
