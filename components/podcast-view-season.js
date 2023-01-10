import { 
  html, 
  css, 
  LitElement 
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from './store.js'

class Component extends LitElement {
    static get properties() {
      return {
          seasons: { state: true },
      };
    }

    constructor() {
      super()

      this.disconnectStore = connect((state) => {
        if (this.seasons === state.seasons) return;
        this.seasons = state.seasons;
      });
    }


    disconnectedCallback() { 
      this.disconnectStore() 
    }

    static styles = css`
      img{
        width: 300px;
        height: 300px;
      }
    `

    render() {
      /**
       * @type {import('./types').show}
       */

      const show = this.single;

      const seasons = this.seasons
      if (!seasons) {
        return html`<div> No season </div>`
      }

      const backHandler = () => store.loadSingle(show.id);
      console.log(seasons.seasons[0])

      return html`
      <button @click="${backHandler}">&#8592; BACK</button>
      <h1>${seasons.title || ""}</h1>
      <img src="${seasons.image}" />
      ${seasons}
    `;

    }
}

customElements.define("podcast-view-season", Component)