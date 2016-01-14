import React from 'react';
import DocMeta from 'react-doc-meta';


export default class Component extends React.Component{
  render() {

    let title = this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1);

      return (
          <html>
              <head>
                <title>{ 'Universal Javascript | ' + title}</title>
                {
                  this.props.tags.map((tag, index) =>
                    tag.rel ? <link key={index} {...tag} /> : <meta data-doc-meta="true" key={index} {...tag} />
                  )
                }
              </head>
              <body>
                <header className="header">
                  <h1 className="header__title">Header</h1>
                </header>
                  {this.props.component}
                  <main id="app-mount"
                      dangerouslySetInnerHTML={{ __html: this.props.remount }}>
                  </main>
                <footer className="footer">
                  Footer
                </footer>
                  <script id="app-state"
                      dangerouslySetInnerHTML={{ __html: this.props.state }}>
                  </script>
                  <script src={`/assets/${this.props.title}/${this.props.title}.js`}></script>
              </body>
          </html>
      );
  }
};
