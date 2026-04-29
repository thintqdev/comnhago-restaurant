import { PageFlip } from "page-flip";

export function initMenuBook() {
  const menuTabs = Array.from(document.querySelectorAll(".menu-tab"));
  const prevButton = document.querySelector("#menu-prev");
  const nextButton = document.querySelector("#menu-next");
  const pageIndicator = document.querySelector("#menu-page-indicator");
  const bookElement = document.querySelector("#menu-book");

  if (!bookElement || !prevButton || !nextButton || !pageIndicator) return;

  const pageFlip = new PageFlip(bookElement, {
    width: 480,
    height: 640,
    size: "stretch",
    minWidth: 300,
    maxWidth: 480,
    minHeight: 400,
    maxHeight: 680,
    maxShadowOpacity: 0.25,
    drawShadow: true,
    flippingTime: 900,
    usePortrait: true,
    startPage: 0,
    showCover: true,
    mobileScrollSupport: true,
  });

  const pages = document.querySelectorAll(".menu-page-lib");
  pageFlip.loadFromHTML(pages);

  const updateBookUI = () => {
    const pageIndex = pageFlip.getCurrentPageIndex();
    const pageCount = pageFlip.getPageCount();
    const spreadIndex = Math.floor(pageIndex / 2);
    const spreadCount = Math.ceil(pageCount / 2);
    const currentPageElement = pages[pageIndex];
    const activeRegion = currentPageElement?.dataset.region;

    pageIndicator.textContent = `Cap trang ${spreadIndex + 1} / ${spreadCount}`;
    prevButton.disabled = pageIndex <= 0;
    nextButton.disabled = pageIndex >= pageCount - 1;

    bookElement.classList.toggle("is-edge-start", pageIndex === 0);
    bookElement.classList.toggle("is-edge-end", pageIndex === pageCount - 1);

    menuTabs.forEach((tab) => {
      const isMatch =
        (activeRegion === "bac" && tab.dataset.targetPage === "1") ||
        (activeRegion === "trung" && tab.dataset.targetPage === "3") ||
        (activeRegion === "nam" && tab.dataset.targetPage === "5");
      tab.classList.toggle("is-active", isMatch);
    });
  };

  nextButton.addEventListener("click", () => pageFlip.flipNext());
  prevButton.addEventListener("click", () => pageFlip.flipPrev());
  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      pageFlip.flip(Number(tab.dataset.targetPage));
    });
  });

  pageFlip.on("flip", updateBookUI);
  updateBookUI();
}
