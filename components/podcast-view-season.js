import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from './store.js'
import './podcast-view-single.js'

class Component extends LitElement {
    static get properties() {
      return {
          seasons: { state: true },
      }
    }

    constructor() {
      super()

      this.disconnectStore = connect((state) => {
        if (this.seasons === state.seasons) return
        this.seasons = state.seasons
      })
    }


    disconnectedCallback() { this.disconnectStore() }

    render() {
      /**
       * @type {import('./types').show}
       */
      const show = this.show
      if (!show) {
        return html`<div> No season</div>`
      }
    
      const season = show.seasons.map(({ episodes, title, seasons }) => {
        
      return html`
        <div>
          ${episodes.map(({ file, title: innerTitle }) => {
            return html`
              <div>
                  <div>${innerTitle}</div>
                  <audio controls>
                    <source
                      src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3"
                      type="audio/mp3"
                    />
                  </audio>
              </div>
            `;
          })}
        </div>
      `;
      });
    }
}

customElements.define('podcast-view-season', Component)