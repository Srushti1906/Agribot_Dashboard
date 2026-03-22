function rand(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

let labels=[], tempData=[], humData=[], soilData=[];
let chartsCreated=false;
let mapLoaded=false;

// Navigation
function showSection(e,id){
  document.querySelectorAll('.section').forEach(sec=>{
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.sidebar li').forEach(li=>{
    li.classList.remove('active');
  });

  e.target.classList.add('active');

  if(id==="analytics"){
    setTimeout(createCharts,200);
  }

  if(id==="map"){
    setTimeout(initMap,200);
  }
}

// Charts
function createCharts(){
  if(chartsCreated) return;

  const options = {
    responsive:true,
    plugins:{legend:{display:false}},
    scales:{
      x:{grid:{display:false}},
      y:{grid:{color:"#eee"}}
    }
  };

  new Chart(tempChart,{
    type:'line',
    data:{labels,datasets:[{
      data:tempData,
      borderColor:"#10b981",
      backgroundColor:"rgba(16,185,129,0.2)",
      fill:true,
      tension:0.4
    }]},
    options
  });

  new Chart(humChart,{
    type:'line',
    data:{labels,datasets:[{
      data:humData,
      borderColor:"#3b82f6",
      backgroundColor:"rgba(59,130,246,0.2)",
      fill:true,
      tension:0.4
    }]},
    options
  });

  new Chart(soilChart,{
    type:'bar',
    data:{labels,datasets:[{
      data:soilData,
      backgroundColor:"#f59e0b"
    }]},
    options
  });

  chartsCreated=true;
}

// Map
function initMap(){
  if(mapLoaded) return;

  let map=L.map('mapView').setView([18.5204,73.8567],13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  L.marker([18.5204,73.8567]).addTo(map)
    .bindPopup("🌿 Farm Location");

  mapLoaded=true;
}

// Data update
function update(){

  let temp=rand(25,35);
  let hum=rand(50,80);
  let soil=rand(20,70);

  document.getElementById("temp").innerText=temp+"°C";
  document.getElementById("hum").innerText=hum+"%";
  document.getElementById("soil").innerText=soil+"%";
  document.getElementById("rain").innerText=Math.random()>0.5?"Yes":"No";
  document.getElementById("ultra").innerText=rand(5,100)+" cm";
  document.getElementById("motion").innerText=Math.random()>0.5?"Detected":"No";
  document.getElementById("ldr").innerText=rand(0,100);

  let time=new Date().toLocaleTimeString();

  labels.push(time);
  tempData.push(temp);
  humData.push(hum);
  soilData.push(soil);

  if(labels.length>10){
    labels.shift();
    tempData.shift();
    humData.shift();
    soilData.shift();
  }
}

setInterval(update,2000);