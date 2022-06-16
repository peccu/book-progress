(()=>{
  if(!localStorage.getItem('v')){
    localStorage.setItem('v', 1655396913);
    return;
  }
  if(localStorage.getItem('v') < 1655396913){
    localStorage.setItem('v', 1655396913);
    location.reload();
  }
})()
