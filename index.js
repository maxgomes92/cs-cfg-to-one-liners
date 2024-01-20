const COMMANDS_PER_BLOCK = 10

function copyToClipboard (text) {
  navigator.clipboard.writeText(text)
}

function convertToOneLiners () {
  const cfg = document.getElementById('cs-cfg').value

  const cfgLines = cfg
    .replace(/\/\/.*/g, '') // remove comments
    .split('\n')
    .filter(line => line) // remove empty lines
    .map(line => line.trim()) // remove spaces

  const commandList = document.getElementById("command-list")
  commandList.innerHtml = ""

  for (let i = 0; i < cfgLines.length / COMMANDS_PER_BLOCK; i++) {
    let line = ""

    for (let j = 0; j < COMMANDS_PER_BLOCK; j++) {
      const index = i * COMMANDS_PER_BLOCK + j

      if (!cfgLines[index]) {
        break
      }

      line += cfgLines[index] + "; "
    }

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
}
