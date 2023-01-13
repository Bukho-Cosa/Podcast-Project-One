import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "./store.js";

class Component extends LitElement {
  static get properties() {
    return {
      single: { state: true },
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.single === state.single) return;
      this.single = state.single;
    });
  }

  disconnectedCallback() {
    this.disconnectStore();
  }

  static styles = css`
    *{
        height: 100%;
    }
    h1 {
      color: purple;
    }

    img {
      width: 200px;
      height: 200px;
    }
    form{
        border-radius: 1;
    }
    button{
        font-size: larger;
        border-radius: 1;
    }
  `;

  render() {
    /**
     * @type {import('./types').show}
     */
    const show = this.single;
    if (!show) {
      return html`<div></div>`;
    }

    const backHandler = () => store.loadList();

      const clickHandler = () => store.loadSeason(show.id);

      const seasons = show.seasons.map(({ episodes, title, season }) => {

        function findId() {
          const buttonClass = document.querySelector(".oneNumber");
          const seasonNumber = buttonClass.getAttribute("id").value();
          console.log(seasonNumber);

        }

        return html`
        <div>
          <button class="oneNumber" id="${season}" onclick="findId()" @click="${clickHandler}">Go to: <strong>${title}</strong> episodes: ${episodes.length}</button>


          <!--${episodes.map(({ file, title: innerTitle }) => {
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
                })}-->
        </div>
        `;
      });
    

    return html`
      <button @click="${backHandler}">&#8592; BACK</button>
      <h1>${show.title || ""}</h1>
      <img src="${show.image}" />
      ${seasons}
    `;
  }
}

customElements.define("podcast-view-single", Component);