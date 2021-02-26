export function getElementValue(elementId) {
  const element = document.querySelector(elementId)
  return element.options[element.selectedIndex].value
}
