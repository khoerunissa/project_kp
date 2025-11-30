/* map-data.js
Reads localStorage['afnalink_maps'] and renders:
 - A list of locations into an element with id="mapList"
 - The selected map iframe (based on localStorage['afnalink_map_active']) into id="mapDisplay"
If no data, shows fallback message.
*/

(function(){
  const STORAGE_KEY = "afnalink_maps";
  function getMaps(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }catch(e){ return []; } }

  // public function to render on page
  window.renderAfnalinkMaps = function(opts){
    opts = opts || {};
    const targetList = document.getElementById(opts.listId || "mapList");
    const targetDisplay = document.getElementById(opts.displayId || "mapDisplay");
    const maps = getMaps();

    if(!targetList && !targetDisplay) return;

    // default display: use active id or first item
    const activeId = localStorage.getItem("afnalink_map_active");
    let active = maps.find(m=>m.id===activeId) || maps[0] || null;

    // render list
    if(targetList){
      if(maps.length===0){
        targetList.innerHTML = "<p class='text-muted'>Belum ada lokasi jangkauan yang diset oleh admin.</p>";
      } else {
        const ul = document.createElement("div");
        ul.className = "list-group";
        maps.forEach(m=>{
          const a = document.createElement("a");
          a.href = "javascript:void(0)";
          a.className = "list-group-item list-group-item-action";
          if(active && m.id === active.id) a.classList.add("active");
          a.innerHTML = `<strong>${m.name}</strong>`;
          a.onclick = function(){
            // set active and update display
            active = m;
            localStorage.setItem("afnalink_map_active", m.id);
            // refresh list highlighting
            const anchors = targetList.querySelectorAll(".list-group-item");
            anchors.forEach(node => node.classList.remove("active"));
            a.classList.add("active");
            renderDisplay();
          };
          ul.appendChild(a);
        });
        targetList.innerHTML = "";
        targetList.appendChild(ul);
      }
    }

    function renderDisplay(){
      if(!targetDisplay) return;
      if(!active){
        targetDisplay.innerHTML = "<p class='text-muted'>Tidak ada peta untuk ditampilkan.</p>";
        return;
      }
      // If embed contains iframe, show it; if it's URL, create iframe; else show text
      const embed = active.embed || "";
      if(/<iframe/i.test(embed)){
        // strip scripts
        const safe = embed.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        targetDisplay.innerHTML = safe;
      } else if(/^https?:\/\//i.test(embed)){
        targetDisplay.innerHTML = `<iframe src="${embed}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
      } else {
        targetDisplay.innerHTML = `<p class="text-muted">Format embed tidak dikenali untuk lokasi: ${active.name}</p>`;
      }
    }

    // initial display
    renderDisplay();
  };

  // Optional auto-run: if elements with default IDs exist, render automatically
  document.addEventListener("DOMContentLoaded", function(){
    if(document.getElementById("mapList") || document.getElementById("mapDisplay")){
      window.renderAfnalinkMaps();
    }
  });
})();
