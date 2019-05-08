setTimeout(() => {
  hideSubMenus()
}, 500);

function hideSubMenus() {
  const styleDomEl = document.createElement('style');
  styleDomEl.innerHTML =
    '.document.row {' +
    'display: ;' +
    '}' +
    '.sphinxsidebarwrapper {' +
    'position: relative;' +
    'padding-right: 0 !important;' +
    '}' +
    '.sphinxsidebarwrapper > h3 {' +
    'position: ;' +
    'top: 75px;' +
    '}' +
    '.sphinxsidebarwrapper ul {' +
    'list-style: none;' +
    '}' +
    '.sphinxsidebarwrapper > ul {' +
    'position: ;' +
    'top: 135px;' +
    'padding-left: 0;' +
    '}' +
    '.accordion-item--active {' +
    'background-color: #e3e3e3' +
    '}' +
    '.sphinxsidebarwrapper > ul > li {' +
    'padding: 0 0px 10px 10px;' +
    'margin: 0;' +
    '}' +
    '.accordion-item:before {' +
    'font-weight: bold;' +
    'color: inherit;' +
    'display: inline-flex;' +
    'align-items: center;' +
    'justify-content: center;' +
    'margin-right: 5px;' +
    '}' +
    '.accordion-item--plus-icon:before {' +
    'content: \'+\';' +
    '}' +
    '.accordion-item--minus-icon:before {' +
    'content: \'-\';' +
    '}';

  const asideMenu = document.getElementsByClassName('sphinxsidebarwrapper')[0];
  const levelClassName = 'toctree-l';
  const levelsNodes = getLevel(asideMenu.getElementsByTagName('ul'));
  const levelsQuantity = Math.max(...levelsNodes);
  let levelsLists = [];
  // add style tag for asideMenu
  asideMenu.parentNode.insertBefore(styleDomEl, asideMenu);

  // Create array of levels
  for (let i = 1; i <= levelsQuantity; i++) {
    const level = asideMenu.getElementsByClassName(levelClassName + i);
    levelsLists.push(level);
  }

  // Make accordions for all uls that exist in levels
  levelsLists.forEach((levelList, index) => makeAccordion(levelList, index, levelsQuantity));
}

function makeAccordion(list, index, levelsQuantity) {
  const itemsWithNestedUl = Array.from(list).filter(listItem => listItem.lastElementChild.localName === 'ul');
  const ulLists = createArrayOfDomElements(list, 'ul', index);
  const linksList = createArrayOfDomElements(list, 'a', index);

  // Hide uls and unhide saved to local storage
  ulLists.forEach((node, subIndex) => makeUlsHidden(node, index, subIndex));
  // Add plus icon for all li
  itemsWithNestedUl.forEach(itemWithList => addClass(itemWithList, ['accordion-item', 'accordion-item--plus-icon']));
  // Add toggle function for links
  listenClick(linksList, levelsQuantity);
}

function makeUlsHidden(items, index, subIndex) {
  items.forEach(item => {
    item.id = `${index}${subIndex}`;
    const isSaved = localStorage.getItem(item.id) || '';
    const isFirstNestingLevel = item.id.startsWith('0');

    if (!isSaved) {
      // hide all uls if the no in local storage
      addClass(item, 'hidden');
    } else {
      // Change plus to minus if saved in local storage
      changePlusToMinusForParent(item);
      // Add active background for first level li
      if (isFirstNestingLevel) {
        addClass(item.parentElement, 'accordion-item--active');
      }
    }
  });
}

function listenClick(links) {
  const liftedLinksArray = [].concat(...links);

  liftedLinksArray.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    closePreviousActiveAccordions(event);
    openAccordion(event);
    window.location.href = event.currentTarget.href;
  }))
}

function openAccordion(event) {
  const ulToOpen = event.currentTarget.nextElementSibling;
  const parentElement = event.currentTarget.parentElement;
  const isFirstLevelListItem = Array.from(parentElement.classList).includes('toctree-l1');

  if (ulToOpen) {
    removeClass(ulToOpen, 'hidden');
    changePlusToMinusForParent(event.currentTarget);
    saveToLocalStore(ulToOpen.id, 'true');
  }
  if (isFirstLevelListItem) {
    addClass(parentElement, 'accordion-item--active');
  }
}

function closePreviousActiveAccordions(event) {
  const isFirstLevelListItem = Array.from(event.currentTarget.parentElement.classList).includes('toctree-l1');
  const minusClass = 'accordion-item--minus-icon';
  const activeClass = 'accordion-item--active';
  const asideMenu = document.getElementsByClassName('sphinxsidebarwrapper')[0];
  const previousActiveListItems = isFirstLevelListItem ?
    Array.from(asideMenu.getElementsByClassName(minusClass)) :
    Array.from(event.currentTarget.parentElement.parentElement.getElementsByClassName(minusClass)); // changes
  const allUlsInLIstItems = previousActiveListItems.map(item => Array.from(item.getElementsByTagName('ul')));
  const liftedUlsArray = [].concat(...allUlsInLIstItems);

  previousActiveListItems.forEach(li => {
    if (isFirstLevelListItem) {
      removeClass(li, activeClass);
    }
    changeMinusToPluss(li);
  });
  //Add hidden class for all nested uls
  liftedUlsArray.forEach(ul => {
    hideItem(ul);
  });
}

function findElement(array, elementName) {
  return [...array.childNodes].filter(item => item['localName'] === elementName)
}

function hideItem(item) {
  item.classList.add('hidden');
  removeFromLocalStore(item.id);
}

// HELPERS

function findLevel(element) {
  return element.parentElement.classList.value.replace('toctree-l', '').split(' ')[0];
}

function getLevel(lists) {
  const croppedClasses = [...lists].map(treeItem => +findLevel(treeItem));
  return croppedClasses.filter(level => !!level);
}

function removeEmptyNodes(nodes) {
  return nodes.filter(item => item.length);
}

function createArrayOfDomElements(listOfItems, domElementName, nestingLevel) {
  return removeEmptyNodes(Array.from(listOfItems).map((treeItem, subIndex) => findElement(treeItem, domElementName, nestingLevel, subIndex)));
}

function addClass(item, classes) {
  item.classList.add(...Array.isArray(classes) ? classes : [classes]);
}

function removeClass(item, classes) {
  item.classList.remove(...Array.isArray(classes) ? classes : [classes]);
}

function saveToLocalStore(name, value) {
  localStorage.setItem(name, value);
}

function removeFromLocalStore(name) {
  localStorage.removeItem(name)
}

function changePlusToMinusForParent(item) {
  removeClass(item.parentElement, 'accordion-item--plus-icon');
  addClass(item.parentElement, 'accordion-item--minus-icon');
}

function changeMinusToPluss(item) {
  removeClass(item, 'accordion-item--minus-icon');
  addClass(item, 'accordion-item--plus-icon');
}
