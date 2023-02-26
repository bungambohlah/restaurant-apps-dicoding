import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;

    this.initialAppShell();
  }

  initialAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      content: this.content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this.content.innerHTML = await page.render();
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `
      <div class="footer-content">
        <span>
          Copyright &copy; <span id="yearCopy"></span>
        </span>
        <a href="/#/">HungryFood</a>
        <span>| Developed with 💖 by</span>
        <a href="https://afif.dev" rel="noopener noreferrer" target="_blank">Afif Abdillah</a>
      </div>`;
    this.content.appendChild(footer);

    await page.afterRender();

    // skip to content integration
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#maincontainer').focus();
    });
  }
}

export default App;
