const CS_CONSOLE_CHARACTER_LIMIT = 255

document.getElementById("char-limit").value = CS_CONSOLE_CHARACTER_LIMIT

function copyToClipboard (text) {
  navigator.clipboard.writeText(text)
}

function renderCodeBlock (line) {
  const commandList = document.getElementById("command-list")

  const commandBlock = document.createElement('li')
  commandBlock.classList.add('command-block')

  const commandDiv = document.createElement('div')
  commandDiv.style.flex = 1
  commandDiv.appendChild(
    document.createTextNode(line)
  )

  commandBlock.appendChild(commandDiv)

  const copyButton = document.createElement('button')
  copyButton.innerText = 'Copy'
  copyButton.addEventListener('click', () => {
    commandBlock.style['background-color'] = '#4CAF50'
    copyToClipboard(line)
  })

  commandBlock.appendChild(
    document.createElement('div').appendChild(copyButton)
  )

  commandList.appendChild(commandBlock)
}

function convertToOneLiners () {
  const cfg = document.getElementById('cs-cfg').value

  // Remove old code blocks
  const commandList = document.getElementById("command-list")
  commandList.innerHTML = ""

  if (!cfg) {
    return
  }

  const cfgLines = cfg
    .replace(/\/\/.*/g, '') // remove comments
    .split('\n')
    .filter(line => line) // remove empty lines
    .map(line => line.trim()) // remove spaces

  const charLimit = document.getElementById("char-limit").value

  let line = ""
  for (let i = 0; i < cfgLines.length + 1; i++) {
    if (!cfgLines[i] || (line + cfgLines[i] + "; ").length > charLimit) {
      renderCodeBlock(line)

      if (cfgLines[i]) {
        line = cfgLines[i] + "; "
      }
    } else {
      line += cfgLines[i] + "; "
    }
  }
}
