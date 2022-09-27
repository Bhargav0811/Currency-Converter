var Curr_types = [];

// Curr_types.push("Hii")
// console.log(Curr_types[0]);
var Val = [];
var year_wise = {}
var dates = [];
var temp_year;
var min_value,max_value;
let myChart;

var C2 = "NOcurrency";

var yr;
var mon;
var dt;
var type;

// var myChart;

var quat;
var Quats = [[0,2],[0,2],[3,5],[6,8],[9,11]];
// var type = 2;


var week_no;
var weeks = [[1,7],[1,7],[8,14],[15,21],[22,28],[29,31]];
// var type = 3;
//1 - for date,month,year, 2 - Quarter, 3 - weekly


const arrayColumn = (arr, n) => (arr.map((x) => x[n]));
read_data(2013);
// change_the_graph();



// for adding all currencies
function setcurrenciesdropdown(){
  // console.log("hi");
  for(var i=0; i<Curr_types.length; i++){
    const node=document.createElement("a");
    node.setAttribute("onclick","changeinput2(event)");
    node.innerText=Curr_types[i];
    // console.log(node);
    document.getElementById("myDropdown2").appendChild(node);
}
}
// Date.getDaysInMonth(2009, 9)


function change_the_graph(event){
  console.log("hi");
  event.preventDefault();
  let e = document.getElementById("Year");
  let input_year=e.options[e.selectedIndex].text;
  console.log(input_year);

  if(!input_year){
      yr="Year";
  } 
  else{
     yr=input_year;
  }
  console.log(input_year);
  e = document.getElementById("Month");
  var input_month=e.options[e.selectedIndex].value;
  if(!input_month){
    mon="Month";
  }
  else{
     mon=input_month;
  }
  e = document.getElementById("Date")
  var input_date=e.options[e.selectedIndex].text;
  if(!input_date){
    dt="Date";
  }
  else{
      dt=input_date;
  }
  e = document.getElementById("Quater")
  var input_quater=e.options[e.selectedIndex].text;
  if(!input_quater){
    quat="quat";
  }
  else{
      quat=input_quater;
  }
  var converttocurrency=document.getElementById("Input2").value;
  if(!converttocurrency){
    C2="NOcurrency";
  }
  else{
    console.log(converttocurrency);
    C2=converttocurrency;
  }
  e = document.getElementById("Week")
  var input_week=e.options[e.selectedIndex].text;
  if(!input_week){
    week_no="weekno";
  }
  else{
      week_no=input_week;
  }
  
  console.log(yr);
  console.log(mon);
  console.log(dt);
  console.log(quat);
  console.log(week_no);
  console.log(C2);

  if(C2==="NOcurrency"){
    console.log(C2);
      alert("PLease enter a second currency");
  }
  else{
    if(yr==="Year"){
      if(mon==="Month"){
        console.log("Hello");
        // for(var i=2011; i<=2022; i++){
        //   type=1;
        //   read_data(i);
        }
      }      
    else 
    {
      if(mon==="Month"){
        console.log("Hello");
        type=1;
          read_data(yr);
      }
      else {
      if(quat==="Quater"){
        if(week_no==="Week"){
           type=1;
           console.log(yr);
           read_data(yr);
        }
        else{
           type=3;
           console.log(yr);
           read_data(yr);
        }
      }      
      else{
          type=2;
          console.log(yr);
          read_data(yr);
      }
    }
  }
  }
    var canvas = document.getElementById("myChart");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
// console.log(year_wise);



function read_data(year) {
    yr=year;
    // var path = 'data/Exchange_Rate_Report_' + yr.toString() + '.csv';

    temp_year = yr;
    fetch("http://localhost:3000/file?year="+yr.toString()).then(async (res) =>{
        const data = await res.text(); 
        // console.log(data);
      read(data);
      }); 

//     function loadDocSubscriber() {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("subscriber").innerHTML =
//             this.responseText;
//         }
//     };
//     xhttp.open("GET", "textfiles/most_recent_subscriber.txt", true);
//     xhttp.send();
// }
     
    // var rawFile = new XMLHttpRequest();
    //   rawFile.open("GET", path, true);
    //   rawFile.onreadystatechange = function() {
    //     if (rawFile.readyState === 4) {
    //       var allText = rawFile.responseText;
    //       read(allText)
    //       // document.getElementById("textSection").innerHTML = allText;
    //     }
    //   }
    // var read_data = $.ajax({
    //     url: path,
    //     dataType: 'text',
    //     crossDomain: true
    // }).done(read);

    

    // reader.onload = function(e)
    // {
    //     result = e.target.result;
    // };
    // var reader = new FileReader();
    // reader.readAsText(new FileReader(path));
    // reader.result();


    // var fread = new File(fileParts, fileName, [options])
    // read_data.
    // console.log(reader.result());
  
    // console.log(dates);
    //  console.log(Val);
    
}

function read(data) {
  // console.log(data);
  dates = [];
  Val = [];
    var allRows = data.split('\r\n');
    var mon_range;
    var dt_range;
    if(type==1)
    {
        if(mon=="Month")mon_range = [0,11];
        else mon_range = [mon,mon]

        if(dt =="Date")dt_range = [1,31];
        else dt_range = [dt,dt];
    }
    else if(type==2)
    {
        mon_range = Quats[quat];
        dt_range = [1,31];
    }
    else
    {
        mon_range = [mon,mon];
        dt_range = weeks[week_no];
    }
    console.log(mon_range);
    console.log(dt_range);
    // console.log(allRows);
    allRows.forEach((element, index) => {
        var temp = element.split(',');
        // console.log(temp);
        if (index > 0) {
          var st_date = temp[0].split('-')
                 
            temp[0] = new Date(st_date[0]+' '+st_date[1]+' 20'+st_date[2]);  
            // console.log(temp[0]);  

            if((temp[0].getMonth()<=mon_range[1] && temp[0].getMonth()>=mon_range[0]) && (temp[0].getDate()<=dt_range[1] && temp[0].getDate()>=dt_range[0]))
            {
                dates.push(st_date[0]+'/'+st_date[1]+'/'+st_date[2]);
                
                // console.log(temp.slice(1).map(k => Number(k)))                
                Val.push(temp.slice(1).map(k => Number(k)));
              
            }
        }
        else {
          // temp = temp.slice(1);
          // console.log(typeof(temp));
          Curr_types = [];
          temp.forEach((k,index) => {
            k = k.split('  ')

            if(index>0)Curr_types.push(k[0]+k[1]);
          })
          // console.log(Curr_types);
        }
        // console.log(Curr_types.length); 
    });
    setcurrenciesdropdown();
    // console.log(dates);
    // console.log(Val);
    getGraph();
    // console.log(allRows);
    
    // Curr_types.forEach((element, index) => {
    //     console.log(element);
    //     console.log(arrayColumn(Val, index));
    //     if (!year_wise[temp_year]) year_wise[temp_year] = {}
    //     if (!year_wise[temp_year][element]) year_wise[temp_year][element] = {}
    //     year_wise[temp_year][element] = arrayColumn(Val, index);
    // });
}

document.addEventListener("click",(event)=>{
    if(event.target.id!=="Input") closedropdown();
});

function showdropdown(){
    document.getElementById("myDropdown").style.display="block";
}

function changeinput(event){
  console.log(event.target.innerText);
  document.getElementById("Input").value=event.target.innerText;
}

function closedropdown(){
    document.getElementById("myDropdown").style.display="none";
}

function filterfunction(){
    var input, search, ul, li, a, i;
    input = document.getElementById("Input");
    search = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(search) > -1) {
        a[i].style.display = "";
      } 
      else {
        a[i].style.display = "none";
      }
    }
}

document.addEventListener("click",(event)=>{
  if(event.target.id!=="Input2") closedropdown2();
});

function showdropdown2(){
  document.getElementById("myDropdown2").style.display="block";
}

function changeinput2(event){
  console.log(event.target.innerText);
  document.getElementById("Input2").value=event.target.innerText;
}

function closedropdown2(){
  document.getElementById("myDropdown2").style.display="none";
}

function filterfunction2(){
    var input, search, ul, li, a, i;
    input = document.getElementById("Input2");
    search = input.value.toUpperCase();
    div = document.getElementById("myDropdown2");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(search) > -1) {
        a[i].style.display = "";
        console.log(txtValue);
      } else {
        a[i].style.display = "none";
      }
    }
}

var animation;
  function getGraph()
  {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // const list = <%- JSON.stringify(U.ratingsList) %>;
    var list = arrayColumn(Val,Curr_types.indexOf(C2));
    console.log(Curr_types.indexOf(C2));
    console.log(Curr_types);
    console.log(C2);
    list = list.map(o => o == 0? NaN : o)

    // console.log(Val)
    // console.log(dates)
    // console.log(Curr_types.slice(0,1))
    // Curr_types = Curr_types[0]
    // console.log(typeof(Curr_types))
    // console.log(Curr_types);
    // console.log(Curr_types[0]);
    // console.log(Curr_types[1]);
    Chart.register(ChartDataLabels);
  const ctx = document.getElementById('myChart');
  if(myChart!=null)myChart.destroy();

  // if(ctx!=null)ctx.destroy();
  // ctx.clear();
  const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  const up = (ctx, value) => ctx.p0.parsed.y <= ctx.p1.parsed.y ? value : undefined;
  if(width<=400)Chart.defaults.font.size = 8;
  else Chart.defaults.font.size = 14;
  const totalDuration = 2000;
  const delayBetweenPoints = totalDuration / list.length;

  const genericOptions = {
    fill: false,
    interaction: {
      intersect: false
    },
    radius: 0,
  };


  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  animation = {
    x: {
      type: 'number',
      easing: 'easeInExpo',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'easeInExpo',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

  // if(myChart!=null)myChart.destroy();

  if(dt!="Date" && type==1)
  {
    // Val = Val[0];
    // console.log(Val[3]);
    // console.log(Curr_types);
    Val = Val[0]
    myChart = new Chart(ctx,{
      type: 'bar',
      data: {
        labels: Curr_types,
        datasets: [{
          label: 'Currencies',
          data: Val,
          borderWidth: 1
        }]
      },
      options: {
        legend:{
          display: false
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true
        ,
        plugins: {
          datalabels: {
          backgroundColor: "#00735C",
          borderColor: "#EDF0EE",
          borderWidth: 0.5,
          borderRadius: 9,
          color: 'white',
            font: {
              size: 11,
              weight: 'normal'
            },
            formatter: Math.round(4),
            anchor: "end",
            align: "top",
            rotation: -90
          }
        }
      }
    })
  }
  else 
  {
    max_value = Math.max(...list.filter(value => Number.isFinite(value)));    
  min_value = Math.min(...list.filter(value => Number.isFinite(value)));
  // documen
  document.getElementById('high_value').innerHTML = max_value;
  document.getElementById('low_value').innerHTML = min_value;
  console.log(list)
    console.log(dates)

    var bgc = [];
    var p_radius = []
    var p_style = [];
    // var data_labels = [];
    list.map((point,index) =>{
      if(point==max_value){bgc.push('#3D550C');p_radius.push(7);p_style.push('triangle')}
      else if(point==min_value){bgc.push('#F51720');p_radius.push(7);p_style.push('triangle')}
      else {bgc.push('#e9eaec73');p_radius.push(3);p_style.push('circle')}
    })

    
    myChart = new Chart(ctx, {
      type: 'line',
  
    data: {
      labels: dates,
      datasets: [{
        data: list,
        pointRadius: p_radius,
        pointStyle: p_style,
        borderWidth: 3,
        backgroundColor:bgc,
        segment: {          
            borderColor: ctx => skipped(ctx, '#868B8E'),
            borderDash: ctx => skipped(ctx, [6, 6]),
            borderColor: ctx => up(ctx,"#14E114") || down(ctx,"#F04854"),
          },
          spanGaps: true
      }]
    },
    options: {
      animation,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Currency Chart',
          font: {
            size: 35,
            weight: 'bolder' 
          }
        },
        datalabels: {
          display: false,
        backgroundColor: "#00735C",
        borderColor: "#EDF0EE",
        borderWidth: 1,
        borderRadius: 10,
        color: 'white',
          font: {
            size: 8,
            weight: 'normal'
          },
          formatter: Math.round,
          anchor: "end",
          align: "top",
  
        }
      },
      options: genericOptions,
        scales: {
              y: 
              {
                title:C2 ,
                grid: {display: false,borderWidth: 3,borderColor: "#21B6A8"}
              },
              x: 
                {
                  title:"Date",
                grid: {display: true,borderWidth: 3,borderColor: "#21B6A8"},
                ticks: {display:(width>=400)}
                }
            }
          }
      })
  }
  
}



