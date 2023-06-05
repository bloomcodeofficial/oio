export const ads = async function () {
  const element = document.querySelector('.positions_wrapper');
  const templateElement = element?.cloneNode(true);
  const list = element.parentElement;
  const loader = document.querySelector('.positions_loader');
  const adsCount = document.querySelector('[ponty-element="count"]');

  const getAds = function () {
    return fetch(
      'https://oio.ponty-system.se/extapi/job?p=eyJ0IjogW119.c309dfdb4a0280110cd800184bc693d8ad0b8ebb13597ffca9095f95df39aa82'
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { jobs } = data;
        return jobs;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          loader?.classList.add('is-not-loading');
          list?.classList.add('is-loaded');
          adsCount.textContent = newAds.length;
          adsCount.style.opacity = '1';
        }, 500);
      });
  };

  const createItem = (ad, templateElement) => {
    const item = templateElement.cloneNode(true);

    const title = item.querySelector('[ponty-element="title"]');
    const company = item.querySelector('[ponty-element="company"]');
    const location = item.querySelector('[ponty-element="location"]');
    const extent = item.querySelector('[ponty-element="extent"]');
    const logo = item.querySelector('[ponty-element="logo"]');

    if (title) title.textContent = ad.title;
    if (company) company.textContent = ad.organization_name;
    if (location) location.textContent = ad.location;
    if (item.href) item.href = ad.apply_url;

    return item;
  };

  const newAds = await getAds();

  newAds.forEach((ad) => {
    const newAd = createItem(ad, templateElement);
    list?.insertAdjacentElement('afterbegin', newAd);
    element?.remove();
  });
};
