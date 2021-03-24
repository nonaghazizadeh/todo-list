isPinnedBefore = false;
var priorirty;
$('.dropdown-item-priority').click(function () {
  priorirty = $(this).text();
  $('.priority-selected').text($(this).text());
});
var color;
$('.dropdown-item-color').click(function () {
  color = $(this).text();
  color = color.toLowerCase();
  $('.color-selected').text($(this).text());  
});

$('#add').click(function () {
  var name = $('#input-name').val();
  if (name != "") {
    desc = addTask(name);
    if (priorirty === 'High priority') {
      var element = document.querySelector(".high-container");
      element.appendChild(desc);
    }
    else if (priorirty === 'Medium priority') {
      var element = document.querySelector(".medium-container");
      element.appendChild(desc);
    }

    else if (priorirty === 'Low priority') {
      var element = document.querySelector(".low-container");
      element.appendChild(desc);
    }
    $('#input-name').val('');
    $('.priority-selected').text('Choose a priority');
    $('.color-selected').text('Choose a color');  
    }
})

$('#filter-red').click(function () {
  $('.task').children().hide();
  var red = "red";
  $('.desc[color='+red+']').show();
})

$('#filter-green').click(function () {
  $('.task').children().hide();
  var green = "green";
  $('.desc[color='+green+']').show();
})

$('#filter-blue').click(function () {
  $('.task').children().hide();
  var blue = "blue";
  $('.desc[color='+blue+']').show();
})

$('#remove-filter').click(function () {
  var blue = "blue";
  $('.desc[color=' + blue + ']').show();
  var green = "green";
  $('.desc[color=' + green + ']').show();
  var red = "red";
  $('.desc[color='+red+']').show();
})

function addTask(name) {
  var desc = document.createElement('div');
  desc.className = "desc";

  var row = document.createElement('div');
  row.className = "row";

  var nameValue = document.createElement('div');
  nameValue.className = "col-8";
  nameValue.className += " col-sm-8";
  nameValue.className += " col-md-10";
  nameValue.innerHTML = name;
  nameValue.style.color = color;

  firstButtonContainer = document.createElement('div');
  firstButtonContainer.className = 'col-1';
  firstButtonContainer.className += ' col-sm-1';
  firstButtonContainer.className += ' col-md-1';
  firstButton = document.createElement('button');
  firstButton.className = 'btn';
  firstButton.className += ' btn-sm';
  firstButton.className += ' btn-light';
  firstButton.className += ' pin';
  iconForFirstButton = document.createElement('i');
  iconForFirstButton.className = 'fa';
  iconForFirstButton.className += ' fa-map-pin';
  firstButton.addEventListener('click', pinFunc);
  firstButton.appendChild(iconForFirstButton);
  firstButtonContainer.appendChild(firstButton);

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-1';
  secondButtonContainer.className += ' col-sm-1';
  secondButtonContainer.className += ' col-md-1';
  secondButtonContainer.className += ' pl-2'; 
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  secondButton.className += ' done';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-check';
  secondButton.addEventListener('click', doneFunc);
  secondButton.appendChild(iconForSecondButton);
  secondButtonContainer.appendChild(secondButton);

  row.appendChild(nameValue);
  row.appendChild(firstButtonContainer);
  row.appendChild(secondButtonContainer);
  desc.setAttribute("color", color);
  desc.appendChild(row);
  return desc;
}

function pinFunc() {
  var item = this.parentNode.parentNode.parentNode;
  var parent = item.parentNode;
  pinning(parent, item);
}

function unpinFunc() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  console.log(item);
    
  prioritySection = parent.getAttribute('class').split(" ")[2];
  if (prioritySection === 'high-container-pin') {
    let pinList = document.querySelector(".high-container");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', secondPinFunc);
    x.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'medium-container-pin') {
    let pinList = document.querySelector(".medium-container");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', secondPinFunc);
    x.children[2].addEventListener('click', secondDoneFunc);
  }
  else if (prioritySection === 'low-container-pin') {
    let pinList = document.querySelector(".low-container");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', secondPinFunc);
    x.children[2].addEventListener('click', secondDoneFunc);
  }
  parent.removeChild(item);
}

function secondPinFunc() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  pinning(parent,item)   
}

function pinning(parent, item) {
  prioritySection = parent.getAttribute('class').split(" ")[2];
  if (prioritySection === 'high-container') {
    let pinList = document.querySelector(".high-container-pin");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', unpinFunc);
    x.children[1].style.color = "red";
    x.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'medium-container') {
    let pinList = document.querySelector(".medium-container-pin");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', unpinFunc);
    x.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'low-container') {
    let pinList = document.querySelector(".low-container-pin");
    pinList.appendChild(item.cloneNode(true));
    x = pinList.lastElementChild.lastElementChild;
    x.children[1].addEventListener('click', unpinFunc);
    x.children[2].addEventListener('click', secondDoneFunc);
  }
  parent.removeChild(item);
}

function doneFunc() {
  var item = this.parentNode.parentNode.parentNode;
  var parent = item.parentNode;
  donning(parent, item);
}

function secondDoneFunc() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  donning(parent, item);
}

function donning(parent, item) {
  prioritySection = parent.getAttribute('class').split(" ")[2];

  x = item.cloneNode(true);
  inner = x.lastElementChild;
  firstButton = x.lastElementChild.lastElementChild;
  inner.removeChild(firstButton);
  
  secondButton = x.lastElementChild.children[1];
  inner.removeChild(secondButton);
  text = x.lastElementChild.children[0];
  text.style.textDecoration = "line-through";

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-2';
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-times';
  secondButton.addEventListener('click', undone);
  secondButton.appendChild(iconForSecondButton);
  x.lastElementChild.appendChild(secondButton);
  if (prioritySection === 'high-container' || prioritySection === 'high-container-pin') {
    let doneList = document.querySelector('.high-container-done');
    doneList.appendChild(x);
  }
  else if (prioritySection === 'medium-container' || prioritySection === 'medium-container-pin') {
    let doneList = document.querySelector('.medium-container-done');
    doneList.appendChild(x);
  }
  else if (prioritySection === 'low-container' || prioritySection === 'low-container-pin') {
    let doneList = document.querySelector('.low-container-done');
    doneList.appendChild(x);
  }

  parent.removeChild(item);
}

function undone() {

  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  prioritySection = parent.getAttribute('class').split(" ")[2];
  console.log(item);
  console.log(parent);
  x = item.cloneNode(true);
  inner = x.lastElementChild;
  inner.removeChild(x.lastElementChild.lastElementChild);
  inner.lastElementChild.style.textDecoration = "none";
  console.log(x);

  firstButtonContainer = document.createElement('div');
  firstButtonContainer.className = 'col-1';
  firstButton = document.createElement('button');
  firstButton.className = 'btn';
  firstButton.className += ' btn-sm';
  firstButton.className += ' btn-light';
  firstButton.className += ' pin';
  iconForFirstButton = document.createElement('i');
  iconForFirstButton.className = 'fa';
  iconForFirstButton.className += ' fa-map-pin';
  firstButton.addEventListener('click', pinFunc);
  firstButton.appendChild(iconForFirstButton);
  firstButtonContainer.appendChild(firstButton);

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-1';
  secondButtonContainer.className += ' pl-2';
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  secondButton.className += ' done';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-check';
  secondButton.addEventListener('click', doneFunc);
  secondButton.appendChild(iconForSecondButton);
  secondButtonContainer.appendChild(secondButton);
  x.lastElementChild.appendChild(firstButtonContainer);
  x.lastElementChild.appendChild(secondButtonContainer);

  if (prioritySection === 'high-container-done') {
    let list = document.querySelector(".high-container");
    list.appendChild(x);
  }
  else if (prioritySection === 'medium-container-done') {
    let list = document.querySelector(".medium-container");
    list.appendChild(x);
  }
  else if (prioritySection === 'low-container-done') {
    let list = document.querySelector(".low-container");
    list.appendChild(x);
  }
  parent.removeChild(item);
}

