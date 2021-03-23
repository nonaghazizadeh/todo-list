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
  $('.priority-selected').text('priority');
  $('.color-selected').text('color');  
})

function addTask(name) {
  var desc = document.createElement('div');
  desc.className = "desc";

  var row = document.createElement('div');
  row.className = "row";

  var nameValue = document.createElement('div');
  nameValue.className = "col-10";
  nameValue.innerHTML = name;

  firstButtonContainer = document.createElement('div');
  firstButtonContainer.className = 'col-1';
  firstButton = document.createElement('button');
  firstButton.className = 'btn';
  firstButton.className += ' btn-sm';
  iconForFirstButton = document.createElement('i');
  iconForFirstButton.className = 'fa';
  iconForFirstButton.className += ' fa-map-pin';
  firstButton.appendChild(iconForFirstButton);
  firstButtonContainer.appendChild(firstButton);

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-1';
  secondButtonContainer.className += ' pl-2'
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-check';
  secondButton.appendChild(iconForSecondButton);
  secondButtonContainer.appendChild(secondButton);

  row.appendChild(nameValue);
  row.appendChild(firstButtonContainer);
  row.appendChild(secondButtonContainer);
  row.setAttribute("color", color);
  desc.appendChild(row);
  return desc;
}
