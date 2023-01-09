import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "./store.js";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class Component extends LitElement {
  static get properties() {
    return {
      previews: { state: true },
      sorting: { state: true },
      search: { state: true },
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.previews !== state.previews) {
        this.previews = state.previews;
      }
      if (this.sorting !== state.sorting) {
        this.sorting = state.sorting;
      }
      if (this.search !== state.search) {
        this.search = state.search;
      }
    });
  }

  disconnectedCallback() {
    this.disconnectStore();
  }

  static styles = css`
    .container {
      display: grid;
      width: 100%;
      grid-template-columns: 50% 50%; 
    }
    .inner-div { 
      text-decoration: none;
      margin: 0;
      padding: 0;
      border: 1px solid pink;
      margin: 1rem;
    }
    button{
        list-style: none;
        border-radius: 1rem;
    }
    img {
      width: 300px;
      height: 300px;
      border-radius: 1rem;
    }
    img:hover {
      opacity: 0.33;
    }
    h3 {
      padding: 0 rem;
      margin: 0 rem;
    }
  `;

  render() {
    /**
     * @type {import('./types.ts').preview[]}
     */
    const previews = this.previews;

    const filteredPreviews = previews.filter((item) => {
      if (!this.search) return true;
      return item.title.toLowerCase().includes(this.search.toLowerCase());
    });

    const sortedPreviews = filteredPreviews.sort((a, b) => {
      if (this.sorting === "a-z") return a.title.localeCompare(b.title);
      if (this.sorting === "z-a") return b.title.localeCompare(a.title);

      const dateA = new Date(a.updated).getTime();
      const dateB = new Date(b.updated).getTime();

      if (this.sorting === "oldest-latest") return dateA - dateB;
      if (this.sorting === "latest-oldest") return dateB - dateA;

      throw new Error("Invalid sorting");
    });

    const list = sortedPreviews.map(
      ({ title, id, updated, image, seasons, genres }) => {
        const date = new Date(updated);
        const day = date.getDate();
        const month = MONTHS[date.getMonth() - 1];
        const year = date.getFullYear();

        const clickHandler = () => store.loadSingle(id);

        return html`
          <div class="container">

            <div class="inner-div">
              <button @click="${clickHandler}">
                <li>${genres}</li>
                <img src="${image}" id="image" />
              </button>
              <h3>${title}</h3>
              <h4>Updated: ${day} ${month} ${year}</h4>
              <h4>No. of seasons: ${seasons}</h4>
            </div>

          </div>
        `;
      }
    );

    return html`
      <h1>Podcast List</h1>
      <podcast-controls></podcast-controls>
      ${list.length > 0
        ? html`<ul>
            ${list}
          </ul>`
        : html`<div>No matches</div>`}
    `;
  }
}

customElements.define("podcast-view-list", Component);
