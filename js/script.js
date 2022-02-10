const body = document.body;
const liParent = body.querySelector('.parent');
const dragList = document.getElementById("dragList");

enableDragAndDrop()

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => data.map(item => `<li>${item.title}</li>`))
  .then(liHtmlChuks => {
    liParent.innerHTML = liHtmlChuks.slice(0, 15).join('');
    liParent.innerHTML += liHtmlChuks.slice(16, 25).join('');
  })



function enableDragAndDrop() {
  let dragging, draggedItem, hoveredItem;

  liParent.addEventListener('mousedown', (event) => {
    if (event.target === liParent) return;
    event.preventDefault();
    dragging = true;
    draggedItem = event.target;
    dragList.append(draggedItem);
    body.style.cursor = 'grabbing';
  })

  liParent.addEventListener('mouseover', (event) => {
    if (dragging && event.target != liParent) hoveredItem = event.target;
  })

  liParent.addEventListener('mouseout', (event) => {
    if (event.target === liParent) return;
    if (hoveredItem) hoveredItem.style = ``;
    hoveredItem = null;
  })

  body.addEventListener('mouseup', () => {
    dragging = false;
    if (draggedItem) liParent.insertBefore(draggedItem, hoveredItem);
    if (hoveredItem) hoveredItem.style = ``;
    hoveredItem = null;
    body.style.cursor = null;
    draggedItem = null;
  })

  body.addEventListener('mousemove', (event) => {
    event.preventDefault();
    if (!dragging) return;
    dragList.style.top = `${event.y - 20}px`;
    dragList.style.left = `${event.x - 30}px`;
    if (hoveredItem) hoveredItem.style = `padding-top: 17px `;
  })

  body.addEventListener('mouseleave', () => {
    dragging = false;
    if (draggedItem) liParent.append(draggedItem);
    if (hoveredItem) hoveredItem.style = ``;
    hoveredItem = null;
    body.style.cursor = null;
    draggedItem = null;
  })
}

