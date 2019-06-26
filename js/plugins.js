// Place any jQuery/helper plugins in here.

function MoveSliderLeft(){
  sliderIndex = (sliderIndex > 0) ? sliderIndex-1:7
  CalculateSliderPosition(sliderIndex)

  window.clearInterval(sliderInterval)
  sliderInterval = window.setInterval(MoveSliderRight, 10000)
}

function MoveSliderRight(){
  sliderIndex = (sliderIndex < 7) ? sliderIndex+1:0
  CalculateSliderPosition(sliderIndex)

  window.clearInterval(sliderInterval)
  sliderInterval = window.setInterval(MoveSliderRight, 10000)
}

function InitAutoSlider(){
  if($(".slider").length > 0) sliderInterval = window.setInterval(MoveSliderRight, 10000)
}

function CalculateSliderPosition(){
  console.log(sliderIndex)
  $(".slider").fadeOut(500, function(){$(this).css({left: (sliderIndex*-100)+'vw'})}).fadeIn(500)

  $(".slider-navigation ul li").removeClass("active")
  $(".slider-navigation ul li:eq("+sliderIndex+")").addClass("active")

  $("#container").removeClass("dark")
  if(sliderIndex === 1 || sliderIndex === 7){
    $("#container").addClass("dark")
  }
}

function ResizeAbout(){
  let height,
      windowWidth = $(window).width(),
      breakpoint = windowWidth < 900;

  if(breakpoint)height = "auto"
  else height = $("#legacy-container").width()

  $("#legacy-container, #value-container").height(height)
  return breakpoint
}

function SwapExecutiveIn(target, breakpoint){
  $(".executive").removeClass("closed")

  let name = target.attr("id"),
      endpoint = getSwapLocation(target, breakpoint),
      testimonials = ""

  people[name].testimonials.forEach((testimonial, i) => {testimonials += `<div class="testimonial-container"><p class="testimonial">${testimonial.quote}</p><p class="person">${testimonial.person}</p></div>`})

  let html = `
    <div class="executive-bio">
      <div class="title-container">
        <h2 class="name">${people[name].name}</h2>
        ${people[name].title ? `<p class="title">${people[name].title}</p>` : ""}
        <p class="year">With us since ${people[name].year}</p>
      </div>
      <div class="contact-info">
        <p class="phone">${people[name].phone}</p>
        <p class="email"><a target="_blank" href="mailto:${people[name].email}"><span><i class="fas fa-envelope"></i></span> ${people[name].name.split(" ")[0]}</a></p>
        <p class="email csr"><a target="_blank" href="mailto:${people[name].csr.email}"><span><i class="fas fa-envelope"></i></span>${people[name].csr.name} - Account Manager</a></p>
      </div>
      <div class="quote-container"><p class="quote">${people[name].quote}</p></div>
      <div class="bio-container"><p class="bio">${people[name].bio}</p></div>
      <div class="testimonials-container">
        ${testimonials}
      </div>
    </div>
  `;

  $(".executive-bio").animate({height: 0}, 300, ()=>{
    $(this).remove()
    $(window).scrollTop($(target).offset().top-32)
  });

  console.log(endpoint)

  if($(target).hasClass("open")){
    $(target).removeClass("open")
    $(".executive").removeClass("closed")
  }else{
    $(".executive").removeClass("open")
    $(target).addClass("open")
    $(target).removeClass("closed")
    $(endpoint).after(html)
  }
}

function getSwapLocation(target, breakpoint){
  if(breakpoint)return target
  else{
    if($(target).hasClass("row-1"))       {$(".row-1").addClass("closed"); return ".row-end-1"}
    else if($(target).hasClass("row-2"))  {$(".row-2").addClass("closed"); return ".row-end-2"}
    else if($(target).hasClass("row-3"))  {$(".row-3").addClass("closed"); return ".row-end-3"}
    else if($(target).hasClass("row-4"))  {$(".row-4").addClass("closed"); return ".row-end-4"}
    else if($(target).hasClass("row-5"))  {$(".row-5").addClass("closed"); return ".row-end-5"}
  }
}

function ApplySearchString(string){
  let results = string !== '' ? Object.values(people).filter((person)=>{

    string = string.toLowerCase()
    let name = person.name   ? person.name.toLowerCase() : "",
        email = person.email ? person.email.toLowerCase(): "",
        quote = person.quote ? person.quote.toLowerCase(): "",
        bio = person.bio     ? person.bio.toLowerCase(): ""

    return (name.includes(string) || email.includes(string) || quote.includes(string) || bio.includes(string))
  }) : Object.values(people)

  let resultsHTML = ``
  // console.log(results)
  if(results) results.sort(SortByLastName).forEach((result)=>resultsHTML+=`
    <tr class="find-agent-table-result">
      <td>${result.name || ""}</td>
      <td>${result.phone || ""}</td>
      <td><a class="send-email" target="_blank" href="mailto:${result.email}">Send Email</a></td>
    </tr>
  `)

  $(".find-agent-table-result").remove()
  $("#find-agent-table-container .body table").append(resultsHTML)
}

function OpenFindAgentModule(self){
  $("#find-agent-button").addClass("open").css({
    width: $(window).width(),
    height: $(window).height()
  })

  $("#find-agent-container").addClass("open")
  $("body").addClass("find-an-agent-modal-open")
}

function CloseFindAgentModule(){
  $("#find-agent-button").removeClass("open").css({
    width: 176,
    height: 45
  })
  $("body").removeClass("find-an-agent-modal-open")
  $("#find-agent-container").removeClass("open")
}

function SortByLastName(a, b){
  let aln = a.name.split(' ')[1].toLowerCase()
  let bln = b.name.split(' ')[1].toLowerCase()

  if(
    a.name==="Client Services"
    ||a.name==="Condominium Certificate Services"
    ||b.name==="Client Services"
    ||b.name==="Condominium Certificate Services"
  )return 1;

  return aln > bln ? 1 : -1
}


function HideFindButtonOnPageBottom(){
  let elemTop = $("#find-agent-container").offset().top
  let docViewBottom = $(window).scrollTop() + $(window).height()
  if(docViewBottom > elemTop) $("#find-agent-button").addClass("hide")
  else $("#find-agent-button").removeClass("hide")
}
