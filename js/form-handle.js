var $form1 = $('form#form-1'), url1 = 'https://script.google.com/macros/s/AKfycbzXkEoOp4cLRdKN00s6fKTOO_1jVet0OlXZKvpS1PzAgbW4EEdlZkdprCTN0GVoPHVUjg/exec'
var $form2 = $('form#form-2'), url2 = 'https://script.google.com/macros/s/AKfycbxaDYl83rDoEJB6-Ap-UbY7s3D5jGroLK_DS_mNsb4mmetDzrWjk0L8VDl-Ihe_2oXf/exec'
var $form3 = $('form#form-3'), url3 = 'https://script.google.com/macros/s/AKfycbyHpELbtDHVGV1zCxZhbFvgRs43ABuVJdb7oePiitHAq4G07y5laJkcSkAiN00Lp5guhA/exec'
var $form4 = $('form#form-4'), url4 = 'https://script.google.com/macros/s/AKfycbzCct-49XwoW-DPLSeDOoxmeifaEwG3Pvrum5mw1-EjMUhjO65oNIAoH9u9_av-9tmE/exec'
var $form5 = $('form#form-5'), url5 = 'https://script.google.com/macros/s/AKfycbw1CM9Q9ceKSvbgsMmZGDpOb5IVNNr4XESylbvw2VpwoQ1Rt13lqTyOhGpSHnRVNTP07w/exec'

// Form #1
$('#submit-form-1').on('click', function (e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url1,
    method: "POST",
    dataType: "json",
    data: $form1.serialize()
  }).success(
      alert("Thông tin của bạn đã được ghi lại 1"),
      window.location.href='thankyou.html'
  )
})

// Form #2
$('#submit-form-2').on('click', function (e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url2,
    method: "POST",
    dataType: "json",
    data: $form2.serialize()
  }).success(
      alert("Thông tin của bạn đã được ghi lại 2"),
      window.location.href='thankyou.html'
  )
})

// Form #3
$('#submit-form-3').on('click', function (e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url3,
    method: "POST",
    dataType: "json",
    data: $form3.serialize()
  }).success(
      alert("Thông tin của bạn đã được ghi lại 3"),
      window.location.href='thankyou.html'
  )
})

// Form #4
$('#submit-form-4').on('click', function (e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url4,
    method: "POST",
    dataType: "json",
    data: $form4.serialize()
  }).success(
      alert("Thông tin của bạn đã được ghi lại 4"),
      window.location.href='thankyou.html'
  )
})

// Form #5
$('#submit-form-5').on('click', function (e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url5,
    method: "POST",
    dataType: "json",
    data: $form5.serialize()
  }).success(
      alert("Thông tin của bạn đã được ghi lại 5"),
      window.location.href='thankyou.html'
  )
})