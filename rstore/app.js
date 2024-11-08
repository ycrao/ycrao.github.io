
window.invoke = (code, data) => {
  window.dispatchEvent(
    new CustomEvent('JBridge', {
      detail: { code, data }
    })
  )
}
fetch('./app.json?v=2024110817').then(res => res.json()).then((appData) => {
  const bmEl = document.getElementById('bm-container')
  bmEl.innerHTML = ''

  for (let i = 0; i < appData.modules.length; i++) {
    const module = appData.modules[i]
    const moduleItem = document.createElement('div')
    moduleItem.className ='grid-item'
    moduleItem.innerHTML = `
      <div class="item-icon">
          <img src="${module.icon}" class="icon" title="${module.name}" alt="${module.name}">
      </div>
      <div class="item-intro">
        <h4>${module.name} <sup title="version">v${module.version}</sup></h4>
        <p>${module.description}</p>
      </div>
      <div class="item-download">
        <button class="btn btn-primary btn-install" data-file="${module.name}|${module.filename}|${module.version}|${module.backup_raw_file_url}">安装</button>
      </div>
    `
    bmEl.innerHTML += moduleItem.outerHTML
  }

  const waEl = document.getElementById('wa-container')
  waEl.innerHTML = ''

  for (let i = 0; i < appData.widgets.length; i++) {
    const widget = appData.widgets[i]
    const widgetItem = document.createElement('div')
    widgetItem.className ='grid-item'
    widgetItem.innerHTML = `
      <div class="item-icon">
        <a href="./preview.html?urls=${widget.previews}">
          <img src="${widget.icon}" class="icon" title="${widget.chinese_name}" alt="${widget.name}">
        </a>
      </div>
      <div class="item-intro">
        <h4>${widget.name} <sup title="version">v${widget.version}</sup></h4>
        <p><strong>${widget.chinese_name}</strong> - ${widget.description}</p>
      </div>
      <div class="item-download">
        <button class="btn btn-primary btn-install" data-file="${widget.name}|${widget.filename}|${widget.version}|${widget.backup_raw_file_url}">安装</button>
      </div>
    `
    waEl.innerHTML += widgetItem.outerHTML
  }

  grid1Items = bmEl.querySelectorAll('.grid-item')
  grid2Items = waEl.querySelectorAll('.grid-item')
  grid1Items.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let target = e.target
      if (target.tagName !== 'BUTTON') {
        return
      }
      let data = target.getAttribute("data-file").split('|')
      console.log(data)
      invoke('installDep', data)
    })
  })
  grid2Items.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let target = e.target
      if (target.tagName !== 'BUTTON') {
        return
      }
      let data = target.getAttribute("data-file").split('|')
      invoke('installApp', data)
    })
  })
})



