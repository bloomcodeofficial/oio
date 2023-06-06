export const ads = async function () {
  // Positions page //
  const getPositions = async function () {
    // Elements
    const element = document.querySelector('.positions_wrapper');
    const templateElement = element?.cloneNode(true);
    const list = element.parentElement;
    const loader = document.querySelector('.positions_loader');
    const adsCount = document.querySelector('[ponty-element="count"]');

    // Fetch url
    const adsURL =
      'https://oio.ponty-system.se/extapi/job?p=eyJ0IjogW119.c309dfdb4a0280110cd800184bc693d8ad0b8ebb13597ffca9095f95df39aa82';

    // Fetch ads from Ponty feed URL
    const newAds = await getAds(adsURL);

    // Create and insert ad for all ads
    newAds.forEach((ad) => {
      const newAd = createItem(ad, templateElement);
      list?.insertAdjacentElement('afterbegin', newAd);
      element?.remove();
    });

    setTimeout(() => {
      loader?.classList.add('is-not-loading');
      list?.classList.add('is-loaded');
      adsCount.textContent = newAds.length;
      adsCount.style.opacity = '1';
    }, 500);

    // Open add
    list?.addEventListener('click', (e) => {
      const ad = e.target.closest('.positions_wrapper');
      if (!ad) return;

      window.location.href = `/tjanster/tjanst?id=${ad.dataset.pontyid}`;
    });
  };

  // Position page //
  const getPosition = async function () {
    const positionWrapper = document.querySelector('.position_wrapper');
    const urlParams = new URLSearchParams(window.location.search);
    const adID = urlParams.get('id');
    if (!adID) {
      setPositionEmpty();
      return;
    }

    // Fetch url
    const adsURL =
      'https://oio.ponty-system.se/extapi/job?p=eyJ0IjogW119.c309dfdb4a0280110cd800184bc693d8ad0b8ebb13597ffca9095f95df39aa82';

    const ads = await getAds(adsURL);
    const [ad] = ads.filter((ad) => ad.assignment_id == adID);
    if (!ad) {
      setPositionEmpty();
      return;
    }
    loadAdPage(ad);
    setPositionLoaded();

    function setPositionEmpty() {
      positionWrapper?.classList.remove('position-loading');
      positionWrapper?.classList.add('position-empty');
    }

    function setPositionLoaded() {
      positionWrapper?.classList.remove('position-loading');
      positionWrapper?.classList.add('position-loaded');
    }
  };

  // FUNCTIONS //
  function getAds(url) {
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { jobs } = data;
        return jobs;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Returns a new ad item
  function createItem(ad, templateElement) {
    const item = templateElement.cloneNode(true);
    const title = item.querySelector('[ponty-element="title"]');
    const company = item.querySelector('[ponty-element="company"]');
    const location = item.querySelector('[ponty-element="location"]');
    // const extent = item.querySelector('[ponty-element="extent"]');
    // const logo = item.querySelector('[ponty-element="logo"]');

    if (title) title.textContent = ad.title;
    if (company) company.textContent = ad.organization_name;
    if (location) location.textContent = ad.location;
    if (item) item.dataset.pontyid = ad.assignment_id;

    return item;
  }

  function loadAdPage(ad) {
    const title = document.querySelector('[ponty-element="title"]');
    const company = document.querySelector('[ponty-element="company"]');
    const contact = document.querySelector('[ponty-element="name"]');
    const location = document.querySelector('[ponty-element="location"]');
    const extent = document.querySelector('[ponty-element="extent"]');
    const content = document.querySelector('[ponty-element="body"]');
    const button1 = document.querySelector('[ponty-element="button"]');
    const button2 = document.querySelector('[ponty-element="button2"]');
    const headElement = document.querySelector('head');
    const metaTitle = headElement.querySelector('title');
    const metaTitle2 = headElement?.querySelector('[property="og:title"]');
    const metaTitle3 = headElement?.querySelector('[property="twitter:title"]');

    // Add content to existing Webflow/HTML elements
    if (title) title.textContent = ad.title;
    if (metaTitle) metaTitle.textContent = ad.title + ' | OIO Rekrytering';
    if (metaTitle2) metaTitle2.setAttribute('content', ad.title + ' | OIO Rekrytering');
    if (metaTitle3) metaTitle3.setAttribute('content', ad.title + ' | OIO Rekrytering');
    if (company) company.textContent = ad.organization_name;
    if (contact) contact.textContent = ad.user_name;
    if (location) location.textContent = ad.location;
    if (content) content.replaceWith(createMainContent(ad.body));
    if (button1) button1.href = ad.apply_url;
    if (button2) button2.href = ad.apply_url;
  }

  function createMainContent(string) {
    const parser = new DOMParser();
    const html = parser.parseFromString(string, 'text/html');
    const div = document.createElement('div');
    div.classList.add('text-rich-text');

    while (html.body.firstChild) {
      div.appendChild(html.body.firstChild);
    }

    return div;
  }

  if (window.location.pathname === '/tjanster/tjanst') getPosition();
  if (window.location.pathname === '/tjanster') getPositions();
};
